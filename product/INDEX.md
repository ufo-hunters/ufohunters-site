# Indice de Navegacion — ufohunters-site

> Navegacion rapida a todas las secciones de la documentacion de producto.

---

## Acceso Rapido

| Seccion | Descripcion | Link |
|---------|-------------|------|
| README | Vision general del sistema de PRDs | [README.md](README.md) |
| Roadmap | Planificacion trimestral y vision | [ROADMAP.md](ROADMAP.md) |
| Artefactos y Glosario | Definiciones y terminologia | [ARTEFACTOS-Y-GLOSARIO.md](ARTEFACTOS-Y-GLOSARIO.md) |
| Guia de Contribucion | Como colaborar | [CONTRIBUTING.md](CONTRIBUTING.md) |

---

## PRDs Activos

> Listado de PRDs actualmente en curso para **ufohunters-site**.

| ID | Titulo | Estado | Owner | Ultima actualizacion |
|----|--------|--------|-------|---------------------|
| `UFO-PRD-001` | _[Pendiente de crear]_ | Draft | — | — |

### Por estado

- **Draft:** PRDs en fase de redaccion inicial
- **Ready:** PRDs aprobados, pendientes de descomposicion en Epics
- **In Progress:** PRDs con Epics/US en desarrollo activo
- **In Review:** PRDs con todas las US completadas, en fase de validacion
- **Done:** PRDs completamente implementados y validados

> Para ver la definicion completa de cada estado, consulta [PRDs/artifact-estados.md](PRDs/artifact-estados.md).

---

## Resumen del Backlog

| Categoria | Cantidad | Link |
|-----------|----------|------|
| Items en progreso | _Por actualizar_ | [backlog/INDEX.md](backlog/INDEX.md) |
| Items listos | _Por actualizar_ | [backlog/INDEX.md](backlog/INDEX.md) |
| Items bloqueados | _Por actualizar_ | [backlog/INDEX.md](backlog/INDEX.md) |
| Deuda de producto (PDT) | _Por actualizar_ | [backlog/INDEX.md](backlog/INDEX.md) |
| Deuda tecnica (TDT) | _Por actualizar_ | [backlog/INDEX.md](backlog/INDEX.md) |
| Enhancements (ENH) | _Por actualizar_ | [backlog/INDEX.md](backlog/INDEX.md) |

> Para el dashboard completo con scoring RICE, consulta [backlog/INDEX.md](backlog/INDEX.md).

---

## Templates

Usa estos templates para crear nuevos artefactos:

| Template | Uso | Link |
|----------|-----|------|
| Template PRD | Crear un nuevo PRD | [PRDs/template-prd.md](PRDs/template-prd.md) |
| Template US | Crear una nueva User Story | [PRDs/template-us.md](PRDs/template-us.md) |
| Template TC | Crear una nueva Technical Card | [PRDs/template-tc.md](PRDs/template-tc.md) |
| Template Backlog Item | Crear PDT, TDT o ENH | [backlog/templates/template-backlog-item.md](backlog/templates/template-backlog-item.md) |

---

## Procedures

Flujos de trabajo y procesos establecidos:

| Procedimiento | Descripcion | Link |
|---------------|-------------|------|
| Flujo de Refinamiento | De la idea al TC | [procedures/flujo-refinamiento.md](procedures/flujo-refinamiento.md) |
| Lifecycle del PRD | Transiciones de estado de un PRD | [procedures/prd-lifecycle.md](procedures/prd-lifecycle.md) |
| Review de Documentacion | Checklist de calidad para PRs | [procedures/pr-review.md](procedures/pr-review.md) |
| Changelog | Guia de mantenimiento del changelog | [procedures/changelog.md](procedures/changelog.md) |

---

## Estructura de Directorios

```
product/
├── README.md                    # Vision general
├── INDEX.md                     # Este archivo
├── ROADMAP.md                   # Planificacion trimestral
├── ARTEFACTOS-Y-GLOSARIO.md    # Definiciones
├── CONTRIBUTING.md              # Guia de contribucion
├── PRDs/
│   ├── README.md                # Indice de PRDs
│   ├── artifact-prd.md          # Definicion: PRD
│   ├── artifact-us.md           # Definicion: User Story
│   ├── artifact-tc.md           # Definicion: Technical Card
│   ├── artifact-pdt.md          # Definicion: Product Debt Task
│   ├── artifact-tdt.md          # Definicion: Technical Debt Task
│   ├── artifact-enh.md          # Definicion: Enhancement
│   ├── artifact-estados.md      # Estados y transiciones
│   ├── template-prd.md          # Template: PRD
│   ├── template-us.md           # Template: User Story
│   └── template-tc.md           # Template: Technical Card
├── backlog/
│   ├── INDEX.md                 # Dashboard priorizado
│   ├── flujo-artefactos-backlog.md  # Ciclo de vida
│   └── templates/
│       └── template-backlog-item.md # Template: PDT/TDT/ENH
├── procedures/
│   ├── flujo-refinamiento.md    # Flujo de refinamiento
│   ├── prd-lifecycle.md         # Ciclo de vida del PRD
│   ├── pr-review.md             # Review de documentacion
│   └── changelog.md             # Guia de changelog
└── products/
    └── ufohunters-site/
        └── README.md            # Ficha del producto
```

---

## Informacion del Proyecto

| Campo | Valor |
|-------|-------|
| Proyecto | ufohunters-site |
| Prefijo | UFO |
| Framework | Rails 8.0.2 |
| Lenguaje | Ruby 3.2.8 |
