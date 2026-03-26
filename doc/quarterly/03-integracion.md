# Integracion — Reporte Trimestral — UFO Hunters Site

**Proyecto**: ufo-hunters.com
**Periodo**: [Q1/Q2/Q3/Q4] [AÑO]
**Fecha del Reporte**: [FECHA]
**Tipo de API**: HTML-first con endpoint GeoJSON para mapa interactivo

---

## Integraciones Externas

### Inventario de Integraciones Activas

| # | Servicio | Tipo | Protocolo | Estado | Criticidad |
|---|---------|------|-----------|--------|------------|
| 1 | MongoDB Atlas (MONGOHQ) | Base de datos | MongoDB Wire Protocol | Activo | Critica |
| 2 | Cloudinary | Almacenamiento imagenes (saliente) | HTTPS REST API | Activo | Alta |
| 3 | Google Maps API v3 | Mapa interactivo (saliente desde browser) | HTTPS JavaScript API | Activo | Alta |
| 4 | SendGrid | Email transaccional (saliente) | SMTP | Activo | Alta |
| 5 | reCAPTCHA | Proteccion contra bots (entrante) | HTTPS REST API | Activo | Alta |
| 6 | Redis | Cache en produccion | Redis protocol | Activo | Media |
| 7 | New Relic | APM y monitoring (saliente) | HTTPS Agent | Activo | Media |
| 8 | GitHub Actions | CI/CD | GitHub webhooks | Activo | Media |

---

## Detalle de Integraciones Criticas

### MongoDB Atlas (MONGOHQ)

- **Proposito**: Base de datos principal. Almacena todos los documentos: `Report`, `User`, `Article`, `Countries`.
- **Configuracion**: URI en variable de entorno `MONGOHQ_URL` (produccion). En desarrollo, MongoDB local via `config/mongoid.yml`.
- **Indices criticos**: 2dsphere en `Report.coordinates` y `Countries.geometry` para el mapa.
- **Fallback**: Sin fallback — es una dependencia critica. Una caida de MongoDB hace caer la aplicacion.
- **Monitoring**: New Relic incluye metricas de queries MongoDB.

### Cloudinary

- **Proposito**: Almacenamiento permanente de imagenes subidas por usuarios (avistamientos, articulos, CKEditor). CDN global para carga rapida.
- **Integracion**: Gema `cloudinary` + CarrierWave + `carrierwave-mongoid`. MiniMagick procesa las imagenes localmente antes de subirlas.
- **Configuracion**: `CLOUDINARY_URL` o variables individuales `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
- **Fallback**: Si Cloudinary falla, las subidas de imagenes fallan pero el resto de la aplicacion funciona.

### Google Maps API v3

- **Proposito**: Mapa interactivo que muestra avistamientos geolocalizados. El frontend carga la API directamente desde el navegador del usuario.
- **Flujo**: `StatsController#map_json` → MongoDB (query 2dsphere) → GeoJSON → JavaScript Google Maps en el cliente.
- **Configuracion**: `GOOGLE_MAPS_API_KEY` en variables de entorno, inyectada en la vista como variable JavaScript.
- **Fallback**: Si la API de Google Maps falla, el mapa no se carga pero el resto del sitio funciona.

### SendGrid

- **Proposito**: Envio de emails transaccionales via ActionMailer (notificaciones, recuperacion de contrasena si se implementa, etc.).
- **Configuracion**: `SENDGRID_USERNAME` y `SENDGRID_PASSWORD` via SMTP en `config/environments/production.rb`.
- **En desarrollo**: ActionMailer usa `:test` delivery method (emails no se envian realmente).

### reCAPTCHA

- **Proposito**: Proteccion de formularios publicos (registro de usuario, envio de informes) contra bots y spam.
- **Integracion**: Gema `recaptcha` 5.x. El formulario incluye el widget y el controlador verifica la respuesta con la API de Google.
- **Configuracion**: `RECAPTCHA_SITE_KEY` (publica, en la vista) y `RECAPTCHA_SECRET_KEY` (privada, en el servidor).
- **En tests**: reCAPTCHA se bypasea en entorno test.

---

## Endpoint GeoJSON (Unica "API" del sistema)

ufo-hunters.com no tiene una API REST formal. El unico endpoint JSON es:

### GET /map_json

- **Descripcion**: Retorna un GeoJSON `FeatureCollection` con los avistamientos confirmados que tienen coordenadas.
- **Consumidor**: JavaScript del frontend (Google Maps API v3).
- **Autenticacion**: No requerida (endpoint publico).
- **Respuesta**: GeoJSON `FeatureCollection` con features de tipo `Point`.

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-3.7038, 40.4168]
      },
      "properties": {
        "location": "Madrid, Espana",
        "shape": "circulo",
        "date": "2024-11-15"
      }
    }
  ]
}
```

---

## Cambios en Integraciones Este Trimestre

### Integraciones Modificadas

| Integracion | Cambio | Razon | Impacto |
|-------------|--------|-------|---------|
| [Servicio] | [Que cambio] | [Por que] | [Como afecta] |

### Integraciones Deprecadas o Eliminadas

| Integracion | Fecha | Razon | Reemplazo |
|-------------|-------|-------|-----------|
| Travis CI | 2026-03-22 | Configuracion obsoleta con Ruby 2.1.2; no ejecutaba tests | GitHub Actions (activo) |
| Memcached (MEMCACHEDCLOUD) | 2026-03-22 | Cache redundante; Redis es suficiente | Redis (`REDIS_URL`) |

---

## Estado de Servicios Externos

| Servicio | SLA Acordado | Cumplimiento Este Trimestre | Incidentes |
|----------|-------------|---------------------------|------------|
| MongoDB Atlas | 99.95% | [X%] | [N incidentes] |
| Cloudinary | 99.9% | [X%] | [N incidentes] |
| Google Maps API | 99.9% | [X%] | [N incidentes] |
| SendGrid | 99.9% | [X%] | [N incidentes] |
| Heroku | 99.9% | [X%] | [N incidentes] |

### Costos de Servicios Externos

| Servicio | Costo Anterior | Costo Actual | Tendencia |
|----------|---------------|-------------|-----------|
| Heroku | [X/mes] | [Y/mes] | [Sube / Baja / Estable] |
| MongoDB Atlas | [X/mes] | [Y/mes] | [Sube / Baja / Estable] |
| Cloudinary | [X/mes] | [Y/mes] | [Sube / Baja / Estable] |
| Google Maps API | [X/mes] | [Y/mes] | [Sube / Baja / Estable] |
| SendGrid | [X/mes] | [Y/mes] | [Sube / Baja / Estable] |

### Dependencias Criticas

| Servicio | Tipo | Fallback | Downtime Tolerable |
|----------|------|----------|--------------------|
| MongoDB Atlas | Hard | Ninguno | < 5 minutos |
| Cloudinary | Soft | Las imagenes no se sirven; aplicacion sigue funcionando | < 1 hora |
| Google Maps API | Soft | El mapa no se carga; listados de texto siguen funcionando | < 4 horas |
| Heroku | Hard | Despliegue Docker alternativo | < 30 minutos |

---

## Estado del Testing de Integracion

### Cobertura de Tests de Integracion

| Integracion | Tests Existentes | Estado |
|-------------|-----------------|--------|
| MongoDB (Mongoid models) | Tests unitarios y funcionales contra DB de test | Suficiente para cobertura basica |
| Cloudinary | Mockeado en tests con stubs de CarrierWave | Suficiente |
| Google Maps / GeoJSON | Test del endpoint `/map_json` | Existente |
| SendGrid / ActionMailer | `delivery_method = :test` en entorno test | Suficiente |
| reCAPTCHA | Bypaseado en entorno test | Suficiente |

### Entorno de Testing

- **MongoDB**: Base de datos `sightings_test` (instancia local en CI). En GitHub Actions, MongoDB 7 corre como servicio.
- **Cloudinary**: Mockeado via stubs de CarrierWave en todos los tests.
- **Google Maps**: No se testea directamente (API del navegador).
- **SendGrid**: `ActionMailer::Base.deliveries` acumula emails en tests para assertions.
- **reCAPTCHA**: Bypaseado en entorno test via configuracion.

---

## Notas de Migracion

### Migraciones Completadas

| Migracion | Descripcion | Fecha | Impacto |
|-----------|-------------|-------|---------|
| Travis CI → GitHub Actions | CI/CD migrado a GitHub Actions con Ruby 3.2.8 + MongoDB 7 | 2026-03-22 | Ninguno para usuarios finales |
| Memcached → solo Redis | Eliminado fallback a Memcached; produccion usa solo Redis via `REDIS_URL` | 2026-03-22 | Simplificacion de configuracion |

### Migraciones Planificadas

| Migracion | Descripcion | Fecha Estimada | Impacto | Responsable |
|-----------|-------------|----------------|---------|-------------|
| [Migracion] | [Que se migrara] | [Fecha] | [Impacto esperado] | [Nombre] |

---

## Diagrama de Integraciones

```
                    ┌──────────────────────────────────┐
                    │        ufo-hunters.com            │
                    │       (Rails 8 / Puma / Heroku)   │
                    │                                   │
  Navegadores ─────►│  Rails Controllers + Mongoid      │
                    │                                   │
                    │  ┌──────────┐  ┌───────────────┐  │
                    │  │ HTML     │  │ GET /map_json  │  │
                    │  │ Responses│  │ (GeoJSON)      │  │
                    │  └──────────┘  └───────────────┘  │
                    └────────┬──────────────────────────┘
                             │
         ┌───────────────────┼───────────────────────────┐
         ▼                   ▼                           ▼
┌─────────────────┐ ┌─────────────────┐       ┌──────────────────┐
│  MongoDB Atlas  │ │   Cloudinary    │       │  SendGrid SMTP   │
│  (MONGOHQ_URL)  │ │  (imagenes CDN) │       │  (email)         │
└─────────────────┘ └─────────────────┘       └──────────────────┘
         ▼
┌─────────────────┐
│  Redis          │
│  (cache prod.)  │
└─────────────────┘

Desde el navegador del usuario:
  ├── Google Maps API v3 (carga el mapa con datos GeoJSON de /map_json)
  └── reCAPTCHA (validacion de formularios publicos)

Monitoring:
  └── New Relic APM (todos los requests Rails)

CI/CD:
  └── GitHub Actions (test + lint en cada push/PR a master)
```

---

## Planes de Integracion para el Proximo Trimestre

### Nuevas Integraciones Planificadas

1. [Integracion 1: Descripcion, proposito y timeline]
2. [Integracion 2: Descripcion, proposito y timeline]

### Mejoras a Integraciones Existentes

1. Revisar y actualizar la configuracion de Cloudinary para usar la ultima version de la gema.
2. [Mejora adicional]

---

> Para la documentacion del endpoint GeoJSON, ver la seccion "Endpoint GeoJSON" en este documento. Para la arquitectura general, ver [arquitectura.md](../arquitectura.md).
