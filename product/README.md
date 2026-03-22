# Sistema de PRDs — ufohunters-site

## Descripcion General

Este repositorio contiene la documentacion de producto del proyecto **ufohunters-site**, construido con **Rails 8.0.2** en **Ruby 3.2.8**. Aqui se centraliza toda la gestion de requisitos, desde la vision estrategica hasta las tareas tecnicas individuales.

**ufo-hunters.com** es una plataforma publica que recopila, muestra y permite la interaccion comunitaria en torno a avistamientos de OVNIs de todo el mundo. Los usuarios pueden registrarse, publicar artículos, reportar avistamientos con datos geoespaciales, subir imagenes, explorar mapas interactivos, filtrar por pais y consultar estadisticas y galerías de video.

El sistema de PRDs (Product Requirements Documents) es el pilar fundamental para la planificacion, desarrollo y seguimiento de todas las funcionalidades del producto. Cada cambio significativo en ufohunters-site debe nacer como un PRD antes de convertirse en codigo.

---

## Jerarquia de Artefactos

El sistema sigue una jerarquia estricta de descomposicion. Cada nivel agrega detalle y reduce ambiguedad:

```
PRD (Product Requirements Document)
 └── Epic (Agrupacion funcional)
      └── US (User Story)
           └── TC (Technical Card)
```

### Niveles de detalle

| Nivel | Prefijo | Descripcion | Responsable |
|-------|---------|-------------|-------------|
| PRD | `UFO-PRD-XXX` | Documento de requisitos completo. Define el problema, la solucion propuesta, el alcance y las metricas de exito. | Product Owner |
| Epic | `UFO-EPIC-XXX.Y` | Agrupacion logica de User Stories dentro de un PRD. Representa una funcionalidad cohesiva. | Product Owner / Technical PM |
| US | `UFO-US-XXX.Y.Z` | Historia de usuario individual. Describe valor desde la perspectiva del usuario final. | Technical PM / Developer |
| TC | `UFO-TC-XXX.Y.Z.N` | Tarjeta tecnica. Detalla implementacion, cambios en el modelo Mongoid y escenarios de test con Minitest. | Developer |

### Artefactos complementarios

| Tipo | Prefijo | Descripcion |
|------|---------|-------------|
| PDT | `UFO-PDT-XXX` | Product Debt Task — Deuda de producto (UX, copy, flujos incompletos) |
| TDT | `UFO-TDT-XXX` | Technical Debt Task — Deuda tecnica (performance, seguridad, actualizaciones de dependencias Rails/Mongoid) |
| ENH | `UFO-ENH-XXX` | Enhancement — Mejora pequena no ligada a un PRD |

---

## Como Navegar la Documentacion

### Punto de entrada rapido

- **[INDEX.md](INDEX.md)** — Navegacion rapida a todas las secciones
- **[ROADMAP.md](ROADMAP.md)** — Vision y planificacion trimestral
- **[ARTEFACTOS-Y-GLOSARIO.md](ARTEFACTOS-Y-GLOSARIO.md)** — Definiciones y terminologia

### Documentacion de producto

- **[PRDs/](PRDs/)** — Todos los PRDs del proyecto, templates y definiciones de artefactos
- **[backlog/](backlog/)** — Dashboard priorizado y ciclo de vida de artefactos
- **[products/](products/)** — Ficha del producto ufohunters-site

### Procesos y guias

- **[procedures/](procedures/)** — Flujos de refinamiento, lifecycle de PRDs, review de PRs
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — Como contribuir a la documentacion de producto

---

## Roles y Responsabilidades

### Product Owner (PO)

- Define la vision y los objetivos del producto
- Crea y prioriza PRDs
- Aprueba el alcance de cada Epic
- Es el decisor final sobre que se construye y que no
- Mantiene el roadmap actualizado

### Technical PM (TPM)

- Descompone PRDs en Epics y User Stories
- Facilita las sesiones de refinamiento
- Asegura que cada US cumple el Definition of Ready
- Coordina dependencias entre funcionalidades
- Revisa la completitud tecnica de las TC

### Developer (Dev)

- Crea Technical Cards a partir de User Stories
- Estima esfuerzo en las TC
- Implementa las soluciones siguiendo las especificaciones Rails 8 / Mongoid 9
- Mantiene la documentacion tecnica actualizada
- Reporta deuda tecnica (TDT) cuando la detecta

---

## Links Utiles

| Recurso | Ubicacion |
|---------|-----------|
| Procedures de refinamiento | [procedures/flujo-refinamiento.md](procedures/flujo-refinamiento.md) |
| Ciclo de vida de un PRD | [procedures/prd-lifecycle.md](procedures/prd-lifecycle.md) |
| Review de documentacion | [procedures/pr-review.md](procedures/pr-review.md) |
| Guia de changelog | [procedures/changelog.md](procedures/changelog.md) |
| Template de PRD | [PRDs/template-prd.md](PRDs/template-prd.md) |
| Template de US | [PRDs/template-us.md](PRDs/template-us.md) |
| Template de TC | [PRDs/template-tc.md](PRDs/template-tc.md) |
| Template de backlog item | [backlog/templates/template-backlog-item.md](backlog/templates/template-backlog-item.md) |
| Estados y transiciones | [PRDs/artifact-estados.md](PRDs/artifact-estados.md) |

---

## Stack Tecnologico

| Aspecto | Valor |
|---------|-------|
| Proyecto | ufohunters-site |
| Prefijo de artefactos | UFO |
| Framework | Rails 8.0.2 |
| Lenguaje | Ruby 3.2.8 |
| Base de datos | MongoDB (Mongoid 9.0) |
| Frontend | Hotwire (Turbo + Stimulus) + Tailwind CSS |
| Deploy | Docker + Heroku |

---

> **Nota:** Esta documentacion es un documento vivo. Todos los miembros del equipo son responsables de mantenerla actualizada. Consulta [CONTRIBUTING.md](CONTRIBUTING.md) para saber como proponer cambios.
