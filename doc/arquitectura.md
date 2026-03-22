# Arquitectura del Sistema — UFO Hunters Site

## Vision General

ufo-hunters.com es una aplicacion web publica construida con **Ruby 3.2.8** sobre el framework **Rails 8.0.2**, siguiendo una arquitectura **MVC monolith**. Permite a usuarios de todo el mundo registrar, explorar y comentar avistamientos de OVNIs, con soporte de mapas interactivos, geolocalizacion y galerias multimedia.

El proyecto nacio en la era Rails 3 / Ruby 1.9 y ha sido progresivamente modernizado hasta Rails 8. MongoDB fue la eleccion original para gestionar datos geoespaciales y sigue siendo el unico almacen de datos persistente via Mongoid 9.0.

---

## Arquitectura de Alto Nivel

El sistema sigue el patron **MVC monolith** de Rails, con renderizado HTML en servidor y enriquecimiento de UI via Hotwire (Turbo + Stimulus). No hay una API REST separada; la unica salida JSON es el endpoint `GET /map_json` que sirve datos GeoJSON para el mapa interactivo del frontend.

### Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENTES                           │
│              (Navegadores Web)                          │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/HTTPS
                       ▼
┌─────────────────────────────────────────────────────────┐
│              HEROKU / DOCKER (Puma 6.x)                 │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │ Controllers │  │   Models    │  │    Views    │    │
│  │  (Rails MVC)│──│  (Mongoid)  │──│  (ERB +    │    │
│  │             │  │             │  │  Hotwire)   │    │
│  └─────────────┘  └──────┬──────┘  └─────────────┘    │
│                          │                              │
└──────────────────────────┼──────────────────────────────┘
                           │
              ┌────────────┼────────────┐
              ▼                         ▼
┌─────────────────────┐     ┌────────────────────────┐
│  MongoDB            │     │  Servicios externos     │
│  (Mongoid 9.0)      │     │  Cloudinary, SendGrid,  │
│  db: ufosightings   │     │  Google Maps, reCAPTCHA │
│  2dsphere indexes   │     │  New Relic, Redis       │
└─────────────────────┘     └────────────────────────┘
```

---

## Flujo de Datos

### Flujo de una Peticion Tipica (HTML)

1. **Recepcion**: El navegador envia una peticion HTTP a Puma.
2. **Routing**: `config/routes.rb` despacha la peticion al controlador correspondiente.
3. **Autenticacion**: El `before_action` del controlador verifica la sesion (custom session auth, no Devise).
4. **Logica de negocio**: El controlador interactua con los modelos Mongoid.
5. **Persistencia**: Mongoid traduce las operaciones a queries MongoDB. No hay migraciones: el esquema vive en los modelos.
6. **Respuesta**: La vista ERB renderiza HTML. Turbo puede reemplazar fragmentos de pagina sin recarga completa.

### Flujo del Endpoint GeoJSON

```
GET /map_json
  └► StatsController#map_json
      └► Report.where(status: :confirmed).with_coordinates
          └► MongoDB (query con 2dsphere index)
              └► Render JSON (GeoJSON FeatureCollection)
                  └► Google Maps API v3 (JavaScript en el cliente)
```

### Flujo de Subida de Imagenes

```
Usuario sube imagen
  └► CarrierWave + carrierwave-mongoid
      └► MiniMagick (procesamiento local)
          └► Cloudinary API (almacenamiento en la nube)
              └► URL de Cloudinary guardada en el documento MongoDB
```

---

## Stack Tecnologico

| Componente | Tecnologia | Proposito |
|------------|------------|-----------|
| Lenguaje | Ruby 3.2.8 | Lenguaje principal de desarrollo |
| Framework | Rails 8.0.2 (full-stack) | Framework MVC |
| Base de datos | MongoDB via Mongoid 9.0 | Persistencia de documentos y datos geoespaciales |
| Servidor web | Puma 6.x | Servidor HTTP multi-threaded |
| Asset pipeline | Propshaft | Servicio de assets estaticos |
| JavaScript | Import Maps + Hotwire (Turbo + Stimulus) | Interactividad sin bundler |
| CSS | Tailwind CSS 3.x via tailwindcss-rails | Estilos |
| Editor rich text | CKEditor | Edicion de articulos |
| Testing | Minitest (ActiveSupport::TestCase) | Framework de pruebas |
| Cache | Redis 5.x (produccion), Memcached (fallback) | Cache de aplicacion |
| Imagenes | Cloudinary + CarrierWave + MiniMagick | Almacenamiento y procesamiento |
| Email | ActionMailer + SendGrid SMTP | Notificaciones por correo |
| Monitoring | New Relic | APM y alertas |
| Seguridad | bcrypt, reCAPTCHA 5.x | Autenticacion y proteccion contra bots |
| Geoespacial | rgeo-geojson 2.x, MongoDB 2dsphere, Google Maps API v3 | Mapas y datos geograficos |
| CI/CD | Travis CI (configuracion obsoleta — migracion a GitHub Actions recomendada) | Integracion continua |
| Despliegue | Heroku (Procfile) + Docker (Dockerfile) | Plataformas de despliegue |
| Gestor de paquetes | Bundler | Gestion de gemas Ruby |

---

## Estructura del Proyecto

```
ufohunters-site/
├── app/
│   ├── controllers/          # SightingsController, ReportsController, ArticlesController,
│   │                         # UsersController, SessionsController, StatsController, ErrorsController
│   ├── models/               # Report, User, Article, Countries, CustomDate, Notifier
│   │   └── ckeditor/         # Modelos para CKEditor (assets, image files)
│   ├── views/                # Plantillas ERB + partials Turbo
│   ├── uploaders/            # CarrierWave uploaders (imagenes, CKEditor)
│   ├── helpers/              # View helpers
│   ├── mailers/              # ActionMailer (via Notifier)
│   └── assets/               # Imagenes estaticas (Propshaft)
├── config/
│   ├── routes.rb             # Definicion de rutas
│   ├── mongoid.yml           # Configuracion de MongoDB por entorno
│   ├── tailwind.config.js    # Configuracion de Tailwind CSS
│   └── importmap.rb          # Pin de dependencias JS via Import Maps
├── test/
│   ├── unit/                 # Tests unitarios de modelos
│   ├── functional/           # Tests de controladores
│   └── integration/          # Tests de integracion
├── doc/                      # Documentacion tecnica (este directorio)
├── Dockerfile                # Imagen Docker basada en ruby:3.2.8-slim
├── Procfile                  # Configuracion de procesos para Heroku
└── Gemfile                   # Dependencias Ruby
```

---

## Modelos Mongoid (sin migraciones)

En este proyecto **no existe `db/schema.rb` ni migraciones de base de datos**. El esquema esta definido directamente en cada modelo mediante declaraciones `field` e `index`:

```ruby
# Ejemplo: app/models/report.rb
class Report
  include Mongoid::Document
  include Mongoid::Timestamps

  field :location,    type: String
  field :shape,       type: String
  field :duration,    type: String
  field :description, type: String
  field :coordinates, type: Array   # [longitude, latitude]
  field :status,      type: String
  field :case_number, type: String

  # Indice geoespacial para queries de mapa
  index({ coord: "2dsphere" })

  # Indice de texto para busqueda
  index({ description: "text", location: "text" })
end
```

Para crear o modificar la estructura de datos, se editan los campos en el modelo y se ejecutan los indices con:

```bash
rails db:mongoid:create_indexes
```

---

## Controladores Principales

| Controlador | Responsabilidad |
|-------------|-----------------|
| `SightingsController` | Listado y visualizacion de avistamientos; vistas de mapa por region (northamerica, etc.) |
| `ReportsController` | CRUD de informes de avistamiento enviados por usuarios |
| `ArticlesController` | Gestion de articulos escritos por usuarios registrados |
| `UsersController` | Registro y perfil de usuario |
| `SessionsController` | Autenticacion custom (login/logout sin Devise) |
| `StatsController` | Estadisticas y endpoint GeoJSON (`/map_json`) |
| `ErrorsController` | Manejo custom de errores 404, 422 y 500 |

---

## Autenticacion

La autenticacion es completamente custom, sin Devise ni Warden:

- Las contrasenas se almacenan como bcrypt hashes via `has_secure_password`.
- `SessionsController` gestiona manualmente la creacion y destruccion de sesiones.
- El `User` usa el campo `username` como `_id` del documento MongoDB.
- Los controladores que requieren autenticacion usan `before_action :require_login`.

---

## Decisiones de Diseno Clave

### 1. MongoDB sobre SQL
Se eligio MongoDB desde el inicio del proyecto por su soporte nativo de datos geoespaciales (2dsphere indexes) y la flexibilidad del modelo de documentos para datos de avistamientos, que tienen estructura variable. Esta decision persiste en Rails 8 con Mongoid 9.

### 2. MVC monolith sobre microservicios
La escala actual del proyecto no justifica microservicios. Rails MVC proporciona toda la productividad necesaria con una sola base de codigo.

### 3. Propshaft + Import Maps sobre Webpack/esbuild
Rails 8 favorece esta combinacion para proyectos sin necesidades de bundling complejo. Import Maps elimina la necesidad de un paso de build para JavaScript.

### 4. Hotwire (Turbo + Stimulus) sobre SPA
Se mantiene el renderizado en servidor con enriquecimiento incremental via Turbo, evitando la complejidad de un frontend JavaScript independiente.

### 5. Autenticacion custom sobre Devise
La autenticacion del proyecto precede a la adopcion generalizada de Devise y ha sido mantenida en lugar de migrar.

---

## Infraestructura General

El sistema opera en tres entornos:

- **Desarrollo**: Local con MongoDB local y variables de entorno en `.env`.
- **Staging**: (si aplica) Replica de produccion para pruebas.
- **Produccion**: Heroku (Procfile + Puma) o Docker. Base de datos MongoDB Atlas via `MONGOHQ_URL`. Cache Redis via `REDIS_URL`. Imagenes en Cloudinary.

El CI/CD esta actualmente gestionado por Travis CI con una configuracion obsoleta (Ruby 2.1.2). Se recomienda migrar a GitHub Actions.

---

## Consideraciones de Seguridad

- Autenticacion basada en sesiones con bcrypt para hashing de contrasenas.
- reCAPTCHA en formularios publicos (registro, envio de informes) para prevenir spam.
- CSRF protection habilitado por Rails por defecto.
- Variables de entorno para todos los secretos (API keys de Cloudinary, Google Maps, SendGrid, MongoDB URI de produccion).
- `SECRET_KEY_BASE` gestionado como variable de entorno en Heroku.
- New Relic para deteccion de anomalias en produccion.

---

## Escalabilidad

- Heroku permite escalar dynos horizontalmente sin cambios de codigo.
- MongoDB Atlas soporta sharding y replicas para escalar la base de datos.
- Redis como cache reduce la carga en MongoDB para lecturas frecuentes.
- Los indices 2dsphere de MongoDB garantizan queries geoespaciales eficientes incluso con alto volumen de registros.

---

> Para decisiones arquitectonicas especificas, consultar el registro de [Decisiones de Diseno (ADRs)](decisiones-de-diseno.md).
