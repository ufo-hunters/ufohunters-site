# Convenciones de Codigo — UFO Hunters Site

Este documento define los estandares y convenciones de codigo para **ufo-hunters.com**. Todos los miembros del equipo deben seguir estas convenciones para mantener un codigo consistente, legible y mantenible.

---

## Convenciones del Lenguaje (Ruby)

### Principios Generales

- Seguir las convenciones idiomaticas de **Ruby**: preferir el estilo expressivo sobre el verboso.
- Preferir claridad sobre brevedad cuando ambas no coexisten.
- Evitar trucos del lenguaje que sacrifiquen legibilidad (evitar `rescue nil`, abusar de `&&=`, etc.).
- Mantener metodos cortos y con una sola responsabilidad (maximo ~10 lineas idealmente).
- Limitar la complejidad ciclomatica: no mas de 10 paths por metodo.

### Estilo de Codigo

- Indentacion: 2 espacios (sin tabs).
- Longitud maxima de linea: 120 caracteres.
- Una sentencia por linea.
- Espacios alrededor de operadores.
- Linea en blanco entre bloques logicos y entre metodos.
- Strings: preferir comillas simples `'...'` salvo que se use interpolacion o escapes especiales.
- Usar `do...end` para bloques multilinea, `{...}` para bloques de una linea.

### Manejo de Errores

- Nunca ignorar excepciones silenciosamente (`rescue nil` esta prohibido en logica critica).
- Capturar excepciones especificas, no `rescue Exception` o `rescue StandardError` sin causa justificada.
- Incluir contexto suficiente en los mensajes de error.
- En controladores Rails, usar `rescue_from` para centralizar el manejo de excepciones conocidas.

### Comentarios

- El codigo debe ser autoexplicativo. Usar comentarios solo cuando el "por que" no es obvio.
- Documentar metodos publicos complejos con comentarios de una linea.
- No dejar codigo comentado en el repositorio.
- Los TODO deben incluir contexto: `# TODO: Migrar a nuevo endpoint de Cloudinary cuando disponible`.

---

## Convenciones de Rails

### Modelos (Mongoid)

Este proyecto usa **Mongoid** como ODM, no ActiveRecord. Las diferencias clave:

- **No hay migraciones**. El esquema esta en el modelo. Para agregar un campo: declarar `field :nombre, type: Tipo` en el modelo y ejecutar `rails db:mongoid:create_indexes` si hay indices nuevos.
- Declarar todos los campos explicitamente con `field`. Evitar confiar en la flexibilidad de documentos no declarados.
- Declarar indices con `index` directamente en el modelo. Siempre crear el indice para campos usados en queries frecuentes.
- Usar `validates` de ActiveModel igual que en ActiveRecord — Mongoid los soporta completamente.
- Las asociaciones usan `has_many`, `belongs_to`, `embeds_many` (Mongoid tiene embedding nativo).

```ruby
# Ejemplo de modelo Mongoid correcto
class Report
  include Mongoid::Document
  include Mongoid::Timestamps

  field :location,    type: String
  field :description, type: String
  field :coordinates, type: Array
  field :status,      type: String, default: 'pending'

  validates :location, presence: true
  validates :description, length: { minimum: 20 }

  index({ coordinates: "2dsphere" })
  index({ status: 1, created_at: -1 })

  scope :confirmed, -> { where(status: 'confirmed') }
  scope :recent,    -> { order(created_at: :desc) }
end
```

### Controladores

- Seguir convenciones REST de Rails: 7 acciones estandar (`index`, `show`, `new`, `create`, `edit`, `update`, `destroy`).
- Usar `before_action` para autenticacion y carga de recursos.
- Mantener controladores delgados: la logica de negocio va en el modelo o en servicios.
- No llamar a mas de un modelo desde el controlador si se puede evitar.
- Los parametros se filtran con Strong Parameters: `params.require(:report).permit(...)`.

```ruby
class ReportsController < ApplicationController
  before_action :require_login, only: [:new, :create, :edit, :update, :destroy]
  before_action :set_report, only: [:show, :edit, :update, :destroy]

  def create
    @report = Report.new(report_params)
    if @report.save
      redirect_to @report, notice: 'Informe enviado correctamente.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def set_report
    @report = Report.find(params[:id])
  end

  def report_params
    params.require(:report).permit(:location, :description, :shape, :duration, coordinates: [])
  end
end
```

### Vistas (ERB + Hotwire)

- Mantener logica en helpers y partials, no en vistas.
- Usar Turbo Frames (`<turbo-frame>`) para actualizar partes de la pagina sin recarga.
- Usar Stimulus controllers para comportamiento JavaScript: nombrar el archivo `nombre_controller.js`, el identificador `data-controller="nombre"`.
- No escribir JavaScript inline en vistas ERB.
- Los partials se nombran con prefijo underscore: `_report_card.html.erb`.

### Rutas

- Usar recursos RESTful (`resources :reports`) siempre que sea posible.
- Evitar rutas personalizadas innecesarias.
- Nombrar las rutas custom de forma descriptiva.

```ruby
# config/routes.rb
Rails.application.routes.draw do
  resources :reports
  resources :articles
  resources :sightings, only: [:index, :show]
  resource :session, only: [:new, :create, :destroy]
  get '/map_json', to: 'stats#map_json'
  get '/stats', to: 'stats#index'
end
```

---

## Convenciones de Nombrado

### Archivos y Directorios

| Tipo | Formato | Ejemplo |
|------|---------|---------|
| Modelos | snake_case | `report.rb`, `user.rb` |
| Controladores | snake_case + `_controller` | `reports_controller.rb` |
| Vistas | snake_case | `reports/index.html.erb` |
| Helpers | snake_case + `_helper` | `reports_helper.rb` |
| Uploaders | PascalCase + `Uploader` | `ReportImageUploader` en `report_image_uploader.rb` |
| Tests | snake_case + `_test` | `report_test.rb` |
| Stimulus controllers | snake_case + `_controller.js` | `map_controller.js` |

### Clases

- Usar PascalCase: `Report`, `SightingsController`, `ReportImageUploader`.
- Modelos Mongoid: sinonimo con la coleccion MongoDB (pluralizado por convencion).
- Controladores: plural del recurso + `Controller`.

### Metodos

- Usar snake_case: `create_report`, `find_by_location`, `confirmed?`.
- Predicados booleanos con sufijo `?`: `confirmed?`, `has_images?`, `valid?`.
- Metodos destructivos con sufijo `!`: `approve!`, `reject!`.
- Evitar nombres genericos: `process_data`, `handle_stuff`.

### Variables y Constantes

- Variables locales: snake_case: `current_user`, `report_params`.
- Variables de instancia: snake_case con prefijo `@`: `@report`, `@reports`.
- Constantes: UPPER_SNAKE_CASE: `MAX_IMAGES_PER_REPORT = 10`.
- Simbolos en lugar de strings para claves de hash internas: `:status`, `:location`.

---

## Estructura del Proyecto

```
ufohunters-site/
├── app/
│   ├── controllers/          # Un archivo por controlador
│   ├── models/               # Modelos Mongoid (sin schema.rb)
│   │   └── ckeditor/         # Modelos especificos de CKEditor
│   ├── views/                # ERB partials y layouts
│   ├── uploaders/            # CarrierWave uploaders
│   ├── helpers/              # View helpers
│   ├── javascript/           # Stimulus controllers
│   └── assets/               # Imagenes y fuentes estaticas
├── config/
│   ├── mongoid.yml           # Conexion MongoDB por entorno
│   ├── importmap.rb          # Import Maps (no usar require_tree)
│   └── tailwind.config.js    # Tailwind config
├── test/
│   ├── unit/                 # Tests de modelos
│   ├── functional/           # Tests de controladores
│   └── integration/          # Tests de integracion
└── doc/                      # Documentacion
```

### Reglas de Estructura

- Cada directorio debe tener un proposito claro.
- Los modelos CKEditor van en `app/models/ckeditor/` (subdirectorio dedicado).
- Los uploaders van en `app/uploaders/`, con un archivo por uploader.
- Los Stimulus controllers van en `app/javascript/controllers/`.

---

## Sin Linter Configurado

Actualmente el proyecto **no tiene RuboCop configurado**. Se recomienda agregar RuboCop con el preset de StandardRB o el perfil Rails oficial:

```ruby
# Gemfile (grupo development)
group :development, :test do
  gem 'rubocop', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-minitest', require: false
end
```

Hasta que se configure el linter, aplicar manualmente las convenciones de esta guia en los code reviews.

---

## Convenciones de Git

### Ramas

Formato: `tipo/descripcion-breve`

| Tipo | Uso | Ejemplo |
|------|-----|---------|
| `feature/` | Nueva funcionalidad | `feature/filtro-por-forma` |
| `fix/` | Correccion de bug | `fix/mapa-no-carga-movil` |
| `refactor/` | Refactoring sin cambio funcional | `refactor/extraer-servicio-geocoding` |
| `docs/` | Cambios en documentacion | `docs/actualizar-setup-local` |
| `chore/` | Mantenimiento | `chore/actualizar-dependencias` |
| `hotfix/` | Correccion urgente en produccion | `hotfix/error-subida-imagenes` |

### Commits

Formato:

```
tipo(alcance): descripcion breve en imperativo

Cuerpo opcional explicando el por que del cambio.

Refs: #123
```

Tipos permitidos: `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `chore`, `perf`.

Reglas:
- Primera linea: maximo 72 caracteres.
- Imperativo: "agregar filtro", "corregir query", no "agrega", "corrigiendo".
- No terminar con punto.

### Pull Requests

Todo PR debe incluir:
1. **Que**: Resumen de los cambios.
2. **Por que**: Contexto y motivacion.
3. **Como probar**: Instrucciones para verificar el cambio.
4. **Screenshots**: Si hay cambios visuales en la UI.

PRs pequenos (menos de 400 lineas de cambio) son preferibles.

---

## Seguridad en el Codigo

- Nunca hardcodear API keys, contrasenas, URIs de MongoDB o secretos.
- Usar variables de entorno para toda configuracion sensible.
- Validar toda entrada del usuario antes de procesarla (Mongoid validators + Strong Parameters).
- En queries MongoDB: usar los metodos de Mongoid (`where`, `find`) — nunca interpolar strings en queries raw.
- No loggear datos sensibles: contrasenas, tokens de sesion, datos personales de usuarios.
- Los uploaders CarrierWave deben tener `extension_allowlist` definido para prevenir subida de archivos arbitrarios.

---

> Estas convenciones se revisan periodicamente por el equipo. Para proponer cambios, abrir un issue con la etiqueta `conventions`.
