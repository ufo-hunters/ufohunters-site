# Setup de Desarrollo Local — UFO Hunters Site

Esta guia te ayudara a configurar tu entorno de desarrollo local para trabajar en **ufo-hunters.com** desde cero.

---

## Prerequisitos

Antes de comenzar, asegurate de tener instalado:

| Herramienta | Version Requerida | Proposito |
|-------------|------------------|-----------|
| Ruby | 3.2.8 | Lenguaje de programacion principal |
| Bundler | 2.x (ultima estable) | Gestor de gemas |
| MongoDB | 6.x o 7.x | Base de datos principal |
| Git | 2.30+ | Control de versiones |
| Docker | 20.10+ (opcional) | Alternativa para ejecutar MongoDB |
| Node.js | 18+ (opcional) | Solo si se necesita compilar assets Tailwind manualmente |

### Instalacion de Ruby con RVM

El proyecto usa Ruby 3.2.8. Recomendamos RVM para gestionar versiones:

```bash
# Instalar RVM (si no lo tienes)
\curl -sSL https://get.rvm.io | bash -s stable

# Instalar Ruby 3.2.8
rvm install 3.2.8

# Usar Ruby 3.2.8 en este proyecto
rvm use 3.2.8

# Verificar la instalacion
ruby --version
# => ruby 3.2.8 (...)
```

### MongoDB

Puedes ejecutar MongoDB de forma nativa o con Docker:

```bash
# Opcion 1: Docker (recomendado para desarrollo)
docker run --name ufohunters-mongo \
  -p 27017:27017 \
  -d mongo:7

# Verificar que esta corriendo
docker ps | grep ufohunters-mongo

# Opcion 2: Instalacion nativa (Ubuntu/Debian)
# Seguir la guia oficial: https://www.mongodb.com/docs/manual/installation/

# Verificar version
mongod --version
```

---

## Clonar el Repositorio

```bash
# Clonar el repositorio
git clone git@github.com:ufo-hunters/ufohunters-site.git

# Entrar al directorio del proyecto
cd ufohunters-site
```

---

## Instalar Dependencias

```bash
# Instalar todas las gemas del proyecto
bundle install
```

Si la instalacion falla, verificar:
- Que la version de Ruby sea 3.2.8 (`ruby --version`).
- Que tienes las librerias del sistema para MiniMagick: `sudo apt-get install imagemagick libmagickwand-dev` (Ubuntu).
- Que tienes las librerias para MongoDB: `sudo apt-get install libssl-dev`.

---

## Variables de Entorno

El proyecto usa variables de entorno para configuracion sensible. Copia el archivo de ejemplo y ajusta los valores:

```bash
# Si existe un .env.example, copiarlo
cp .env.example .env

# Si no existe, crear .env con las variables necesarias (ver tabla abajo)
touch .env
```

### Variables Requeridas para Desarrollo

| Variable | Descripcion | Valor tipico para desarrollo |
|----------|-------------|------------------------------|
| `MONGOHQ_URL` | URI de conexion a MongoDB de produccion | No se usa en desarrollo (usa `mongoid.yml`) |
| `SECRET_KEY_BASE` | Clave secreta para sesiones Rails | Generar con `rails secret` |
| `GOOGLE_MAPS_API_KEY` | API key de Google Maps v3 | Obtener en Google Cloud Console |
| `RECAPTCHA_SITE_KEY` | Clave publica de reCAPTCHA | Obtener en Google reCAPTCHA |
| `RECAPTCHA_SECRET_KEY` | Clave privada de reCAPTCHA | Obtener en Google reCAPTCHA |

### Variables para Subida de Imagenes (Cloudinary)

| Variable | Descripcion |
|----------|-------------|
| `CLOUDINARY_URL` | URL con credenciales Cloudinary (formato: `cloudinary://api_key:api_secret@cloud_name`) |
| `CLOUDINARY_CLOUD_NAME` | Nombre de tu cuenta Cloudinary |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary |

### Variables de Email (solo necesarias para pruebas de email)

| Variable | Descripcion |
|----------|-------------|
| `SENDGRID_USERNAME` | Usuario SMTP de SendGrid |
| `SENDGRID_PASSWORD` | Password SMTP de SendGrid |

### Variables de Cache (solo produccion)

| Variable | Descripcion |
|----------|-------------|
| `REDIS_URL` | URL de conexion a Redis |
| `MEMCACHEDCLOUD_SERVERS` | Servidores Memcached (fallback de Redis) |

**IMPORTANTE**: Nunca subir el archivo `.env` al repositorio. Esta en `.gitignore`.

---

## Configuracion de MongoDB

En desarrollo, la configuracion de MongoDB esta en `config/mongoid.yml`. Por defecto, Mongoid se conecta a `mongodb://localhost:27017/ufosightings` en desarrollo.

No hay migraciones que ejecutar. Los indices de MongoDB se crean con:

```bash
# Crear indices definidos en los modelos (incluido el indice 2dsphere para geoespacial)
rails db:mongoid:create_indexes
```

Para cargar datos de prueba (si hay un seed):

```bash
# Cargar seeds
rails db:seed
```

### Verificar la Conexion

```bash
# Abrir la consola de Rails y verificar que Mongoid conecta
rails console

# En la consola, probar una query
Report.count
# => 0 (o el numero de documentos que haya)
```

---

## Ejecutar la Aplicacion

### Modo Desarrollo

```bash
# Iniciar el servidor Rails con Puma
rails server

# O en modo desarrollo con recarga de assets Tailwind en tiempo real
bin/dev
```

La aplicacion estara disponible en `http://localhost:3000`.

### Compilar Assets

```bash
# Compilar assets Propshaft (normalmente no necesario en desarrollo)
rails assets:precompile

# Compilar Tailwind CSS
rails tailwindcss:build

# En modo watch (recompila al cambiar archivos CSS)
rails tailwindcss:watch
```

### Verificar que Funciona

Navega a `http://localhost:3000`. Deberia cargar la pagina principal de avistamientos. Si el mapa no aparece, verifica que `GOOGLE_MAPS_API_KEY` este configurada.

---

## Ejecutar Tests

El proyecto usa **Minitest** como framework de testing via `ActiveSupport::TestCase`.

```bash
# Ejecutar todos los tests
rails test

# Ejecutar solo tests unitarios (modelos)
rails test test/unit/

# Ejecutar solo tests funcionales (controladores)
rails test test/functional/

# Ejecutar solo tests de integracion
rails test test/integration/

# Ejecutar un archivo de test especifico
rails test test/unit/report_test.rb

# Ejecutar un test especifico por nombre
rails test test/unit/report_test.rb -n test_nombre_del_test

# Ejecutar tests con verbose output
rails test -v
```

**Nota importante**: Los fixtures de Rails son incompatibles con Mongoid. Los tests usan helper methods propios para crear datos de prueba (`create_dummy_report`, etc.) definidos en `test/test_helper.rb`.

La base de datos de test es `sightings_test` (configurada en `config/mongoid.yml`).

### Antes de Hacer Push

Antes de subir cambios, asegurate de que:

1. Todos los tests pasan: `rails test`
2. La aplicacion arranca correctamente: `rails server`
3. Los assets compilan: `rails assets:precompile`

---

## Problemas Comunes y Troubleshooting

### Error: "Cannot connect to MongoDB"

```
Mongoid::Errors::NoClientConfig or connection refused on 127.0.0.1:27017
```

**Solucion**: Verificar que MongoDB esta corriendo:

```bash
# Si usas Docker
docker ps | grep ufohunters-mongo
docker start ufohunters-mongo

# Si es instalacion nativa
sudo systemctl status mongod
sudo systemctl start mongod
```

### Error: "Version de Ruby incompatible"

```
Your Ruby version is X.Y.Z, but your Gemfile specified 3.2.8
```

**Solucion**:

```bash
rvm use 3.2.8
# o
rvm use 3.2.8 --default
```

### Error: "MiniMagick / ImageMagick not found"

```
MiniMagick::Error: ImageMagick/GraphicsMagick is not installed
```

**Solucion**:

```bash
# Ubuntu/Debian
sudo apt-get install imagemagick

# macOS
brew install imagemagick
```

### Error: "Puerto 3000 en uso"

```
Address already in use - bind(2) for "127.0.0.1" port 3000
```

**Solucion**:

```bash
# Encontrar el proceso
lsof -i :3000
# Terminar el proceso
kill -9 <PID>

# O usar un puerto diferente
rails server -p 3001
```

### El mapa no aparece

**Causa**: `GOOGLE_MAPS_API_KEY` no configurada o invalida.

**Solucion**: Verificar que la variable de entorno esta en `.env` y que la clave tiene los permisos correctos en Google Cloud Console (Maps JavaScript API habilitada).

### reCAPTCHA no funciona en local

En desarrollo, reCAPTCHA puede configurarse para siempre aprobar. Verificar la configuracion en `config/environments/development.rb` o usar las claves de test de Google para reCAPTCHA.

### Los tests fallan con errores de MongoDB

Asegurate de que la base de datos de test (`sightings_test`) esta limpia antes de ejecutar los tests. Mongoid con `use_utc: true` puede causar discrepancias de zona horaria en tests.

---

## Recomendaciones de IDE

### Visual Studio Code

Extensiones recomendadas:

| Extension | Proposito |
|-----------|-----------|
| Ruby LSP (Shopify) | Soporte del lenguaje Ruby, autocompletado, debugging |
| Rails (Hridoy Sankar Dutta) | Snippets y navegacion Rails |
| ERB Formatter/Beautify | Formateo de plantillas ERB |
| MongoDB for VS Code | Explorador de colecciones MongoDB |
| Tailwind CSS IntelliSense | Autocompletado de clases Tailwind |
| EditorConfig | Consistencia de formato entre editores |
| GitLens | Historial de git integrado |
| Docker | Si usas Docker para MongoDB |

### RubyMine

JetBrains RubyMine tiene soporte nativo para Rails y puede configurar el debugger de Rails sin extensiones adicionales.

---

## Siguiente Paso

Una vez que tu entorno este funcionando:

1. Lee las [convenciones de codigo](convenciones-codigo.md) del proyecto.
2. Familiarizate con la [arquitectura](arquitectura.md) del sistema.
3. Revisa las [estrategias de testing](estrategias-testing.md).

---

> Si encuentras un problema no documentado aqui, por favor agrega la solucion a esta guia y abre un PR.
