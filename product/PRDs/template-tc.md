# UFO-TC-XXX.Y.Z.N: [Titulo tecnico descriptivo]

| Campo | Valor |
|-------|-------|
| **ID** | UFO-TC-XXX.Y.Z.N |
| **US padre** | [UFO-US-XXX.Y.Z](US-XXX.Y.Z.md) |
| **PRD padre** | [UFO-PRD-XXX](README.md) |
| **Estado** | Draft |
| **Asignado a** | _[Developer]_ |
| **Estimacion** | _[S (1-2d) / M (3-5d) / L (1-2sem)]_ |
| **Complejidad tecnica** | _[Baja / Media / Alta]_ |
| **Sprint** | _[Numero de sprint o "Sin asignar"]_ |
| **Proyecto** | ufohunters-site |
| **Stack** | Rails 8.0.2 / Ruby 3.2.8 / Mongoid 9.0 |

---

## Contexto de la US Padre

**User Story:** UFO-US-XXX.Y.Z

> Como _[rol]_,
> quiero _[accion]_,
> para _[beneficio]_.

**Esta TC implementa:** _[Describir que parte especifica de la US cubre esta TC. Ejemplo: "El controlador Rails y las vistas ERB para el formulario de reporte" o "El Stimulus controller para la previsualizacion del mapa".]_

---

## Descripcion

_[Descripcion tecnica clara de lo que se va a implementar en el contexto de ufohunters-site. Incluir el contexto tecnico necesario para que cualquier developer del equipo pueda tomar esta TC y trabajar en ella.]_

_[Responder:]_
- _[Que componente(s) de Rails / Mongoid / Stimulus se modifican?]_
- _[Que patron o enfoque tecnico se recomienda (MVC de Rails, Turbo Frames, Stimulus controller)?]_
- _[Hay decisiones tecnicas previas que deben respetarse?]_

---

## Notas de Implementacion

_[Guia tecnica para el developer. Especifica para Rails 8 / Mongoid 9 / Hotwire.]_

### Archivos a crear / modificar

| Archivo | Accion | Descripcion |
|---------|--------|-------------|
| `app/controllers/_[nombre]_controller.rb` | _[Crear / Modificar]_ | _[Que se hace]_ |
| `app/models/_[nombre]_.rb` | _[Crear / Modificar]_ | _[Nuevos fields o indices Mongoid]_ |
| `app/views/_[nombre]_/_[accion]_.html.erb` | _[Crear / Modificar]_ | _[Que se renderiza]_ |
| `app/javascript/controllers/_[nombre]_controller.js` | _[Crear / Modificar]_ | _[Logica Stimulus]_ |
| `test/_[unit|functional|integration]_/_[nombre]__test.rb` | Crear | _[Tests Minitest]_ |

### Cambios en modelos Mongoid

_[Si esta TC no involucra cambios en documentos Mongoid, indicar "No aplica — esta TC no modifica modelos Mongoid." y pasar a la siguiente seccion.]_

**Nota:** Mongoid no usa migraciones SQL. Los cambios de schema se aplican directamente en el modelo.

| Modelo | Cambio | Tipo de campo / Indice | Notas |
|--------|--------|----------------------|-------|
| `_[NombreModelo]_` | Agregar field | `field :_[nombre]_, type: _[String/Integer/Array/Boolean]_` | _[Descripcion]_ |
| `_[NombreModelo]_` | Agregar indice | `index({ _[campo]_: _[1|-1|'2dsphere']_ })` | _[Justificacion]_ |

### Patrones a seguir

- _[Patron 1: Ejemplo de referencia en el codebase — e.g., ver como lo hace reports_controller.rb]_
- _[Patron 2: Convencion del equipo — e.g., autenticacion custom via sessions_controller.rb]_
- _[Patron 3: Seguir el patron de Turbo Streams usado en...]_

### Decisiones tecnicas

| Decision | Opcion elegida | Alternativa descartada | Motivo |
|----------|---------------|------------------------|--------|
| _[Decision 1]_ | _[Opcion A]_ | _[Opcion B]_ | _[Por que A]_ |

---

## Especificacion de Rutas / Endpoints

_[Si esta TC no involucra cambios en rutas, escribir "No aplica — esta TC no modifica routes.rb." y pasar a la siguiente seccion.]_

### Ruta Rails

```ruby
# config/routes.rb
_[resources :nombre do
  member do
    get :accion
  end
end]_
```

**Autenticacion:** _[Publica / Requiere sesion activa (custom session auth)]_

**Controlador:** `_[nombre]_#_[accion]_`

**Parametros esperados:**

| Parametro | Tipo | Obligatorio | Descripcion |
|-----------|------|-------------|-------------|
| `_[param1]_` | _[String/Integer/Array]_ | _[Si/No]_ | _[Descripcion]_ |
| `_[param2]_` | _[String/Integer]_ | _[Si/No]_ | _[Descripcion]_ |

**Respuesta exitosa:**
- HTML: renderiza `_[vista]_` con flash message
- Turbo Stream: actualiza frame `_[id_frame]_`

**Respuestas de error:**

| Condicion | Comportamiento |
|-----------|---------------|
| Documento no encontrado (Mongoid::Errors::DocumentNotFound) | Redirige a errors#not_found |
| Validacion fallida | Re-renderiza el formulario con errores |
| Sin sesion activa | Redirige a sessions#new |

---

## Escenarios de Test (Minitest)

_[Especificar tests para Minitest con ActiveSupport::TestCase o ActionDispatch::IntegrationTest]_

### Tests unitarios (test/unit/)

| ID | Escenario | Setup | Input | Output esperado | Prioridad |
|----|-----------|-------|-------|-----------------|-----------|
| TU-1 | _[Happy path]_ | _[crear documento de prueba en MongoDB]_ | _[Input valido]_ | _[Resultado]_ | Alta |
| TU-2 | _[Validacion]_ | _[Setup]_ | _[Input invalido]_ | _[Error de Mongoid esperado]_ | Alta |
| TU-3 | _[Edge case]_ | _[Setup especial]_ | _[Input limite]_ | _[Comportamiento]_ | Media |

### Tests funcionales (test/functional/)

| ID | Escenario | Precondicion | Resultado esperado |
|----|-----------|-------------|-------------------|
| TF-1 | _[Accion del controlador]_ | _[Setup: user session, documento existente]_ | _[Status HTTP + render esperado]_ |
| TF-2 | _[Otro flujo]_ | _[Setup]_ | _[Resultado]_ |

### Tests de integracion (test/integration/)

| ID | Escenario | Flujo completo | Resultado esperado |
|----|-----------|---------------|-------------------|
| TI-1 | _[Flujo E2E]_ | _[Pasos del flujo completo]_ | _[Resultado final]_ |

---

## Criterios de Aceptacion Tecnicos

- [ ] _[Criterio tecnico verificable 1]_
- [ ] _[Criterio tecnico verificable 2]_
- [ ] _[Criterio tecnico verificable 3]_
- [ ] La respuesta del endpoint / accion llega en < _[N]_ ms para el P95 (medir con New Relic)
- [ ] Los tests Minitest cubren los escenarios de la tabla anterior
- [ ] No se introducen dependencias nuevas en Gemfile sin aprobacion del equipo
- [ ] El error handling cubre todos los casos documentados
- [ ] Los cambios en modelos Mongoid incluyen los indices necesarios
- [ ] No hay regresiones en los tests existentes (`rails test`)
- [ ] Las vistas ERB renderizan correctamente con Turbo (no hay conflictos con Turbo Drive)

---

## Estimacion Detallada

| Aspecto | Tiempo estimado |
|---------|----------------|
| Desarrollo (implementacion Rails/Mongoid) | _[N horas/dias]_ |
| Tests Minitest | _[N horas/dias]_ |
| Frontend (Stimulus / ERB / Tailwind) | _[N horas/dias]_ |
| Documentacion (actualizacion docs) | _[N horas]_ |
| Code review y ajustes | _[N horas]_ |
| **Total** | **_[N dias]_** |

---

## Dependencias de la TC

| Tipo | Referencia | Descripcion | Estado |
|------|-----------|-------------|--------|
| Requiere | _[TC/US/Servicio]_ | _[Que necesita de esta dependencia]_ | _[Resuelta/Pendiente]_ |
| Requerida por | _[TC/US]_ | _[Que TC/US necesita que esta TC se complete]_ | — |

---

## Notas Adicionales

_[Cualquier informacion adicional relevante: links a documentacion de Mongoid 9, Rails 8, Hotwire, decisiones de diseno, workarounds conocidos, etc.]_

---

## Historial

| Fecha | Cambio | Autor |
|-------|--------|-------|
| _[YYYY-MM-DD]_ | Creacion de la TC | _[Nombre]_ |

---

> **Instrucciones de uso:** Copia este template, reemplaza `XXX.Y.Z.N` con los identificadores correspondientes (PRD.Epic.US.TC), y rellena todas las secciones. Las secciones de rutas y Mongoid pueden marcarse como "No aplica" si la TC no las requiere. Elimina esta nota al finalizar.
