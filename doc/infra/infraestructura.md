# Infraestructura — UFO Hunters Site

Este documento describe la infraestructura que soporta **ufo-hunters.com**, incluyendo los entornos disponibles, la configuracion de servicios, el pipeline de CI/CD, monitoring y los procesos de despliegue.

---

## Entornos

### Vision General

| Entorno | Proposito | URL | Despliegue |
|---------|-----------|-----|------------|
| **Desarrollo** | Entorno local de cada desarrollador | `http://localhost:3000` | Manual (`rails server`) |
| **Staging** | Pruebas de integracion antes de produccion | [URL staging si existe] | Manual o automatico |
| **Produccion** | Entorno en vivo para usuarios finales | `https://ufo-hunters.com` | Via Heroku / Docker |

### Paridad entre Entornos

Para minimizar problemas de "funciona en mi maquina", los entornos mantienen paridad en:

- **Version de Ruby**: 3.2.8 en todos los entornos (Dockerfile: `FROM ruby:3.2.8-slim`).
- **Version de MongoDB**: Compatible con Mongoid 9.0 en todos los entornos.
- **Variables de entorno**: Mismo conjunto de variables, con valores diferentes por entorno.
- **Dependencias**: Mismas versiones de gemas via `Gemfile.lock`.

| Aspecto | Desarrollo | Produccion |
|---------|-----------|------------|
| MongoDB | Local (127.0.0.1:27017) o Docker | MongoDB Atlas via `MONGOHQ_URL` |
| Base de datos | `ufosightings` (development) | `ufosightings` (production via MONGOHQ) |
| Base de datos test | `sightings_test` | — |
| Cache | Deshabilitado o en memoria | Redis via `REDIS_URL` (fallback: Memcached) |
| Email | `:test` delivery (no envia reales) | SendGrid SMTP |
| Imagenes | Cloudinary (si configurado) o local | Cloudinary |
| Logs | Consola, nivel debug | Heroku Logs / New Relic |
| SSL | No | Si (Heroku maneja SSL) |

---

## Infraestructura de Produccion

### Heroku (Configuracion Principal)

La aplicacion se despliega en **Heroku** usando el `Procfile`:

```
web: bundle exec puma -C config/puma.rb
```

**Add-ons de Heroku en uso**:

| Add-on | Proposito | Variable de Entorno |
|--------|-----------|---------------------|
| MongoHQ / MongoDB Atlas | Base de datos principal | `MONGOHQ_URL` |
| Redis To Go / Heroku Redis | Cache en produccion | `REDIS_URL` |
| Memcached Cloud | Cache fallback | `MEMCACHEDCLOUD_SERVERS` |
| New Relic APM | Monitoring y alertas | `NEW_RELIC_LICENSE_KEY` |
| SendGrid | Email transaccional | `SENDGRID_USERNAME`, `SENDGRID_PASSWORD` |

### Docker (Configuracion Alternativa)

El proyecto incluye un `Dockerfile` basado en `ruby:3.2.8-slim`:

```dockerfile
FROM ruby:3.2.8-slim
# Instala dependencias del sistema, copia el codigo,
# ejecuta bundle install y arranca Puma
```

**Notas importantes**:
- El `Dockerfile` no incluye MongoDB — MongoDB debe correr como servicio separado.
- No hay `docker-compose.yml` actualmente (pendiente de crear — ver DT-004 en [deuda-tecnica.md](../deuda-tecnica.md)).
- En produccion con Docker, las variables de entorno se inyectan externamente.

---

## Infraestructura de Base de Datos (MongoDB)

### Configuracion por Entorno

El archivo `config/mongoid.yml` define la configuracion de conexion:

| Parametro | Desarrollo | Test | Produccion |
|-----------|-----------|------|------------|
| Base de datos | ufosightings | sightings_test | (via MONGOHQ_URL) |
| Host | 127.0.0.1:27017 | 127.0.0.1:27017 | MongoDB Atlas |
| Auth | Sin autenticacion | Sin autenticacion | URI con credenciales |

### Indices Criticos

Los indices se definen en los modelos y se crean con `rails db:mongoid:create_indexes`:

| Coleccion | Campo | Tipo | Proposito |
|-----------|-------|------|-----------|
| reports | coordinates | 2dsphere | Queries geoespaciales del mapa |
| reports | status, created_at | Compuesto | Listado paginado de avistamientos |
| reports | description, location | text | Busqueda de texto |
| countries | geometry | 2dsphere | Filtrado por pais en el mapa |
| users | username | Unico (es el _id) | Autenticacion |

### Sin Migraciones

**MongoDB con Mongoid no usa migraciones.** El esquema vive en los modelos. Para cambios de esquema en produccion:

1. Agregar el nuevo campo en el modelo con `field :nombre, type: Tipo`.
2. Desplegar el cambio — los documentos existentes tendran el campo como `nil`.
3. Si el campo requiere un valor por defecto, usar una tarea Rake para actualizarlo en batch.
4. Si se elimina un campo, primero eliminar todas las referencias en el codigo, desplegar, y luego el campo puede ignorarse (MongoDB no lo borrara automaticamente).

### Backups

| Tipo | Frecuencia | Retencion | Herramienta |
|------|------------|-----------|-------------|
| Snapshots automaticos | Diario | [Segun plan de MongoDB Atlas] | MongoDB Atlas Backup |
| Point-in-time recovery | Continuo | [Segun plan] | MongoDB Atlas |

**Restauracion**: Usar la consola de MongoDB Atlas para restaurar desde un snapshot. Notificar al equipo antes de cualquier restauracion en produccion.

---

## Pipeline de CI/CD

### Estado Actual: Travis CI (OBSOLETO)

El archivo `.travis.yml` existe pero esta configurado para Ruby 2.1.2, lo cual es incompatible con el stack actual (Ruby 3.2.8). **Los tests automaticos NO se ejecutan en CI actualmente.**

**Prioridad**: Migrar a GitHub Actions (ver DT-001 en [deuda-tecnica.md](../deuda-tecnica.md)).

### Pipeline Objetivo: GitHub Actions

El pipeline objetivo tras la migracion:

```
Push / PR
  └── Instalar Ruby 3.2.8
  └── bundle install
  └── Iniciar MongoDB (service container)
  └── rails db:mongoid:create_indexes
  └── rails test
  └── [Si rama main] → Deploy a Heroku
```

**Archivo objetivo**: `.github/workflows/ci.yml`

```yaml
# Esquema del workflow objetivo
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:7
        ports: ['27017:27017']
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2.8'
          bundler-cache: true
      - run: bundle exec rails db:mongoid:create_indexes
      - run: bundle exec rails test
```

---

## Proceso de Despliegue

### Despliegue a Produccion en Heroku

```bash
# Despliegue manual via git
git push heroku main

# O via Heroku CLI
heroku deploy

# Verificar que la aplicacion esta corriendo
heroku ps
heroku logs --tail
```

**Post-despliegue**:
1. Verificar que la aplicacion responde en `https://ufo-hunters.com`.
2. Verificar que el mapa carga correctamente (`/map_json` retorna GeoJSON).
3. Revisar los logs de Heroku los primeros minutos.
4. Revisar New Relic para detectar errores o degradacion de rendimiento.

### Rollback

En caso de problema tras el despliegue:

```bash
# Rollback al release anterior
heroku rollback

# Verificar el rollback
heroku releases
```

**Tiempo objetivo de rollback**: < 5 minutos.

### Compilacion de Assets

Antes de desplegar, Heroku ejecuta automaticamente `rails assets:precompile` via el buildpack de Ruby. Esto incluye:

- Propshaft: copia y versiona los assets estaticos.
- Tailwind CSS: `rails tailwindcss:build` compila el CSS.

---

## Monitoring y Logging

### New Relic APM

New Relic (`newrelic_rpm`) esta configurado en produccion y proporciona:

- Tiempo de respuesta por endpoint.
- Errores de aplicacion (excepciones no capturadas).
- Metricas de queries MongoDB.
- Alertas configurables.

**Acceso**: Panel de New Relic (credenciales en el gestor de secretos del equipo).

### Logging de Heroku

```bash
# Ver logs en tiempo real
heroku logs --tail

# Ver ultimas 200 lineas
heroku logs -n 200

# Filtrar por fuente (app, router, heroku)
heroku logs --source app
```

**Niveles de log**:

| Entorno | Nivel | Destino |
|---------|-------|---------|
| Desarrollo | debug | Consola |
| Produccion | info | Heroku Logplex |

**Que NO loggear**:
- Contrasenas o tokens de sesion.
- Datos personales de usuarios.
- API keys o secretos.

### Alertas

| Severidad | Que monitorear | Accion |
|-----------|---------------|--------|
| Critica (P0) | Error rate 5xx > 5% / MongoDB caido | Investigar inmediatamente, rollback si necesario |
| Alta (P1) | Tiempo de respuesta p95 > 2s | Investigar rendimiento, revisar queries MongoDB |
| Media (P2) | Errores de Cloudinary | Revisar uploads pendientes |

---

## Escalabilidad

### Escalado en Heroku

```bash
# Escalar el numero de dynos web
heroku ps:scale web=2

# Ver el estado actual
heroku ps
```

**Configuracion actual de Puma** (en `config/puma.rb`):
- Workers: `WEB_CONCURRENCY` (env var, default 2 en Heroku).
- Threads: `RAILS_MAX_THREADS` (env var, default 5).

### Limites Conocidos

| Componente | Limite | Plan para Superar |
|------------|--------|-------------------|
| Heroku dyno memory | 512MB (Standard-1X) o 1GB (Standard-2X) | Escalar a dyno mas grande o aumentar cantidad |
| MongoDB Atlas | Segun plan contratado | Escalar el plan de Atlas |
| Cloudinary | Segun plan contratado | Escalar el plan de Cloudinary |

---

## Secretos y Configuracion

### Variables de Entorno de Produccion

Todas las variables de entorno se gestionan en Heroku Config Vars (nunca en el repositorio):

```bash
# Ver todas las variables de entorno
heroku config

# Agregar o actualizar una variable
heroku config:set NUEVA_VARIABLE=valor
```

**Lista completa de variables requeridas en produccion**:

| Variable | Proposito |
|----------|-----------|
| `MONGOHQ_URL` | URI de conexion a MongoDB Atlas |
| `SECRET_KEY_BASE` | Clave secreta de Rails |
| `GOOGLE_MAPS_API_KEY` | API key de Google Maps v3 |
| `RECAPTCHA_SITE_KEY` | Clave publica de reCAPTCHA |
| `RECAPTCHA_SECRET_KEY` | Clave privada de reCAPTCHA |
| `CLOUDINARY_URL` | Credenciales de Cloudinary |
| `SENDGRID_USERNAME` | Usuario SMTP de SendGrid |
| `SENDGRID_PASSWORD` | Password SMTP de SendGrid |
| `REDIS_URL` | URL de conexion a Redis |
| `NEW_RELIC_LICENSE_KEY` | License key de New Relic |

### Rotacion de Secretos

- Rotar las API keys si hay sospecha de compromiso.
- Actualizar en Heroku Config Vars y reiniciar los dynos: `heroku restart`.
- Revocar la clave comprometida en el dashboard del servicio correspondiente.

---

## Recuperacion ante Desastres

### Escenarios y Planes

| Escenario | Impacto | Plan de Accion | Tiempo Estimado |
|-----------|---------|----------------|-----------------|
| Dyno Heroku caido | Alto (sitio inaccesible) | Heroku reinicia automaticamente; si persiste, `heroku restart` | < 2 min |
| MongoDB Atlas caido | Critico (toda la app falla) | Esperar recuperacion de Atlas; activar pagina de mantenimiento | Variable |
| Despliegue con bug | Alto | `heroku rollback` al release anterior | < 5 min |
| Cloudinary caido | Medio (imagenes no cargan) | Imagenes no disponibles; resto del sitio funciona | Variable |
| API key de Google Maps expirada / cuota excedida | Medio (mapa no carga) | Renovar/incrementar cuota en Google Cloud Console | < 1 hora |

### RPO y RTO

| Metrica | Objetivo |
|---------|----------|
| **RPO** (Recovery Point Objective) | Maxima perdida de datos tolerable: 24 horas (frecuencia de backups de MongoDB Atlas) |
| **RTO** (Recovery Time Objective) | Tiempo maximo para restaurar el servicio: 30 minutos |

---

> Para la configuracion del entorno de desarrollo local, ver [setup-desarrollo-local.md](../setup-desarrollo-local.md). Para la arquitectura del sistema, ver [arquitectura.md](../arquitectura.md).
