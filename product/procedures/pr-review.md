# Review de Documentacion de Producto — ufohunters-site

## Objetivo

Este procedimiento define el proceso de revision (review) para toda la documentacion de producto de **ufohunters-site**. Cada cambio en la documentacion de producto se realiza via Pull Request en GitHub y debe pasar por un proceso de revision antes de ser mergeado.

---

## Cuando Aplica Este Proceso

| Tipo de cambio | Requiere review? | Reviewers minimos |
|----------------|-------------------|-------------------|
| Nuevo PRD | Si | PO + TPM + Dev Lead |
| Nueva US | Si | PO o TPM |
| Nueva TC | Si | 1 Peer Developer |
| Nuevo PDT/TDT/ENH | Si | TPM |
| Actualizacion de estado | Si (lightweight) | TPM |
| Correccion de typos | Si (lightweight) | 1 reviewer cualquiera |
| Actualizacion de templates | Si | PO + TPM |
| Actualizacion de procedures | Si | PO + TPM |

**Lightweight review:** El reviewer verifica que el cambio es correcto y consistente, pero no requiere sesion ni discusion. Se puede aprobar de forma asincrona en GitHub.

---

## Checklist de QA para Documentacion de Producto

### 1. Formato y Estructura

- [ ] **Template correcto:** El documento usa el template correspondiente a su tipo (PRD, US, TC, PDT/TDT/ENH)
- [ ] **Secciones completas:** Todas las secciones obligatorias del template estan presentes
- [ ] **Metadatos correctos:** ID, estado, owner, fechas y demas campos estan rellenos
- [ ] **Markdown valido:** El documento se renderiza correctamente en GitHub (tablas, listas, bloques de codigo)
- [ ] **Encabezados consistentes:** La jerarquia de encabezados (h1, h2, h3) es correcta
- [ ] **Sin secciones vacias:** No hay secciones con solo "_[placeholder]_" sin rellenar

### 2. Identificadores y Nombrado

- [ ] **ID unico:** El identificador `UFO-[TIPO]-XXX` es unico y secuencial
- [ ] **Prefijo correcto:** Usa el prefijo `UFO` del proyecto
- [ ] **Formato de ID correcto:** Sigue la convencion XXX.Y.Z.N segun el tipo
- [ ] **Nombre de archivo correcto:** Sigue la convencion establecida en [CONTRIBUTING.md](../CONTRIBUTING.md)
- [ ] **Nombre de branch correcto:** `product/UFO-[TIPO]-XXX-titulo-corto`
- [ ] **Titulo de PR correcto:** `[TIPO] UFO-XXX: Titulo descriptivo`

### 3. Contenido y Calidad

- [ ] **Problema claro:** El problema esta definido de forma verificable (no ambiguo)
- [ ] **Sin lenguaje vago:** No usa terminos como "mejorar el mapa", "optimizar queries" sin definir que significa
- [ ] **Metricas cuantificables:** Las metricas de exito tienen numeros concretos y plazos
- [ ] **Alcance explicito:** In Scope y Out of Scope estan claramente definidos
- [ ] **Criterios de aceptacion:** Escritos en formato Given/When/Then (para US)
- [ ] **Minimo 3 criterios:** Al menos 3 criterios de aceptacion (para US)
- [ ] **Happy path + error:** Al menos 1 criterio de exito y 1 de error (para US)
- [ ] **Estimacion presente:** Tiene estimacion asignada (S/M/L)
- [ ] **Dependencias identificadas:** Las dependencias estan listadas con su estado
- [ ] **Consistencia interna:** No hay contradicciones entre secciones del mismo documento
- [ ] **Consistencia con PRD padre:** La US/TC es coherente con su PRD padre

### 4. Relevancia para el Stack de ufohunters-site

- [ ] **Mongoid correcto:** Si la TC menciona cambios de schema, usa la sintaxis de Mongoid (field declarations, index calls) — NO SQL ni ActiveRecord migrations
- [ ] **Auth custom:** Si la US/TC implica autenticacion, referencia el patron custom de sessions_controller.rb — NO Devise
- [ ] **Test framework correcto:** Los escenarios de test usan Minitest (ActiveSupport::TestCase) — NO RSpec
- [ ] **Asset pipeline correcto:** Si hay cambios de assets, referencia Propshaft/Import Maps — NO Webpack/Sprockets
- [ ] **Roles validos:** Las US usan roles del contexto de ufo-hunters.com (visitante, usuario registrado, reportero)

### 5. Links y Referencias

- [ ] **Links internos funcionan:** Todos los links a otros documentos son correctos y apuntan a archivos existentes en el repositorio
- [ ] **Links relativos:** Se usan links relativos, no absolutos
- [ ] **Referencias cruzadas:** Los artefactos padre e hijo se referencian mutuamente
- [ ] **Indice actualizado:** El [indice de PRDs](../PRDs/README.md) o el [dashboard del backlog](../backlog/INDEX.md) estan actualizados con el nuevo artefacto
- [ ] **Links a templates:** Los links a templates y procedures son correctos

### 6. Coherencia con el Sistema

- [ ] **Estado valido:** El estado es uno de los permitidos (Draft, Ready, In Progress, In Review, Done, Archived)
- [ ] **Transicion valida:** El cambio de estado sigue las reglas definidas en [artifact-estados.md](../PRDs/artifact-estados.md)
- [ ] **Responsable correcto:** Quien cambia el estado tiene permiso para hacerlo
- [ ] **Historial actualizado:** La tabla de historial del documento refleja el cambio

---

## Proceso de Review Paso a Paso

### Para el Autor

1. **Antes de abrir el PR en GitHub:**
   - Ejecuta el checklist de formato y estructura
   - Verifica que todos los links funcionan
   - Revisa que el indice correspondiente esta actualizado
   - Lee el documento completo como si fuera la primera vez

2. **Al abrir el PR:**
   - Titulo: `[TIPO] UFO-XXX: Titulo descriptivo`
   - Descripcion: Incluir resumen del cambio y link al artefacto
   - Asignar los reviewers segun la tabla de "Cuando aplica"
   - Agregar labels si el sistema lo soporta: `product-docs`, `prd`, `us`, etc.

3. **Durante el review:**
   - Responder a todos los comentarios en el PR
   - Incorporar el feedback aceptado
   - Marcar como resueltos los hilos atendidos
   - Si hay desacuerdo, escalar al PO para decision

### Para el Reviewer

1. **Al recibir la solicitud de review en GitHub:**
   - Leer el documento completo antes de comentar
   - Usar el checklist de QA como guia
   - Verificar especificamente que el stack referenciado es correcto (Mongoid, Minitest, etc.)

2. **Tipos de comentarios:**

   | Prefijo | Significado | Ejemplo |
   |---------|-------------|---------|
   | `[BLOQUEANTE]` | Debe corregirse antes de aprobar | `[BLOQUEANTE] Referencia a ActiveRecord migration — usar Mongoid field declaration` |
   | `[IMPORTANTE]` | Deberia corregirse pero no bloquea | `[IMPORTANTE] Falta criterio de error para Mongoid::Errors::DocumentNotFound` |
   | `[SUGERENCIA]` | Mejora opcional | `[SUGERENCIA] Agregar nota sobre compatibilidad con Turbo Drive` |
   | `[PREGUNTA]` | Necesita clarificacion | `[PREGUNTA] Que pasa si las coordenadas son nulas en MongoDB?` |
   | `[NIT]` | Detalle menor (typo, formato) | `[NIT] Falta un punto al final de la oracion` |

3. **Al finalizar el review:**
   - Si no hay bloqueantes: **Aprobar**
   - Si hay bloqueantes: **Solicitar cambios** con explicacion clara
   - Si hay dudas fundamentales: **Comentar** y solicitar discusion

---

## Tiempos de Review

| Tipo de artefacto | Tiempo maximo de review | Escalacion si excede |
|-------------------|------------------------|----------------------|
| PRD | 3 dias laborales | TPM contacta a reviewers directamente |
| US | 1 dia laboral | TPM reasigna reviewer |
| TC | 1 dia laboral | Dev Lead reasigna |
| PDT/TDT/ENH | 1 dia laboral | TPM reasigna |
| Actualizacion menor | 4 horas laborales | Merge sin review si es typo/formato |

---

## Criterios de Aprobacion por Tipo

### PRD

| Criterio | Obligatorio |
|----------|-------------|
| Problema verificable con evidencias | Si |
| Solucion responde al problema | Si |
| Alcance con In/Out of Scope | Si |
| Minimo 2 metricas cuantificables | Si |
| Epics identificados | Si |
| Riesgos con mitigaciones | Si |
| Dev Lead confirma viabilidad en Rails 8 / Mongoid 9 | Si |
| PO aprueba | Si |

### US

| Criterio | Obligatorio |
|----------|-------------|
| Formato "Como/quiero/para" correcto | Si |
| Rol valido en el contexto de ufo-hunters.com | Si |
| Minimo 3 criterios G/W/T | Si |
| Al menos 1 happy path + 1 error | Si |
| Estimacion asignada | Si |
| Coherente con PRD/Epic padre | Si |
| Sin referencias a implementacion tecnica en la US en si | Si |

### TC

| Criterio | Obligatorio |
|----------|-------------|
| Descripcion tecnica clara | Si |
| Cambios en Mongoid documentados correctamente (field/index syntax) | Si (si aplica) |
| Rutas Rails y controladores documentados | Si (si aplica) |
| Escenarios de test Minitest definidos | Si |
| Estimacion asignada | Si |
| Peer developer entiende la TC | Si |
| No referencia SQL migrations (Mongoid no las usa) | Si |

---

## Errores Comunes en Reviews de ufohunters-site

| Error | Consecuencia | Como evitarlo |
|-------|-------------|---------------|
| Aprobar TC con "migration" SQL | El developer genera un archivo de migracion innecesario en Mongoid | Verificar que los cambios de schema usan sintaxis Mongoid (field/index) |
| Aprobar US con "devise" o "warden" | El developer usa gemas de autenticacion que no estan en el proyecto | Verificar que la US referencia el patron custom de sessions_controller |
| Aprobar TC con tests RSpec | El developer escribe tests con RSpec en lugar de Minitest | Verificar que los escenarios usan ActiveSupport::TestCase |
| No verificar links | Links rotos en la documentacion | Clicar cada link antes de aprobar |
| Solo revisar formato, no contenido | Documentos bonitos pero vacios | Siempre evaluar calidad del contenido |
| Reviews tardios (> 3 dias) | Bloquean el flujo del equipo | Priorizar reviews de docs como cualquier code review en GitHub |

---

## Referencias

- [CONTRIBUTING.md](../CONTRIBUTING.md) — Convenciones de nombrado y flujo de contribucion
- [Estados y transiciones](../PRDs/artifact-estados.md) — Reglas de cambio de estado
- [Indice de PRDs](../PRDs/README.md) — Indice maestro de PRDs
- [Dashboard del backlog](../backlog/INDEX.md) — Dashboard del backlog
