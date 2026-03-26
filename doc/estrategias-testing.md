# Estrategias de Testing — UFO Hunters Site

## Filosofia de Testing

En **ufo-hunters.com**, los tests son una parte integral del proceso de desarrollo. Nuestros principios de testing son:

1. **Los tests son documentacion viva**: Un buen test describe el comportamiento esperado mejor que cualquier comentario.
2. **Escribir tests que den confianza**: Los tests deben darnos seguridad al hacer cambios, no ser una carga de mantenimiento.
3. **Testear comportamiento, no implementacion**: Los tests deben verificar "que hace" el codigo, no "como lo hace".
4. **Cada bug corregido necesita un test**: Antes de corregir un bug, escribir un test que lo reproduce. Despues, verificar que la correccion lo hace pasar.
5. **Tests rapidos y deterministas**: Los tests deben dar el mismo resultado cada vez. Tests lentos o flaky son peores que no tener tests.

---

## Framework de Testing: Minitest

El proyecto usa **Minitest** con `ActiveSupport::TestCase` (el framework de test por defecto de Rails). No se usa RSpec.

### Caracteristicas clave del setup

- Tests en `test/` organizados en `unit/`, `functional/`, e `integration/`.
- **No hay fixtures de Rails** — son incompatibles con Mongoid. En su lugar se usan helper methods para crear datos de prueba.
- La base de datos de test es `sightings_test` (definida en `config/mongoid.yml`).
- `test/test_helper.rb` define helpers compartidos como `create_dummy_report`, `create_dummy_user`, etc.
- La gema `minitest` esta fijada a `~> 5.25` en el Gemfile para compatibilidad con Rails 8.

---

## Piramide de Tests

```
        /\
       /  \
      / Func.\       Moderados - Tests de controladores (request/response)
     /--------\
    /           \
   / Integracion \   Pocos - Flujos completos de usuario
  /----------------\
 /                  \
/     Unitarios      \  Muchos - Logica de modelos, validaciones, scopes
/--------------------\
```

### Tests Unitarios (Base de la Piramide) — `test/unit/`

- **Alcance**: Un modelo Mongoid en aislamiento.
- **Que testear**: Validaciones, scopes, metodos de instancia, callbacks, logica de negocio del modelo.
- **Velocidad**: Milisegundos por test.
- **Setup**: Crear documentos MongoDB directamente con helpers, no fixtures.

```ruby
# test/unit/report_test.rb
require 'test_helper'

class ReportTest < ActiveSupport::TestCase
  test "report es invalido sin location" do
    report = Report.new(description: "Vi algo raro", shape: "circulo")
    assert_not report.valid?
    assert_includes report.errors[:location], "can't be blank"
  end

  test "scope confirmed retorna solo informes aprobados" do
    create_dummy_report(status: 'confirmed')
    create_dummy_report(status: 'pending')
    assert_equal 1, Report.confirmed.count
  end
end
```

### Tests Funcionales (Medio de la Piramide) — `test/functional/`

- **Alcance**: Un controlador Rails — peticion HTTP y respuesta.
- **Que testear**: Codigo de respuesta HTTP, redirecciones, contenido de la respuesta, efectos secundarios (documentos creados/modificados).
- **Velocidad**: Segundos por test.

```ruby
# test/functional/reports_controller_test.rb
require 'test_helper'

class ReportsControllerTest < ActionController::TestCase
  test "GET index retorna 200" do
    get reports_path
    assert_response :success
  end

  test "POST create con datos validos redirige al informe" do
    login_as(create_dummy_user)
    assert_difference('Report.count') do
      post reports_path, params: { report: valid_report_params }
    end
    assert_redirected_to report_path(assigns(:report))
  end

  test "POST create sin autenticacion redirige a login" do
    post reports_path, params: { report: valid_report_params }
    assert_redirected_to login_path
  end
end
```

### Tests de Integracion — `test/integration/`

- **Alcance**: Flujos completos de usuario a traves de multiples controladores.
- **Que testear**: Flujos criticos como registro de usuario, envio de informe, publicacion de articulo.
- **Velocidad**: Segundos por test.

---

## Estructura de Directorios de Tests

```
test/
├── test_helper.rb                # Setup global, helpers compartidos
├── unit/                         # Tests unitarios de modelos
│   ├── report_test.rb
│   ├── user_test.rb
│   ├── article_test.rb
│   └── countries_test.rb
├── functional/                   # Tests de controladores
│   ├── sightings_controller_test.rb
│   ├── reports_controller_test.rb
│   ├── articles_controller_test.rb
│   ├── sessions_controller_test.rb
│   └── stats_controller_test.rb
└── integration/                  # Tests de flujos completos
    ├── user_registration_test.rb
    └── report_submission_test.rb
```

---

## Datos de Prueba: Helpers en lugar de Fixtures

**Los fixtures de Rails son incompatibles con Mongoid.** En su lugar, el proyecto usa helper methods definidos en `test/test_helper.rb`:

```ruby
# test/test_helper.rb
module TestHelpers
  def create_dummy_report(attrs = {})
    Report.create!({
      location: "Madrid, Espana",
      description: "Objeto luminoso en el cielo nocturno, sin sonido aparente, movimiento irregular",
      shape: "circulo",
      duration: "5 minutos",
      coordinates: [-3.7038, 40.4168],
      status: 'pending'
    }.merge(attrs))
  end

  def create_dummy_user(attrs = {})
    User.create!({
      username: "testuser_#{SecureRandom.hex(4)}",
      email: "test_#{SecureRandom.hex(4)}@example.com",
      password: "password123",
      password_confirmation: "password123"
    }.merge(attrs))
  end

  def login_as(user)
    session[:user_id] = user.id.to_s
  end
end
```

### Ventajas de este enfoque

- Control total sobre el estado de cada test.
- Sin dependencias de archivos YAML de fixtures.
- Facil de adaptar a medida que los modelos Mongoid evolucionan.
- Compatible con la naturaleza de documentos de MongoDB.

---

## Que Testear y Que No

### SI Testear

- Validaciones de los modelos Mongoid (`validates presence`, `length`, `format`, etc.).
- Scopes y metodos de clase del modelo (`Report.confirmed`, `Report.by_country`, etc.).
- Metodos de instancia con logica de negocio (`report.approve!`, `user.full_name`, etc.).
- Callbacks importantes (`before_save`, `after_create`).
- Autorizacion: que un usuario no autenticado no puede crear/modificar recursos.
- Respuestas HTTP de los controladores (codigo, redirecciones, renders).
- El endpoint GeoJSON `/map_json` (que retorna JSON valido con features geoespaciales).
- Uploads de imagenes (con mocks de Cloudinary en tests).

### NO Testear

- Getters y setters triviales sin logica.
- Configuracion de Rails, Mongoid o gemas externas.
- El comportamiento de Mongoid en si mismo (ya tiene sus propios tests).
- Logica puramente cosmetica de vistas.
- Migraciones (no existen en este proyecto).

---

## Ejecutar Tests

```bash
# Todos los tests
rails test

# Solo unitarios
rails test test/unit/

# Solo funcionales
rails test test/functional/

# Solo integracion
rails test test/integration/

# Un archivo especifico
rails test test/unit/report_test.rb

# Un test especifico por nombre
rails test test/unit/report_test.rb -n "test_report_es_invalido_sin_location"

# Con verbose output
rails test -v

# Con formato de colores (requiere minitest-reporters)
MINITEST_REPORTER=ProgressReporter rails test
```

---

## Integracion con CI

Los tests se ejecutan automaticamente en **GitHub Actions** con cada push y pull request a `master`.

**Pipeline activo** (`.github/workflows/ci.yml`):

```
Push / PR a master
  └── Job: test
      ├── Ruby 3.2.8
      ├── MongoDB 7 (service container en puerto 27017)
      ├── bundle install
      └── rails test
  └── Job: lint
      └── bundle exec rubocop
```

**Estado actual del CI**: GitHub Actions configurado y activo. 80 tests, 96 assertions, 0 failures.

### Reglas de CI

- Un PR no puede mergearse si algun test falla.
- Un PR no puede mergearse si RuboCop reporta offenses fuera del `.rubocop_todo.yml`.
- Los tests flaky deben corregirse inmediatamente (o desactivarse temporalmente con un issue abierto).

---

## Convenciones de Nombrado de Tests

### Formato del Nombre del Test

Usar descripciones en espanol que respondan "que pasa cuando...":

```ruby
test "usuario invalido sin email"
test "scope confirmed retorna solo informes aprobados"
test "POST create con datos validos redirige al informe creado"
test "usuario no autenticado no puede crear articulos"
test "map_json retorna GeoJSON valido"
```

### Agrupacion

Agrupar tests por clase/archivo siguiendo la convencion de Rails:

```
test/unit/report_test.rb        -> class ReportTest
test/functional/reports_controller_test.rb -> class ReportsControllerTest
```

---

## Estrategia de Mocking

### Principios

1. **Mockear las fronteras externas**: Cloudinary, Google Maps, SendGrid, reCAPTCHA.
2. **No mockear la base de datos**: Los tests de integracion usan MongoDB real (base de datos `sightings_test`).
3. **Usar Minitest mocks y stubs** (`Minitest::Mock`, `stub`) para dependencias externas.

### Cuando Mockear

| Dependencia | Mockear? | Razon |
|-------------|----------|-------|
| MongoDB (en unit tests) | No | Usar la DB de test, es rapido y fiable |
| Cloudinary (uploads) | Si | Evitar llamadas reales a la API en tests |
| Google Maps API | Si | Llamadas externas, no deterministas |
| SendGrid / ActionMailer | Si | Usar `ActionMailer::Base.delivery_method = :test` |
| reCAPTCHA | Si | Deshabilitar en entorno test |
| Time / Date | Si | Para tests que dependen de fechas especificas |

### Ejemplo de Mock para Cloudinary

```ruby
test "report con imagen se guarda correctamente" do
  # Stub de CarrierWave para no llamar a Cloudinary
  ReportImageUploader.any_instance.stubs(:store!).returns(true)
  ReportImageUploader.any_instance.stubs(:url).returns("https://cloudinary.com/fake.jpg")

  report = create_dummy_report
  report.images.attach(... )
  assert report.valid?
end
```

---

## Tests de Regresion

Cuando se corrige un bug:

1. **Escribir un test que reproduzca el bug** (debe fallar primero).
2. **Corregir el bug**.
3. **Verificar que el test ahora pasa**.
4. Nombrar el test con referencia al issue: `test "issue-45 - coordinates nil no rompe el mapa"`.

---

> Para las convenciones de codigo en los tests, consultar [convenciones-codigo.md](convenciones-codigo.md). Para la configuracion del entorno de test, ver [setup-desarrollo-local.md](setup-desarrollo-local.md).
