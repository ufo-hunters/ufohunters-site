# Flujo de Artefactos en el Backlog — ufohunters-site

## Vision General

Este documento describe el ciclo de vida completo de un artefacto en el backlog de **ufohunters-site**, desde que surge como idea hasta que se marca como completado. Aplica a todos los tipos de artefactos: US, PDT, TDT y ENH.

---

## Flujo Completo: De Idea a Done

```
 ┌─────────────────────────────────────────────────────────────────┐
 │                                                                 │
 │  1. IDEA                                                        │
 │  └─> Alguien identifica una necesidad en ufo-hunters.com       │
 │      (PO, TPM, Dev, QA, Usuario de la comunidad, Stakeholder)  │
 │                                                                 │
 │  2. CLASIFICACION                                               │
 │  └─> Se determina el tipo de artefacto                         │
 │      ┌──────────────────────────────────────────┐              │
 │      │ Feature grande?     -> PRD -> Epic -> US │              │
 │      │ Feature pequena?    -> ENH               │              │
 │      │ Deuda de producto?  -> PDT               │              │
 │      │ Deuda tecnica?      -> TDT               │              │
 │      │ Bug en el sitio?    -> Issue en GitHub   │              │
 │      └──────────────────────────────────────────┘              │
 │                                                                 │
 │  3. DOCUMENTACION (Estado: Draft)                               │
 │  └─> Se crea el artefacto usando el template correspondiente  │
 │      Se asigna ID secuencial: UFO-[TIPO]-XXX                   │
 │                                                                 │
 │  4. REFINAMIENTO (Estado: Draft -> Ready)                       │
 │  └─> El equipo revisa, completa y estima el artefacto         │
 │      Se valida que cumple el Definition of Ready               │
 │      El PO/TPM aprueba y mueve a Ready                        │
 │                                                                 │
 │  5. PRIORIZACION (Estado: Ready)                                │
 │  └─> Se calcula el RICE Score                                  │
 │      Se posiciona en el backlog segun prioridad                │
 │      Se asigna a un sprint futuro (tentativo)                  │
 │                                                                 │
 │  6. SPRINT PLANNING (Estado: Ready -> In Progress)              │
 │  └─> El equipo selecciona items del backlog                    │
 │      Se asigna a un developer especifico                       │
 │      Se mueve a In Progress                                    │
 │                                                                 │
 │  7. IMPLEMENTACION (Estado: In Progress)                        │
 │  └─> El developer implementa en Rails / Mongoid / Hotwire     │
 │      Crea PR en GitHub con tests Minitest y documentacion      │
 │                                                                 │
 │  8. REVIEW (Estado: In Review)                                  │
 │  └─> Code review por pares en GitHub                          │
 │      Validacion del PO en staging Heroku (para US/PDT/ENH)     │
 │      Validacion tecnica del Dev Lead (para TDT)                │
 │                                                                 │
 │  9. COMPLETADO (Estado: Done)                                   │
 │  └─> Se actualiza el dashboard del backlog                     │
 │      Se actualizan metricas y estadisticas                     │
 │      Se comunica al equipo                                     │
 │                                                                 │
 │ 10. ARCHIVO (Estado: Archived) — Opcional                       │
 │  └─> Items completados hace mas de 2 trimestres               │
 │      Items descartados o reemplazados                          │
 │                                                                 │
 └─────────────────────────────────────────────────────────────────┘
```

---

## Transiciones de Estado en el Backlog

### Transiciones permitidas

| De | A | Condicion | Quien ejecuta |
|----|---|-----------|---------------|
| _Nuevo_ | Draft | Se crea el artefacto con template | Cualquiera |
| Draft | Ready | Cumple DoR + aprobacion PO/TPM | PO o TPM |
| Draft | Archived | Se descarta la idea | PO |
| Ready | In Progress | Se asigna en sprint planning | Developer o TPM |
| Ready | Archived | Ya no es relevante (> 3 sprints sin asignar) | PO |
| In Progress | In Review | PR creado en GitHub, tests Minitest pasan | Developer |
| In Progress | Ready | Bloqueado, se devuelve al backlog | Developer + TPM |
| In Review | Done | Review aprobado + validacion PO/tecnica en Heroku | PO o TPM |
| In Review | In Progress | Rechazado, necesita mas trabajo | Reviewer |
| Done | Archived | Pasa el tiempo, ya no es relevante mantenerlo activo | TPM |
| Archived | Draft | Se reactiva con justificacion | PO |

### Transiciones prohibidas

| De | A | Motivo |
|----|---|--------|
| Draft | In Progress | No se puede trabajar algo no aprobado |
| Draft | Done | No se puede completar sin implementar |
| Ready | Done | No se puede saltar la implementacion |
| Ready | In Review | No se puede revisar sin implementar |
| Done | In Progress | Si hay un problema, se crea un nuevo artefacto en GitHub |

---

## Quien Hace Que

### Por fase del flujo

| Fase | Product Owner | Technical PM | Developer | QA |
|------|--------------|-------------|-----------|-----|
| Idea | Propone features de negocio o comunidad | Propone mejoras de proceso | Propone mejoras tecnicas (TDT) | Propone mejoras de calidad |
| Clasificacion | Decide el tipo | Asesora sobre clasificacion | Asesora viabilidad tecnica Rails/Mongoid | — |
| Documentacion | Escribe PRDs | Escribe/revisa US | Escribe TCs y TDTs | — |
| Refinamiento | Clarifica requisitos del sitio | Facilita la sesion | Estima y cuestiona la viabilidad tecnica | Identifica gaps de testing Minitest |
| Priorizacion | Decide prioridad final | Calcula RICE, propone orden | Input sobre esfuerzo tecnico | Input sobre riesgo |
| Sprint Planning | Aprueba scope del sprint | Coordina asignaciones | Se compromete con items | Identifica necesidades de QA |
| Implementacion | Disponible para dudas de producto | Remueve bloqueos | Implementa en Rails/Mongoid/Hotwire | — |
| Review | Valida en staging (Heroku) | Verifica completitud | Code review en GitHub | Ejecuta tests Minitest |
| Completado | Acepta formalmente | Actualiza dashboard | Cierra PR | Confirma calidad |

### Matriz RACI por artefacto

| Actividad | US | PDT | TDT | ENH |
|-----------|-----|-----|-----|-----|
| Crear | R:TPM, A:PO | R:Cualquiera, A:TPM | R:Dev, A:TPM | R:Cualquiera, A:PO |
| Refinar | R:TPM+Dev, A:PO | R:TPM, A:PO | R:Dev, A:Dev Lead | R:TPM, A:PO |
| Priorizar | R:TPM, A:PO | R:TPM, A:PO | R:Dev Lead, A:TPM | R:TPM, A:PO |
| Implementar | R:Dev, A:Dev | R:Dev, A:Dev | R:Dev, A:Dev | R:Dev, A:Dev |
| Revisar | R:Dev+PO, A:PO | R:Dev+PO, A:PO | R:Dev, A:Dev Lead | R:Dev+PO, A:PO |
| Aceptar | R:PO, A:PO | R:PO, A:PO | R:Dev Lead, A:TPM | R:PO, A:PO |

> **R** = Responsable (ejecuta), **A** = Accountable (aprueba)

---

## Automatizacion

### Automatizaciones recomendadas para ufohunters-site

| Trigger | Accion automatica | Herramienta sugerida |
|---------|-------------------|----------------------|
| PR creado en GitHub con ID de artefacto | Mover artefacto a In Review | GitHub Actions |
| PR mergeado a main | Mover artefacto a Done si todos los criterios pasan | GitHub Actions |
| Item en Ready > 3 sprints | Notificar al PO para re-evaluar | Cron job + notificacion |
| Item en In Progress > 1 sprint | Notificar al TPM | Daily check automatico |
| Item en In Review > 3 dias | Notificar al reviewer asignado | Cron job + notificacion |
| Nuevo TDT con tipo "Seguridad" | Asignar prioridad Critica automaticamente | Hook en creacion |

### Convenciones para vincular artefactos a PRs en GitHub

Para que la automatizacion funcione, los PRs deben incluir el ID del artefacto:

**Titulo del PR:**
```
[UFO-US-001.1.1] Implementar paginacion en listado de avistamientos
```

**Descripcion del PR:**
```
## Artefacto
Resuelve: UFO-US-001.1.1

## Cambios
- Agregar paginacion en SightingsController#index
- Agregar vista de navegacion en sightings/index.html.erb
- Agregar tests en test/functional/sightings_controller_test.rb

## Como testear
1. `rails test test/functional/sightings_controller_test.rb`
2. Verificar en staging: heroku open --app ufohunters-staging
```

**Commits:**
```
feat(sightings): implementar paginacion en listado [UFO-TC-001.1.1.1]
test(sightings): agregar tests de paginacion [UFO-TC-001.1.1.1]
```

---

## Ceremonias del Backlog

### Refinamiento (1x por sprint, 1-2 horas)

**Objetivo:** Mover items de Draft a Ready.

**Agenda:**
1. Revisar items nuevos en Draft (15 min)
2. Refinar 2-3 items priorizados por el PO (40-60 min)
3. Estimar items refinados en el contexto del stack Rails/Mongoid (15 min)
4. Actualizar dashboard del backlog (10 min)

### Sprint Planning (1x por sprint, 1-2 horas)

**Objetivo:** Seleccionar items Ready para el sprint.

**Agenda:**
1. Review de velocidad del sprint anterior (10 min)
2. Capacidad disponible del equipo (10 min)
3. Seleccion de items por prioridad RICE (30-45 min)
4. Asignacion a developers (15 min)
5. Confirmacion de compromiso del equipo (10 min)

### Sprint Review (1x por sprint, 30-60 min)

**Objetivo:** Validar items Done y actualizar metricas.

**Agenda:**
1. Demo de items completados en staging Heroku (30-40 min)
2. PO acepta o rechaza (10 min)
3. Actualizar estadisticas del backlog (10 min)

---

## Metricas del Flujo

| Metrica | Que mide | Como calcular | Objetivo |
|---------|---------|---------------|----------|
| **Lead Time** | Tiempo total desde Draft hasta Done | Fecha Done - Fecha Draft | < 4 semanas (US), < 2 semanas (ENH) |
| **Cycle Time** | Tiempo de trabajo activo | Fecha Done - Fecha In Progress | < 1 sprint |
| **Throughput** | Capacidad del equipo | Items Done / Sprint | Tendencia creciente |
| **WIP** | Trabajo en curso | Items en In Progress simultaneamente | <= N developers del equipo |
| **Blocked Rate** | % de tiempo bloqueado | Dias bloqueado / Cycle Time | < 10% |
| **Escape Rate** | Items que vuelven de Done | Items reabiertos / Items Done | < 5% |

---

## Referencias

- [Dashboard del Backlog](INDEX.md) — Vista priorizada actual
- [Template de backlog item](templates/template-backlog-item.md) — Template para PDT/TDT/ENH
- [Estados y transiciones](../PRDs/artifact-estados.md) — Reglas detalladas de transicion
- [Flujo de refinamiento](../procedures/flujo-refinamiento.md) — Proceso de refinamiento paso a paso
- [Artefactos y Glosario](../ARTEFACTOS-Y-GLOSARIO.md) — Definiciones de todos los artefactos
