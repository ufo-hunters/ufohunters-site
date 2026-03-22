# Artefacto: TC (Technical Card)

## Que es una Technical Card

Una Technical Card (TC) es el artefacto que traduce una User Story en especificaciones tecnicas implementables. Mientras la US describe **que** quiere el usuario, la TC describe **como** se implementa tecnicamente en **Rails 8.0.2 / Ruby 3.2.8 / Mongoid 9.0**.

**Prefijo:** `UFO-TC-XXX.Y.Z.N`
- `XXX.Y.Z` = Identificador de la US padre
- `N` = Numero secuencial de la TC dentro de la US

---

## Cuando Crear una Technical Card

| Situacion | Crear TC? |
|-----------|-----------|
| La US requiere cambios en rutas o controladores Rails | Si |
| La US requiere nuevos fields o indices en documentos Mongoid | Si |
| La US tiene logica de negocio compleja en modelos o servicios | Si |
| La US require un nuevo Stimulus controller | Si |
| La US es puramente de cambio de vista ERB sin logica | Opcional |
| La US es trivial (cambio de copy, color de Tailwind) | No |
| La US requiere integracion con servicio externo (Cloudinary, Google Maps) | Si |
| La US tiene multiples componentes independientes (backend + frontend) | Si, una TC por componente |

**Regla general:** Si un developer necesita mas de 30 minutos para entender como implementar la US en el contexto de Rails / Mongoid / Hotwire, necesita una TC.

---

## Particularidades de ufohunters-site

### Sin migraciones SQL

Mongoid no usa migraciones. Los cambios de schema se aplican directamente en los modelos con declaraciones `field`, `validates` e `index`. Las TCs deben documentar estos cambios en la seccion "Cambios en Modelos Mongoid" en lugar de archivos de migracion.

```ruby
# Ejemplo: agregar field a Report
class Report
  include Mongoid::Document
  field :shape, type: String  # ya existe
  field :verified, type: Boolean, default: false  # nuevo field en esta TC
  index({ verified: 1 })  # nuevo indice
end
```

### Autenticacion custom

No hay Devise. La autenticacion es custom via `SessionsController`. Las TCs que requieran autenticacion deben referenciar el patron existente en `sessions_controller.rb`.

### Hotwire (Turbo + Stimulus)

- Para actualizaciones parciales de pagina, usar Turbo Frames o Turbo Streams
- Para comportamiento JavaScript, usar Stimulus controllers en `app/javascript/controllers/`
- No hay Webpack — se usa Import Maps, por lo que los nuevos controladores Stimulus se registran en `config/importmap.rb`

### Testing con Minitest

No hay RSpec ni FactoryBot. Los tests usan:
- `ActiveSupport::TestCase` para tests unitarios (`test/unit/`)
- `ActionController::TestCase` para tests funcionales de controladores (`test/functional/`)
- `ActionDispatch::IntegrationTest` para tests de integracion (`test/integration/`)
- Helpers de factories definidos en el propio proyecto (e.g., `create_dummy_report`)

---

## Estructura de una Technical Card

### 1. Encabezado

```markdown
# UFO-TC-XXX.Y.Z.N: [Titulo tecnico descriptivo]

| Campo | Valor |
|-------|-------|
| ID | UFO-TC-XXX.Y.Z.N |
| US padre | UFO-US-XXX.Y.Z |
| Estado | [Draft / Ready / In Progress / In Review / Done] |
| Asignado a | [Developer] |
| Estimacion | [S / M / L] |
| Complejidad tecnica | [Baja / Media / Alta] |
| Stack | Rails 8.0.2 / Ruby 3.2.8 / Mongoid 9.0 |
```

### 2. Descripcion

Descripcion tecnica clara de lo que se va a implementar. Incluye el contexto tecnico necesario para que cualquier developer del equipo pueda tomar esta TC y trabajar en ella.

**Debe responder:**
- Que controlador(es) / modelo(s) de ufohunters-site se modifican?
- Que patron o enfoque tecnico se recomienda (MVC Rails, Turbo Streams, Stimulus)?
- Hay decisiones tecnicas que ya se tomaron y deben respetarse?

### 3. Cambios en Modelos Mongoid (si aplica)

```markdown
## Cambios en Modelos Mongoid

### Modificacion: Report

| Cambio | Codigo |
|--------|--------|
| Nuevo field | `field :verified, type: Boolean, default: false` |
| Nuevo indice | `index({ verified: 1, created_at: -1 })` |
| Nueva validacion | `validates :shape, inclusion: { in: VALID_SHAPES }` |
```

### 4. Especificacion de Rutas / Controlador

Si la TC involucra cambios en rutas o controladores Rails:

```markdown
## Rutas y Controlador

### Ruta nueva: GET /sightings/verified

**Controlador:** sightings#verified
**Autenticacion:** Publica

**Parametros aceptados:**
| Param | Tipo | Default | Descripcion |
|-------|------|---------|-------------|
| page | Integer | 1 | Pagina para paginacion |
| country | String | nil | Filtrar por codigo de pais |

**Respuesta:**
- Renderiza: `sightings/verified.html.erb`
- Variables de instancia: `@sightings` (coleccion Mongoid paginada)
```

### 5. Escenarios de Test (Minitest)

```markdown
## Test Scenarios

### Tests unitarios (test/unit/)

| ID | Escenario | Input | Output esperado | Prioridad |
|----|-----------|-------|-----------------|-----------|
| TU-1 | Field verified por defecto es false | Nuevo Report.new | `report.verified == false` | Alta |
| TU-2 | Validacion de shape invalido | shape: "triangulo" | Error de validacion | Alta |

### Tests funcionales (test/functional/)

| ID | Escenario | Precondicion | Resultado esperado |
|----|-----------|-------------|-------------------|
| TF-1 | GET /sightings/verified | Reports existentes en MongoDB | 200 OK + lista de reportes |
| TF-2 | GET /sightings/verified con filtro de pais | Reports de ES en MongoDB | Solo reportes de ES |

### Tests de integracion (test/integration/)

| ID | Escenario | Flujo | Resultado |
|----|-----------|-------|-----------|
| TI-1 | Flujo completo de reporte verificado | Crear report -> verificar -> ver en listado | Report aparece en la seccion verificados |
```

### 6. Criterios de Aceptacion Tecnicos

```markdown
## Acceptance Criteria (Tecnicos)

- [ ] La query MongoDB no supera 3 queries por request (verificar con New Relic)
- [ ] Los tests Minitest cubren todos los escenarios de la tabla anterior
- [ ] Los cambios en el modelo Mongoid incluyen el indice correcto
- [ ] No hay regresiones en los tests existentes (`rails test`)
- [ ] Las vistas ERB son compatibles con Turbo Drive (no hay conflictos de JS)
```

### 7. Estimacion

| Aspecto | Estimacion |
|---------|------------|
| Desarrollo (Rails/Mongoid) | [N horas/dias] |
| Frontend (ERB/Stimulus/Tailwind) | [N horas/dias] |
| Tests Minitest | [N horas/dias] |
| Code review | [N horas] |
| **Total** | **[N dias]** |

---

## Link a US Padre

Toda TC debe referenciar explicitamente su US padre:

```markdown
## Contexto de la US padre

**US:** UFO-US-XXX.Y.Z
**Historia:** Como [rol], quiero [accion], para [beneficio]

Esta TC implementa el aspecto tecnico de [especificar que parte de la US cubre].
```

Si una US genera multiples TCs, cada TC debe indicar que porcion de la US cubre:

| TC | Cubre |
|----|-------|
| UFO-TC-002.1.1.1 | Backend: controlador Rails + modelo Mongoid |
| UFO-TC-002.1.1.2 | Frontend: Stimulus controller para previsualizacion del mapa |

---

## Ejemplo Completo

```markdown
# UFO-TC-002.1.1.1: Agregar field de coordenadas verificadas al modelo Report

| Campo | Valor |
|-------|-------|
| ID | UFO-TC-002.1.1.1 |
| US padre | UFO-US-002.1.1 (Previsualizacion de coordenadas en formulario de reporte) |
| Estado | Ready |
| Asignado a | [Developer] |
| Estimacion | S (2 dias) |
| Complejidad tecnica | Baja |

## Descripcion

Modificar el modelo Report (Mongoid) para agregar soporte a coordenadas
validadas y actualizar el formulario de reporte para capturar y previsualizar
la ubicacion antes del envio.

## Cambios en Modelos Mongoid

### Modificacion: Report (app/models/report.rb)

| Cambio | Codigo |
|--------|--------|
| Nuevo field | `field :location_verified, type: Boolean, default: false` |
| Nueva validacion | `validates :coordinates, presence: true, if: :location_verified?` |

## Acceptance Criteria (Tecnicos)

- [ ] El field `location_verified` es false por defecto en nuevos Reports
- [ ] El campo se persiste correctamente en MongoDB
- [ ] Los tests unitarios cubren los nuevos campos y validaciones
- [ ] No hay regresiones en `rails test`

## Estimacion

| Aspecto | Tiempo |
|---------|--------|
| Modificacion del modelo Mongoid | 0.5 dias |
| Tests Minitest | 0.5 dias |
| Code review | 2 horas |
| **Total** | **1 dia** |
```

---

## Referencias

- [Template de TC](template-tc.md) — Usa este template para crear nuevas Technical Cards
- [Artefacto US](artifact-us.md) — Definicion de User Story (artefacto padre)
- [Estados y transiciones](artifact-estados.md) — Ciclo de vida de una TC
