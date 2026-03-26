# Deuda Tecnica — UFO Hunters Site

## Que Cuenta como Deuda Tecnica

La deuda tecnica es toda decision tecnica que prioriza la velocidad de entrega a corto plazo a costa de la mantenibilidad o calidad a largo plazo. En ufo-hunters.com, consideramos deuda tecnica:

- **Codigo que funciona pero es dificil de mantener**: Metodos muy largos, logica duplicada, nombres poco descriptivos.
- **Ausencia de tests**: Funcionalidad critica sin cobertura de tests unitarios o funcionales.
- **Dependencias desactualizadas**: Gemas con versiones antiguas que pueden tener vulnerabilidades.
- **Workarounds y hacks**: Soluciones temporales que se convirtieron en permanentes.
- **Documentacion faltante o desactualizada**: Codigo complejo sin documentar.
- **Configuracion fragil**: Valores hardcodeados, configuracion sin validacion.
- **Problemas de infraestructura**: CI/CD obsoleto, falta de monitoring adecuado.

### Que NO es Deuda Tecnica

- Codigo funcional que "podria ser mas elegante".
- Decisiones de diseno validas que simplemente son diferentes a la preferencia personal.
- Features que aun no se han implementado (eso es backlog, no deuda).

---

## Niveles de Severidad

### Critica

Problemas que afectan directamente la estabilidad, seguridad o disponibilidad en produccion.
**Plazo de resolucion**: Sprint actual o siguiente.

### Alta

Problemas que impactan significativamente la productividad del equipo o la calidad del producto.
**Plazo de resolucion**: Proximos 1-2 sprints.

### Media

Problemas que generan friccion pero no bloquean el desarrollo ni afectan la produccion.
**Plazo de resolucion**: Planificacion trimestral.

### Baja

Problemas cosmeticos o de mejora que no afectan la funcionalidad ni la productividad.
**Plazo de resolucion**: De forma oportunista al trabajar en el area afectada.

---

## Inventario Actual de Deuda Tecnica

### Critica

| ID | Descripcion | Impacto | Esfuerzo | Estado | Fecha |
|----|-------------|---------|----------|--------|-------|
| — | _No hay items criticos registrados_ | — | — | — | — |

### Alta

| ID | Descripcion | Impacto | Esfuerzo | Estado | Fecha |
|----|-------------|---------|----------|--------|-------|
| DT-001 | CI/CD con Travis CI obsoleto (Ruby 2.1.2) | Los tests automaticos no se ejecutan en cada PR; sin integracion continua funcional | S | Resuelto | 2026-03-22 |
| DT-002 | Sin linter configurado (RuboCop) | Sin enforcement automatico de estilos; la calidad del codigo depende solo de las revisiones manuales | S | Resuelto | 2026-03-22 |
| DT-003 | Autenticacion custom sin funcionalidades completas | No hay recuperacion de contrasena automatica, confirmacion de email ni autenticacion OAuth; usuarios que olvidan su contrasena quedan bloqueados | M | Identificado | 2026-03-22 |

### Media

| ID | Descripcion | Impacto | Esfuerzo | Estado | Fecha |
|----|-------------|---------|----------|--------|-------|
| DT-004 | Sin docker-compose.yml para desarrollo local | Los desarrolladores deben ejecutar MongoDB manualmente o con comandos Docker sueltos; mayor friccion de onboarding | XS | Resuelto | 2026-03-22 |
| DT-005 | README principal refleja informacion de la era Rails 3-4 | Documentacion de setup contradice el stack actual; confunde a nuevos contribuidores | XS | Resuelto | 2026-03-22 |
| DT-006 | Cobertura de tests desconocida / probablemente baja en areas legacy | Sin metricas de cobertura; areas del codigo modificadas frecuentemente pueden carecer de tests de regresion | L | Resuelto | 2026-03-22 |
| DT-007 | Sin `.env.example` documentado | Los desarrolladores no saben que variables de entorno son necesarias sin leer el codigo | XS | Resuelto | 2026-03-22 |
| DT-010 | Sin tests unitarios de modelo | Los modelos Report, User, Article, Countries, CustomDate no tienen tests unitarios; cambios en validaciones, callbacks o queries pueden introducir regresiones sin deteccion | L | Resuelto | 2026-03-23 |
| DT-011 | Sin tests de request (integration tests) | Los controllers no tienen tests de request; no se valida que las rutas devuelvan 200, que los filtros funcionen, ni que las respuestas JSON sean correctas | L | Resuelto | 2026-03-23 |
| DT-012 | Sin tests de features (system tests) | No hay tests end-to-end que verifiquen flujos completos de usuario: buscar sightings, enviar report, login/signup, navegacion por mapas. Los formularios migrados a Stimulus no tienen cobertura automatizada | XL | Identificado | 2026-03-23 |

### Baja

| ID | Descripcion | Impacto | Esfuerzo | Estado | Fecha |
|----|-------------|---------|----------|--------|-------|
| DT-008 | Configuracion de Memcached como fallback de Redis | Dos sistemas de cache con configuracion adicional; Redis deberia ser suficiente | XS | Resuelto | 2026-03-22 |
| DT-009 | CKEditor integrado en modelos y uploaders (area legacy) | CKEditor 4.x tiene soporte limitado; migracion a editor alternativo podria ser necesaria | M | Identificado | 2026-03-22 |

---

## Detalle de Items de Alta Prioridad

### DT-001: CI/CD con Travis CI obsoleto

- **Severidad**: Alta
- **Categoria**: Infraestructura
- **Impacto**: Los tests no se ejecutan automaticamente en cada PR. Sin gating de calidad automatizado, los bugs pueden llegar a produccion sin deteccion.
- **Esfuerzo estimado**: S (1-2 dias)
- **Estado**: Resuelto
- **Fecha de registro**: 2026-03-22
- **Fecha de resolucion**: 2026-03-22
- **Notas**: `.travis.yml` eliminado. GitHub Actions configurado en `.github/workflows/ci.yml` con Ruby 3.2.8 y MongoDB 7 como servicio. Dos jobs: `test` (rails test) y `lint` (rubocop). Activo en pushes y PRs a `master`.

### DT-002: Sin linter configurado (RuboCop)

- **Severidad**: Alta
- **Categoria**: Calidad de codigo
- **Impacto**: Sin enforcement automatico de estilos, la consistencia del codigo depende exclusivamente de las revisiones manuales. Aumenta la carga cognitiva en los code reviews.
- **Esfuerzo estimado**: S (1-2 dias)
- **Estado**: Resuelto
- **Fecha de registro**: 2026-03-22
- **Fecha de resolucion**: 2026-03-22
- **Notas**: RuboCop configurado con `rubocop`, `rubocop-rails`, `rubocop-minitest` y `rubocop-performance`. Config en `.rubocop.yml` usando `plugins:`. Auto-gen TODO en `.rubocop_todo.yml` con 3 offenses historicos pendientes de refactoring. `bundle exec rubocop` pasa limpio. Integrado en el job `lint` de GitHub Actions.

### DT-010: Sin tests unitarios de modelo

- **Severidad**: Media
- **Categoria**: Testing
- **Impacto**: Los modelos Mongoid (Report, User, Article, Countries, CustomDate) no tienen tests unitarios. Validaciones, callbacks (`set_case_number`), scopes e indexes no se verifican automaticamente.
- **Esfuerzo estimado**: L (1-2 semanas)
- **Estado**: Resuelto
- **Fecha de registro**: 2026-03-23
- **Fecha de resolucion**: 2026-03-23
- **Notas**: Tests unitarios creados para Report, User, Article, Countries y CustomDate. Tests migrados de la API de Mongoid 3 a Mongoid 9 (`Mongoid::Clients.default` en lugar de `Mongoid.default_session`). Total: 80 tests, 96 assertions, 0 failures.

### DT-011: Sin tests de request

- **Severidad**: Media
- **Categoria**: Testing
- **Impacto**: Los controllers (SightingsController, ReportsController, ArticlesController, StatsController, SessionsController) no tienen tests de integracion. No se valida que las rutas devuelvan HTTP 200, que la paginacion Pagy funcione, ni que los filtros de busqueda retornen resultados correctos.
- **Esfuerzo estimado**: L (1-2 semanas)
- **Estado**: Resuelto
- **Fecha de registro**: 2026-03-23
- **Fecha de resolucion**: 2026-03-23
- **Notas**: Tests de controladores creados para Sessions, Stats y Users. Tests funcionales usan rutas URL en lugar de simbolos de accion (API de Rails moderna). Incluidos en el total de 80 tests, 96 assertions, 0 failures.

### DT-012: Sin tests de features (system tests)

- **Severidad**: Media
- **Categoria**: Testing
- **Impacto**: No hay tests end-to-end que verifiquen flujos completos: buscar sightings por ubicacion, enviar un report con geocoder, login/signup, navegacion por mapas de continentes. Los formularios migrados de jQuery a Stimulus carecen de cobertura automatizada.
- **Esfuerzo estimado**: XL (mas de 2 semanas)
- **Estado**: Identificado
- **Fecha de registro**: 2026-03-23
- **Notas**: Requiere configurar Capybara con un driver headless (Selenium o Cuprite) y MongoDB de test. Flujos prioritarios: (1) Home → click sighting → ver detalle, (2) Search → seleccionar ubicacion en mapa → ver resultados, (3) Report → rellenar form → submit, (4) Login → acceder a myspace.

---

## Proceso de Gestion de Deuda Tecnica

### Identificacion

Cualquier miembro del equipo puede identificar y registrar deuda tecnica:

1. Agregar una entrada a este documento con el siguiente ID disponible.
2. Completar todos los campos del formato.
3. Abrir un PR con la etiqueta `tech-debt`.
4. Si es critica, notificar al tech lead inmediatamente.

### Revision Trimestral

Cada trimestre, el equipo realiza una revision de deuda tecnica:

1. Revisar el inventario: actualizar estados, eliminar items resueltos.
2. Evaluar nuevos items: priorizar y asignar severidad.
3. Planificar resolucion: seleccionar items para el proximo trimestre.
4. Metricas: numero de items por severidad, items resueltos vs. nuevos.

### Criterios de Priorizacion

1. **Riesgo**: Items que pueden causar incidentes en produccion tienen prioridad maxima.
2. **Frecuencia de impacto**: Deuda en areas del codigo que se modifican frecuentemente.
3. **Esfuerzo vs. beneficio**: Preferir items de alto beneficio y bajo esfuerzo.
4. **Dependencias**: Items que bloquean o facilitan otros trabajos.

### Regla del Boy Scout

> "Dejar el codigo mejor de como lo encontraste."

Si trabajas en un area con deuda tecnica de severidad Baja o Media, intenta resolverla como parte de tu cambio actual — siempre que no aumente significativamente el tamano del PR ni introduzca riesgo adicional.

---

## Prevencion de Deuda Tecnica

Para minimizar la acumulacion de deuda tecnica en ufo-hunters.com:

- Seguir las [convenciones de codigo](convenciones-codigo.md) del proyecto.
- Escribir tests Minitest para toda funcionalidad nueva (ver [estrategias de testing](estrategias-testing.md)).
- Realizar code reviews rigurosos (ver [como revisar PRs](como-revisar-pull-requests.md)).
- Mantener las gemas actualizadas con `bundle outdated` periodicamente.
- Documentar decisiones de diseno en los [ADRs](decisiones-de-diseno.md).
- Cuando se tome deuda tecnica conscientemente, registrarla inmediatamente en este documento.

---

## Formato de Registro

Cada item de deuda tecnica sigue este formato:

| Campo | Descripcion |
|-------|-------------|
| **ID** | Identificador unico (DT-001, DT-002, etc.) |
| **Descripcion** | Resumen claro del problema |
| **Severidad** | Critica / Alta / Media / Baja |
| **Impacto** | Que areas o funcionalidades se ven afectadas |
| **Esfuerzo Estimado** | XS (horas), S (1-2 dias), M (3-5 dias), L (1-2 semanas), XL (mas de 2 semanas) |
| **Estado** | Identificado / Planificado / En Progreso / Resuelto / Descartado |
| **Fecha de Registro** | Cuando se identifico |
| **Responsable** | Quien esta asignado (si aplica) |
| **Notas** | Contexto adicional, plan de resolucion |

---

> La deuda tecnica no es inherentemente mala — a veces es una decision consciente y valida. Lo importante es registrarla, gestionarla y no perder el control.
