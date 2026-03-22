# Guia de Changelog — ufohunters-site

## Objetivo

El CHANGELOG es el registro historico de todos los cambios significativos en la documentacion de producto de **ufohunters-site**. Permite a cualquier miembro del equipo entender que ha cambiado, cuando, y por que.

---

## Cuando Actualizar el CHANGELOG

### Siempre actualizar cuando:

| Evento | Ejemplo | Obligatorio |
|--------|---------|-------------|
| Se crea un nuevo PRD | UFO-PRD-003 creado | Si |
| Un PRD cambia de estado significativamente | PRD-001 pasa de Draft a Approved | Si |
| Un PRD se completa (Done) | PRD-002 completado | Si |
| Se agregan o eliminan Epics de un PRD | Epic 001.3 agregado a PRD-001 | Si |
| Se crean items de backlog significativos | TDT-001 de CI/CD creado | Si |
| Se cambian procedures o templates | Template de TC actualizado (Mongoid syntax) | Si |
| Se actualiza el roadmap | Objetivos Q2 2026 actualizados | Si |

### No es necesario actualizar cuando:

| Evento | Motivo |
|--------|--------|
| Se mueve una US de Ready a In Progress | Es un cambio operativo, no de producto |
| Se corrige un typo en un documento | Cambio menor sin impacto |
| Se actualiza la estimacion de una US | Cambio operativo |
| Se reasigna un artefacto a otro developer | Cambio operativo |

---

## Formato del CHANGELOG

### Estructura del archivo

El CHANGELOG se ubica en la raiz de la carpeta de producto: `product/CHANGELOG.md`

```markdown
# Changelog — ufohunters-site

Todos los cambios significativos en la documentacion de producto se registran aqui.

El formato esta basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/)
y este proyecto sigue [Semantic Versioning](https://semver.org/lang/es/).

## [Sin publicar]

### Agregado
- _[Cambios nuevos que aun no se han versionado]_

---

## [1.0.0] — YYYY-MM-DD

### Agregado
- Creacion inicial del sistema de documentacion de producto de ufohunters-site
- README.md, INDEX.md, ROADMAP.md, ARTEFACTOS-Y-GLOSARIO.md, CONTRIBUTING.md
- PRDs/: Templates y definiciones de artefactos (PRD, US, TC, PDT, TDT, ENH) adaptados al stack Rails/Mongoid
- PRDs/: Template de estados y transiciones
- Backlog/: Dashboard, flujo de artefactos, template de backlog item
- Procedures/: Refinamiento, lifecycle PRD, PR review, changelog
- UFO-TDT-001: Migrar CI/CD de Travis CI (stale) a GitHub Actions — pre-cargado en backlog

---
```

### Categorias de cambio

Cada entrada del CHANGELOG se clasifica en una de estas categorias:

| Categoria | Cuando usarla | Ejemplo |
|-----------|---------------|---------|
| **Agregado** (Added) | Nuevas funcionalidades, artefactos o documentos | `` `UFO-PRD-003`: Sistema de notificaciones de avistamientos creado`` |
| **Cambiado** (Changed) | Cambios en funcionalidades o documentos existentes | `` `UFO-PRD-001`: Alcance actualizado — se agrego Epic 001.3`` |
| **Corregido** (Fixed) | Correcciones de errores en la documentacion | `` `UFO-US-001.1.1`: Criterio de aceptacion 3 corregido`` |
| **Eliminado** (Removed) | Artefactos eliminados o archivados | `` `UFO-PRD-002`: Archivado — reemplazado por PRD-005`` |
| **Obsoleto** (Deprecated) | Artefactos o procesos que seran eliminados | `Template v1 de TC marcado como obsoleto — usar v2 con sintaxis Mongoid` |
| **Seguridad** (Security) | Cambios relacionados con seguridad | `` `UFO-TDT-010`: Vulnerabilidad en dependencia X resuelta`` |

### Formato de cada entrada

```markdown
## [VERSION] — YYYY-MM-DD

### Agregado
- `UFO-PRD-XXX`: [Titulo del PRD] — [Breve descripcion del cambio]
- `UFO-ENH-XXX`: [Titulo] — [Descripcion]

### Cambiado
- `UFO-PRD-XXX`: [Que cambio y por que]
- Roadmap: Objetivos Q2 2026 actualizados

### Corregido
- `UFO-US-XXX.Y.Z`: [Que se corrigio]

### Eliminado
- `UFO-PRD-XXX`: Archivado — [Motivo]
```

### Reglas de formato

1. **Fecha en formato ISO 8601:** `YYYY-MM-DD`
2. **Orden cronologico inverso:** Lo mas reciente arriba
3. **Cada entrada en una linea:** Una bala por cambio
4. **Incluir ID del artefacto:** Siempre prefixar con el ID UFO- cuando aplique
5. **Descripcion breve y accionable:** Que cambio, no como se hizo
6. **Seccion "Sin publicar":** Siempre existe al tope para cambios pendientes de versionado

---

## Alineacion con Versionado Semantico

La documentacion de producto sigue versionado semantico adaptado:

### MAJOR (X.0.0)

Cambios que representan un hito significativo en el producto:

- Lanzamiento de una funcionalidad mayor (PRD completado y desplegado en Heroku)
- Cambio en la estructura general de la documentacion
- Migracion de templates o procesos

**Ejemplo:** `2.0.0` — Se completa el PRD-002 de mejora del formulario de reporte y se reestructura la documentacion de UX.

### MINOR (0.X.0)

Cambios que agregan contenido significativo sin romper lo existente:

- Nuevo PRD creado (pero no completado)
- Nuevos Epics o conjuntos de US agregados
- Nuevos procedures o templates
- Actualizaciones importantes al roadmap

**Ejemplo:** `1.3.0` — Se crea UFO-PRD-003 para sistema de notificaciones de avistamientos.

### PATCH (0.0.X)

Cambios menores que corrigen o mejoran lo existente:

- Correcciones en documentos existentes
- Actualizaciones de estado de artefactos
- Mejoras de claridad o completitud
- Correcciones de links rotos

**Ejemplo:** `1.3.1` — Se corrigen criterios de aceptacion de US-002.1.1 y se actualizan links rotos.

### Criterios para incrementar version

| Evento | Incremento |
|--------|------------|
| PRD completado (Done) | MAJOR |
| Reestructuracion de documentacion | MAJOR |
| Nuevo PRD creado | MINOR |
| Nuevo conjunto de US (> 3) | MINOR |
| Nuevo procedure o template | MINOR |
| Actualizacion de roadmap | MINOR |
| Correccion de documentos | PATCH |
| Actualizacion de estados | PATCH |
| Fix de links o typos significativos | PATCH |

---

## Ejemplo Completo de CHANGELOG

```markdown
# Changelog — ufohunters-site

Todos los cambios significativos en la documentacion de producto se registran aqui.

## [Sin publicar]

### Agregado
- `UFO-PRD-002`: Mejora del formulario de reporte de avistamientos — PRD en Draft

---

## [1.1.0] — 2026-04-01

### Agregado
- `UFO-PRD-001`: Migracion CI/CD a GitHub Actions — PRD aprobado
- `UFO-US-001.1.1` a `UFO-US-001.2.2`: User Stories del PRD-001 refinadas
- `UFO-TDT-002`: Configurar RuboCop/StandardRB en el proyecto

### Cambiado
- Roadmap: Objetivos Q1 2026 actualizados con progreso real

---

## [1.0.1] — 2026-03-30

### Corregido
- `UFO-US-001.1.1`: Criterio de aceptacion 3 reescrito para claridad
- Links rotos en PRDs/README.md

---

## [1.0.0] — 2026-03-22

### Agregado
- Creacion inicial del sistema de documentacion de producto de ufohunters-site
- README.md, INDEX.md, ROADMAP.md, ARTEFACTOS-Y-GLOSARIO.md, CONTRIBUTING.md
- PRDs/: Templates y definiciones de artefactos (PRD, US, TC, PDT, TDT, ENH)
  adaptados al stack Rails 8 / Mongoid 9 / Hotwire
- PRDs/: Definicion de estados y transiciones
- Backlog/: Dashboard con UFO-TDT-001 pre-cargado, flujo de artefactos, template de backlog item
- Procedures/: Refinamiento, lifecycle PRD, PR review, changelog
- ROADMAP.md: Planificacion Q1-Q4 2026 con iniciativas priorizadas
```

---

## Responsabilidades

| Rol | Responsabilidad |
|-----|-----------------|
| **Autor del cambio** | Agregar la entrada al CHANGELOG en el mismo PR que introduce el cambio |
| **Reviewer** | Verificar que el CHANGELOG esta actualizado como parte del review en GitHub |
| **TPM** | Revisar y versionar el CHANGELOG al final de cada sprint |
| **PO** | Aprobar incrementos MAJOR |

---

## Automatizacion Sugerida

| Automatizacion | Descripcion | Herramienta |
|----------------|-------------|-------------|
| Validacion de CHANGELOG | GitHub Actions verifica que todo PR que toca `product/` incluye actualizacion de CHANGELOG | GitHub Actions |
| Generacion de release notes | Script que extrae la ultima seccion del CHANGELOG para release notes de Heroku | Script personalizado en bash |
| Alerta de version pendiente | Notificacion si la seccion "Sin publicar" tiene mas de 10 entradas | Cron job + notificacion |

---

## Referencias

- [Keep a Changelog](https://keepachangelog.com/es/1.1.0/) — Estandar de referencia
- [Semantic Versioning](https://semver.org/lang/es/) — Versionado semantico
- [PR Review](pr-review.md) — Proceso de review que incluye validacion de CHANGELOG
- [CONTRIBUTING.md](../CONTRIBUTING.md) — Guia general de contribucion
