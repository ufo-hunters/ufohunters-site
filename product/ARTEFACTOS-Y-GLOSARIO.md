# Artefactos y Glosario — ufohunters-site

## Tipos de Artefactos

El sistema de gestion de producto de **ufohunters-site** utiliza los siguientes artefactos. Cada uno tiene un proposito especifico y un formato definido.

---

### PRD — Product Requirements Document

**Prefijo:** `UFO-PRD-XXX`

**Que es:** Documento de alto nivel que define un problema de negocio o usuario, propone una solucion y establece el alcance de lo que se va a construir. Es el punto de partida para cualquier funcionalidad significativa.

**Cuando crear uno:**
- Nueva funcionalidad que requiere mas de 2 sprints de trabajo
- Cambio significativo en el comportamiento existente del producto
- Iniciativa que involucra multiples modelos Mongoid o controladores Rails

**Estructura canonica:**
1. Contexto y antecedentes
2. Problema a resolver
3. Usuarios afectados
4. Solucion propuesta
5. Alcance (in scope / out of scope)
6. Metricas de exito
7. Epics
8. Riesgos y dependencias

**Ejemplo de identificador:** `UFO-PRD-001` — Migracion de CI/CD a GitHub Actions

> Template completo: [PRDs/template-prd.md](PRDs/template-prd.md)

---

### Epic — Agrupacion Funcional

**Prefijo:** `UFO-EPIC-XXX.Y` (donde XXX es el PRD padre, Y es el numero de epic)

**Que es:** Agrupacion logica de User Stories que representan una funcionalidad cohesiva dentro de un PRD. Un Epic es demasiado grande para completarse en un solo sprint.

**Cuando crear uno:**
- Al descomponer un PRD aprobado
- Cuando hay un grupo natural de funcionalidades relacionadas en ufohunters-site

**Ejemplo:** `UFO-EPIC-002.1` — Validacion del formulario de reporte (dentro de PRD-002 Formulario mejorado)

---

### US — User Story

**Prefijo:** `UFO-US-XXX.Y.Z` (donde XXX.Y es el Epic padre, Z es el numero de US)

**Que es:** Descripcion de una funcionalidad desde la perspectiva del usuario. Sigue el formato estandar "Como [rol], quiero [accion], para [beneficio]".

**Cuando crear una:**
- Al descomponer un Epic en piezas implementables
- Cada US debe poder completarse en un sprint o menos

**Formato obligatorio:**
```
Como [tipo de usuario],
quiero [realizar una accion],
para [obtener un beneficio].
```

**Criterios de aceptacion (Given/When/Then):**
```
DADO QUE [contexto inicial]
CUANDO [accion del usuario]
ENTONCES [resultado esperado]
```

**Ejemplo:** `UFO-US-002.1.1` — Como visitante, quiero ver mi ubicacion en el mapa antes de enviar el reporte, para confirmar que las coordenadas son correctas.

> Template completo: [PRDs/template-us.md](PRDs/template-us.md)

---

### TC — Technical Card

**Prefijo:** `UFO-TC-XXX.Y.Z.N` (donde XXX.Y.Z es la US padre, N es el numero de TC)

**Que es:** Tarjeta tecnica que detalla como implementar una User Story en Rails 8 / Ruby 3.2.8 / Mongoid 9. Incluye especificaciones de rutas Rails, cambios en documentos Mongoid, escenarios de test con Minitest y criterios de aceptacion tecnicos.

**Cuando crear una:**
- Al refinar una US para el sprint actual
- Cuando la US requiere cambios en modelos Mongoid (nuevos fields, indices 2dsphere)
- Cuando la US afecta controladores, vistas ERB o componentes Stimulus

**Estructura:**
1. Descripcion tecnica
2. Cambios en modelos Mongoid (fields, validaciones, indices)
3. Rutas y controladores afectados
4. Componentes Stimulus / partials Turbo
5. Escenarios de test (Minitest / ActionDispatch::IntegrationTest)
6. Criterios de aceptacion tecnicos
7. Estimacion

**Nota sobre migraciones:** Mongoid no usa migraciones SQL. Los cambios de schema se realizan directamente en los modelos con declaraciones `field` e `index`. Las TCs deben documentar estos cambios en lugar de archivos de migracion.

**Ejemplo:** `UFO-TC-002.1.1.1` — Implementar previsualizacion de coordenadas en el formulario de reporte con Stimulus

> Template completo: [PRDs/template-tc.md](PRDs/template-tc.md)

---

### PDT — Product Debt Task

**Prefijo:** `UFO-PDT-XXX`

**Que es:** Tarea para abordar deuda de producto. Cubre problemas de UX, copy incorrecto o incompleto, flujos de usuario que quedaron a medias, inconsistencias visuales, y cualquier aspecto del producto que funciona pero no cumple el estandar de calidad deseado.

**Cuando crear una:**
- Cuando se detecta un flujo de usuario incompleto o confuso en el proceso de reporte
- Cuando hay inconsistencias visuales entre secciones del sitio
- Cuando el copy necesita revision (mensajes de error genericos, traducciones)
- Cuando se pospuso trabajo de calidad para cumplir un deadline

**Ejemplo:** `UFO-PDT-001` — Unificar mensajes de error en los formularios de registro y reporte de avistamiento

> Template: [backlog/templates/template-backlog-item.md](backlog/templates/template-backlog-item.md)

---

### TDT — Technical Debt Task

**Prefijo:** `UFO-TDT-XXX`

**Que es:** Tarea para abordar deuda tecnica. Cubre problemas de performance, seguridad, code smells, actualizacion de dependencias, refactoring necesario, falta de tests, y cualquier mejora tecnica que no aporta funcionalidad visible pero mejora la calidad del codigo o la infraestructura.

**Cuando crear una:**
- Cuando se detecta un problema de rendimiento (queries MongoDB lentas, N+1 en mapas)
- Cuando hay vulnerabilidades conocidas en dependencias (CVEs en bundler-audit)
- Cuando el codigo necesita refactoring (logica de negocio en controladores Rails)
- Cuando las dependencias de Rails o Mongoid necesitan actualizacion
- Cuando la cobertura de tests con Minitest es insuficiente en un area critica
- Cuando el CI de Travis CI stale necesita ser reemplazado por GitHub Actions

**Ejemplo:** `UFO-TDT-001` — Migrar CI/CD de Travis CI (Ruby 2.1.2) a GitHub Actions (Ruby 3.2.8)

> Template: [backlog/templates/template-backlog-item.md](backlog/templates/template-backlog-item.md)

---

### ENH — Enhancement

**Prefijo:** `UFO-ENH-XXX`

**Que es:** Mejora pequena y autocontenida que no justifica la creacion de un PRD completo. Mejoras puntuales en funcionalidades existentes, optimizaciones menores, o adiciones de valor rapido.

**Cuando crear uno:**
- Mejora que se puede completar en 1-3 dias
- No cambia la arquitectura ni introduce nuevos conceptos al producto
- No requiere descomposicion en Epics o multiples US

**Ejemplo:** `UFO-ENH-001` — Agregar paginacion al listado de avistamientos en la pagina principal (/sightings)

> Template: [backlog/templates/template-backlog-item.md](backlog/templates/template-backlog-item.md)

---

## Estados de los Artefactos

Todos los artefactos siguen el mismo ciclo de vida con los siguientes estados:

| Estado | Descripcion | Color sugerido |
|--------|-------------|----------------|
| **Draft** | Artefacto creado pero aun en redaccion. No esta listo para ser trabajado. | Gris |
| **Ready** | Completamente definido y aprobado. Listo para ser asignado y trabajado. | Azul |
| **In Progress** | Activamente siendo trabajado por un miembro del equipo. | Amarillo |
| **In Review** | Trabajo completado, en fase de revision por pares o por el PO. | Naranja |
| **Done** | Completado, revisado y aceptado. Cumple todos los criterios de aceptacion. | Verde |
| **Archived** | Ya no es relevante. Se mantiene por historico pero no esta activo. | Gris oscuro |

> Para reglas de transicion detalladas, consulta [PRDs/artifact-estados.md](PRDs/artifact-estados.md).

---

## Glosario de Terminos de Producto

| Termino | Definicion |
|---------|-----------|
| **Acceptance Criteria** | Condiciones que deben cumplirse para que una US o TC se considere completada. Se expresan en formato Given/When/Then. |
| **Avistamiento / Sighting** | Reporte de un evento OVNI enviado por un usuario. Almacenado como documento `Report` en la coleccion `ufo` de MongoDB. |
| **Backlog** | Lista priorizada de todo el trabajo pendiente. Incluye US, PDT, TDT y ENH. |
| **Baseline** | Valor inicial de una metrica antes de implementar un cambio. Sirve como punto de comparacion. |
| **Buffer** | Tiempo extra reservado en la planificacion para absorber imprevistos. Tipicamente 15-20% del sprint. |
| **CarrierWave** | Gema Ruby usada para gestionar subida de imagenes a Cloudinary desde los reportes. |
| **Cloudinary** | Servicio de almacenamiento y transformacion de imagenes usado para las fotos de avistamientos. |
| **Criterio de Aceptacion** | Ver Acceptance Criteria. |
| **Definition of Done (DoD)** | Checklist que debe cumplir cualquier artefacto: tests Minitest pasan, code review aprobado, documentacion actualizada, deployed en Heroku staging. |
| **Definition of Ready (DoR)** | Condiciones que debe cumplir un artefacto antes de poder comenzar: US tiene criterios de aceptacion, TC tiene spec tecnica, estimacion asignada. |
| **Deuda de Producto** | Trabajo de calidad de producto pospuesto: UX incompleta, copy provisional, flujos parciales en el proceso de reporte. |
| **Deuda Tecnica** | Atajos tecnicos que generan coste futuro: sin linter, CI stale, queries MongoDB sin optimizar, falta de tests. |
| **Epic** | Agrupacion de User Stories que representan una funcionalidad cohesiva. |
| **Estimacion** | Calculo del esfuerzo necesario. Tallas: S (1-2 dias), M (3-5 dias), L (1-2 semanas), XL (mas de 2 semanas — debe descomponerse). |
| **Field (Mongoid)** | Declaracion de un atributo en un documento Mongoid. Equivalente a una columna SQL pero sin migraciones. |
| **GeoJSON** | Formato estandar para representar datos geoespaciales. Usado en el endpoint `/map_json` para alimentar los mapas. |
| **Given/When/Then** | Formato estandar para escribir criterios de aceptacion. |
| **Heroku** | Plataforma de hosting usada para desplegar ufohunters-site en produccion. |
| **Hotwire** | Suite de Turbo + Stimulus para enriquecer la experiencia sin APIs JSON separadas. |
| **Import Maps** | Mecanismo de Rails 8 para gestionar dependencias JavaScript sin Webpack/esbuild. |
| **In Scope** | Lo que esta incluido en el alcance de un PRD o US. |
| **Minitest** | Framework de testing incluido con Rails. Usado en ufohunters-site en lugar de RSpec. |
| **Mongoid** | ODM (Object Document Mapper) de Ruby para MongoDB. Version 9.0 en ufohunters-site. |
| **MongoDB** | Base de datos documental usada como datastore principal. Coleccion `ufo` para reportes, con indices 2dsphere para geospatial. |
| **New Relic** | Herramienta de APM (Application Performance Monitoring) integrada en produccion. |
| **Out of Scope** | Lo que explicitamente no se aborda en un PRD o US. |
| **PRD** | Product Requirements Document. Documento maestro que define un problema y su solucion. |
| **Product Owner** | Responsable de definir que se construye y en que orden. Dueno del roadmap y el backlog. |
| **Propshaft** | Pipeline de assets moderno (reemplaza Sprockets) usado en ufohunters-site. |
| **reCAPTCHA** | Proteccion contra bots en formularios de reporte y registro. |
| **Refinamiento** | Sesion en la que el equipo descompone y detalla artefactos hasta que cumplen el DoR. |
| **Report** | Modelo Mongoid principal. Representa un avistamiento OVNI. Almacenado en la coleccion `ufo`. |
| **RICE** | Framework de priorizacion: Reach (alcance), Impact (impacto), Confidence (confianza), Effort (esfuerzo). Score = (R * I * C) / E. |
| **Scope Creep** | Expansion no controlada del alcance de un PRD o US durante su desarrollo. |
| **Spike** | Investigacion tecnica con tiempo limitado para reducir incertidumbre antes de estimar. |
| **Sprint** | Periodo fijo de trabajo (tipicamente 2 semanas) en el que el equipo se compromete a completar un conjunto de artefactos. |
| **Stimulus** | Framework JavaScript minimalista (parte de Hotwire) para controladores de comportamiento en el frontend. |
| **Tailwind CSS** | Framework de CSS utilitario usado en ufohunters-site via tailwindcss-rails. |
| **Technical Card** | Tarjeta que detalla la implementacion tecnica de una User Story en Rails/Mongoid. |
| **Technical PM** | Responsable de la gestion tecnica: refinamiento, coordinacion, seguimiento. |
| **Turbo** | Framework para reemplazar navegaciones de pagina completa con actualizaciones parciales (parte de Hotwire). |
| **User Story** | Descripcion de funcionalidad desde la perspectiva del usuario. |

---

> **Mantenimiento:** Este glosario se actualiza cada vez que se introduce un nuevo termino en la documentacion de producto de ufohunters-site. Si encuentras un termino que no esta aqui, agregalo y abre un PR.
