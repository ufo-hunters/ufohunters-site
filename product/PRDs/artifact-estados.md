# Estados y Transiciones de Artefactos — ufohunters-site

## Estados Disponibles

Todo artefacto del sistema de producto de **ufohunters-site** (`UFO`) se encuentra en uno de los siguientes estados:

| Estado | Codigo | Descripcion | Indicador |
|--------|--------|-------------|-----------|
| **Draft** | `DRAFT` | Artefacto creado, en fase de redaccion. Incompleto o pendiente de revision. No puede ser trabajado. | Gris |
| **Ready** | `READY` | Completamente definido, revisado y aprobado. Listo para ser asignado y trabajado. | Azul |
| **In Progress** | `IN_PROGRESS` | Activamente siendo trabajado por un miembro del equipo asignado. | Amarillo |
| **In Review** | `IN_REVIEW` | Trabajo completado, en fase de revision por pares, PO o TPM. | Naranja |
| **Done** | `DONE` | Completado, revisado y aceptado. Cumple todos los criterios de aceptacion y el DoD. | Verde |
| **Archived** | `ARCHIVED` | Ya no es relevante. Se mantiene por historico pero no esta activo ni se trabaja. | Gris oscuro |

---

## Diagrama de Flujo de Estados

```
                    ┌──────────┐
                    │          │
              ┌────>│  DRAFT   │<────────────────────────┐
              │     │          │                          │
              │     └─────┬────┘                          │
              │           │                               │
              │     Aprobado por PO/TPM                   │
              │     (cumple DoR)                          │
              │           │                          Rechazado
              │           v                          (necesita
              │     ┌──────────┐                     mas trabajo)
              │     │          │                          │
              │     │  READY   │──────────────────────────┘
              │     │          │
              │     └─────┬────┘
              │           │
              │     Asignado a developer
              │     (sprint planning)
              │           │
              │           v
              │     ┌──────────────┐
              │     │              │
              │     │ IN PROGRESS  │───────┐
              │     │              │       │
              │     └─────┬────────┘       │
              │           │                │
              │     Trabajo completado     │ Bloqueado o
              │     (PR creado)            │ necesita mas
              │           │                │ refinamiento
              │           v                │
              │     ┌──────────────┐       │
              │     │              │       │
              │     │  IN REVIEW   │───────┘
              │     │              │
              │     └──┬───────┬──┘
              │        │       │
              │  Aprobado   Rechazado
              │  (cumple    (vuelve a
              │   DoD)      In Progress)
              │        │
              │        v
              │  ┌──────────┐
              │  │          │
              │  │   DONE   │
              │  │          │
              │  └─────┬────┘
              │        │
              │  Ya no es relevante
              │  o pasa el tiempo
              │        │
              │        v
              │  ┌──────────────┐
              └──│              │
                 │  ARCHIVED    │
                 │              │
                 └──────────────┘
```

---

## Reglas de Transicion

### Draft -> Ready

| Requisito | Quien verifica | Obligatorio |
|-----------|---------------|-------------|
| Todas las secciones obligatorias del template estan completas | TPM | Si |
| Los criterios de aceptacion estan definidos (minimo 3 para US) | TPM | Si |
| El equipo ha revisado el artefacto en sesion de refinamiento | TPM | Si |
| La estimacion esta asignada | Dev / Equipo | Si |
| Las dependencias estan identificadas y tienen plan | TPM | Si |
| Los mockups/wireframes estan disponibles (si aplica) | PO / Diseno | Si (si hay UI) |
| **Quien aprueba:** Product Owner o Technical PM | | |

### Ready -> In Progress

| Requisito | Quien verifica | Obligatorio |
|-----------|---------------|-------------|
| El artefacto esta asignado a un developer especifico | TPM | Si |
| El sprint en curso tiene capacidad para el artefacto | TPM | Si |
| Las dependencias bloqueantes estan resueltas | Developer | Si |
| El developer confirma que entiende el alcance y el stack (Rails/Mongoid) | Developer | Si |
| **Quien cambia el estado:** Developer asignado o TPM | | |

### In Progress -> In Review

| Requisito | Quien verifica | Obligatorio |
|-----------|---------------|-------------|
| El codigo esta implementado y el PR esta creado en GitHub | Developer | Si |
| Los tests Minitest estan escritos y pasan (`rails test`) | Developer | Si |
| El codigo no introduce regresiones en tests existentes | Developer | Si |
| La documentacion tecnica esta actualizada (si aplica) | Developer | Si |
| El developer ha verificado los criterios de aceptacion localmente | Developer | Si |
| **Quien cambia el estado:** Developer que implemento | | |

### In Review -> Done

| Requisito | Quien verifica | Obligatorio |
|-----------|---------------|-------------|
| Code review aprobado (minimo 1 aprobacion) | Peer developer | Si |
| Todos los criterios de aceptacion pasan | QA / PO | Si |
| No hay bugs criticos o bloqueantes abiertos | QA | Si |
| La funcionalidad esta desplegada en staging (Heroku) | CI/CD | Si |
| El PO ha validado la funcionalidad en staging | PO | Si (para US/PRD) |
| El artefacto padre se actualiza (si aplica) | TPM | Si |
| **Quien cambia el estado:** Product Owner o TPM | | |

### In Review -> In Progress (rechazo)

| Requisito | Quien verifica | Obligatorio |
|-----------|---------------|-------------|
| Se documentan los motivos del rechazo en el PR | Reviewer | Si |
| Los cambios requeridos estan claros y accionables | Reviewer | Si |
| **Quien cambia el estado:** Reviewer que rechazo | | |

### Cualquier estado -> Archived

| Requisito | Quien verifica | Obligatorio |
|-----------|---------------|-------------|
| Se documenta el motivo de archivo | PO / TPM | Si |
| No hay trabajo en progreso que dependa de este artefacto | TPM | Si |
| El equipo esta informado | TPM | Si |
| **Quien cambia el estado:** Product Owner | | |

### Archived -> Draft (reactivacion)

| Requisito | Quien verifica | Obligatorio |
|-----------|---------------|-------------|
| Hay una justificacion para reactivar el artefacto | PO | Si |
| El contenido se revisa y actualiza (puede requerir ajustes al stack Rails/Mongoid) | TPM / PO | Si |
| Las condiciones que llevaron al archivo ya no aplican | PO | Si |
| **Quien cambia el estado:** Product Owner | | |

---

## Reglas por Tipo de Artefacto

### PRD

| Transicion | Regla adicional |
|------------|-----------------|
| Draft -> Ready | El PO debe aprobar explicitamente. No basta con que este completo. |
| Ready -> In Progress | Al menos 1 Epic debe estar en Ready antes de mover el PRD a In Progress. |
| In Progress -> Done | TODOS los Epics del PRD deben estar en Done. |
| Done -> Archived | Esperar al menos 1 sprint tras el Done para archivar. |

### US (User Story)

| Transicion | Regla adicional |
|------------|-----------------|
| Draft -> Ready | Debe cumplir el Definition of Ready completo (ver [artifact-us.md](artifact-us.md)). |
| In Progress -> In Review | Si tiene TCs, todas las TCs deben estar al menos en In Review. |
| In Review -> Done | Validacion del PO en staging (Heroku) obligatoria. |

### TC (Technical Card)

| Transicion | Regla adicional |
|------------|-----------------|
| Draft -> Ready | La US padre debe estar en Ready o In Progress. |
| In Progress -> In Review | El PR debe incluir tests Minitest que cubran los escenarios de la TC. |
| In Review -> Done | Code review + `rails test` pasan en CI. No requiere validacion del PO (solo tecnica). |

### PDT / TDT / ENH

| Transicion | Regla adicional |
|------------|-----------------|
| Draft -> Ready | Revision del TPM es suficiente (no necesita PO para Ready). |
| In Review -> Done | Para PDT: PO valida en staging. Para TDT: Dev Lead valida. Para ENH: PO valida. |

---

## Quien Puede Cambiar Estado

| Rol | Draft->Ready | Ready->InProgress | InProgress->InReview | InReview->Done | ->Archived |
|-----|-------------|-------------------|---------------------|----------------|------------|
| Product Owner | Si | Si | No | Si | Si |
| Technical PM | Si | Si | No | Si | Si |
| Developer | No | Si (auto-asignacion) | Si (propio trabajo) | No | No |
| QA | No | No | No | Si (validacion) | No |

---

## Transiciones Prohibidas

Las siguientes transiciones **nunca** estan permitidas:

| Transicion | Motivo |
|------------|--------|
| Draft -> In Progress | No se puede trabajar algo que no fue revisado y aprobado |
| Draft -> In Review | No se puede revisar algo que no fue implementado |
| Draft -> Done | No se puede completar algo que no paso por el proceso |
| Ready -> Done | No se puede saltar la implementacion |
| Ready -> In Review | No se puede revisar algo que no fue implementado |
| Done -> In Progress | Si hay un problema post-Done, se crea un nuevo artefacto (bug o nuevo PDT/TDT) |
| Done -> Ready | Mismo motivo anterior |

---

## Tiempos Maximos por Estado

| Estado | Tiempo maximo | Accion si se excede |
|--------|---------------|---------------------|
| Draft | 2 semanas | TPM revisa si el artefacto sigue siendo relevante |
| Ready | 3 sprints | Se reevalua la prioridad; si no entra en 3 sprints, considerar archivar |
| In Progress | 1 sprint | El developer reporta bloqueos; el TPM interviene |
| In Review | 3 dias laborales | Se escala al TPM si el review en GitHub no avanza |

---

## Metricas de Flujo

Estas metricas se calculan sobre las transiciones de estado y ayudan a identificar cuellos de botella:

| Metrica | Formula | Objetivo |
|---------|---------|----------|
| **Lead Time** | Tiempo de Draft a Done | < 4 semanas para US, < 1 sprint para ENH |
| **Cycle Time** | Tiempo de In Progress a Done | < 1 sprint para US, < 1 semana para ENH |
| **Review Time** | Tiempo en In Review | < 3 dias laborales |
| **Stale Rate** | % de artefactos en Ready > 3 sprints | < 10% |
| **Rejection Rate** | % de In Review rechazados a In Progress | < 20% |
| **Throughput** | Artefactos completados por sprint | Tendencia creciente |

---

## Referencias

- [Lifecycle del PRD](../procedures/prd-lifecycle.md) — Detalle del ciclo de vida especifico de PRDs
- [Flujo de refinamiento](../procedures/flujo-refinamiento.md) — Proceso para mover artefactos de Draft a Ready
- [Flujo de artefactos en backlog](../backlog/flujo-artefactos-backlog.md) — Ciclo de vida completo en el backlog
- [Artefactos y Glosario](../ARTEFACTOS-Y-GLOSARIO.md) — Definiciones de todos los tipos de artefactos
