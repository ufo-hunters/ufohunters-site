# Ciclo de Vida del PRD — ufohunters-site

## Vision General

Un PRD (Product Requirements Document) en **ufohunters-site** pasa por un ciclo de vida definido desde su creacion hasta su cierre. Este documento detalla cada fase, las condiciones de entrada y salida, y las responsabilidades en cada transicion.

---

## Fases del Ciclo de Vida

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐    ┌──────────┐    ┌──────────────┐
│          │    │          │    │          │    │              │    │          │    │              │
│  DRAFT   │───>│  REVIEW  │───>│ APPROVED │───>│ IN PROGRESS  │───>│   DONE   │───>│  ARCHIVED    │
│          │    │          │    │          │    │              │    │          │    │              │
└──────────┘    └─────┬────┘    └──────────┘    └──────────────┘    └──────────┘    └──────────────┘
                      │
                      │ Rechazado
                      v
                ┌──────────┐
                │ DRAFT    │ (vuelve con feedback)
                │ (v2, v3) │
                └──────────┘
```

---

## Fase 1: Draft — Creacion Inicial

### Descripcion

El PRD se crea por primera vez. El Product Owner redacta el documento usando el [template estandar](../PRDs/template-prd.md) y lo completa con la informacion disponible sobre ufo-hunters.com.

### Condiciones de entrada

- Existe una necesidad de negocio o problema de usuario identificado en la plataforma
- El PO tiene suficiente informacion para escribir un primer borrador
- El problema justifica un PRD (no es un ENH ni un PDT)

### Actividades

| Actividad | Responsable | Entregable |
|-----------|-------------|------------|
| Crear directorio `PRDs/UFO-PRD-XXX/` | PO | Directorio creado |
| Copiar template de PRD y rellenar secciones | PO | README.md con borrador |
| Recopilar datos y evidencias del problema (New Relic, feedback) | PO | Seccion "Problema" con datos |
| Identificar usuarios afectados (visitantes, reporteros, articulistas) | PO | Seccion "Usuarios" completa |
| Proponer solucion a alto nivel | PO | Seccion "Solucion" borrador |
| Definir alcance inicial (in/out of scope) | PO | Seccion "Alcance" borrador |
| Proponer metricas de exito | PO | Minimo 2 metricas borrador |
| Esbozar Epics iniciales | PO | Lista de Epics tentativa |

### Condiciones de salida (para pasar a Review)

- [ ] Todas las secciones obligatorias del template tienen contenido (puede ser borrador)
- [ ] El problema esta definido con al menos 1 evidencia concreta
- [ ] Hay al menos 2 metricas de exito propuestas
- [ ] El alcance tiene secciones de In Scope y Out of Scope
- [ ] El PO considera que el borrador esta listo para revision del equipo

### Duracion tipica

2-5 dias laborales

---

## Fase 2: Review — Revision del Equipo

### Descripcion

El PRD en borrador se presenta al equipo para revision. Se busca feedback sobre claridad, viabilidad en Rails/Mongoid, completitud y prioridad. Es una fase colaborativa donde se mejora el documento.

### Condiciones de entrada

- PRD en Draft con todas las secciones obligatorias completadas
- PO solicita revision creando un PR en GitHub o convocando una sesion

### Actividades

| Actividad | Responsable | Entregable |
|-----------|-------------|------------|
| Crear PR en GitHub con el PRD para revision escrita | PO | PR abierto |
| Sesion de revision del PRD (30-60 min) | PO (presenta), TPM (facilita) | Feedback documentado |
| Dev Lead evalua viabilidad tecnica en el stack Rails 8 / Mongoid 9 / Hotwire | Dev Lead | Feedback tecnico |
| TPM evalua completitud y claridad | TPM | Feedback de proceso |
| Equipo Dev evalua estimacion de esfuerzo en el contexto del codebase | Equipo | Estimacion preliminar |
| PO incorpora feedback y actualiza el PRD | PO | PRD actualizado |

### Tipos de feedback

| Tipo | Ejemplo | Accion |
|------|---------|--------|
| **Bloqueante** | "El problema no esta claro" o "La solucion no es viable con Mongoid" | El PRD vuelve a Draft. No se aprueba. |
| **Importante** | "Falta un caso de uso critico" o "Las metricas no son medibles" | Se corrige antes de aprobar |
| **Sugerencia** | "Podriamos considerar tambien integrar con Turbo Streams para..." | Se evalua, se incorpora si hay consenso |

### Condiciones de salida

**Para aprobar (pasar a Approved):**
- [ ] No hay feedback bloqueante sin resolver
- [ ] El feedback importante ha sido incorporado
- [ ] El Dev Lead confirma viabilidad tecnica en Rails 8 / Mongoid 9
- [ ] El TPM confirma que el documento esta completo
- [ ] El PO toma la decision final de aprobar

**Para rechazar (volver a Draft):**
- Hay feedback bloqueante que requiere reescritura significativa
- Se documenta el motivo del rechazo en el PR de GitHub
- El PO actualiza el PRD y lo somete a nueva revision

### Duracion tipica

3-5 dias laborales (incluye revision asincrona y sesion)

---

## Fase 3: Approved — Listo para Descomposicion

### Descripcion

El PRD ha sido aprobado por el equipo. Esta listo para ser descompuesto en Epics y User Stories. El alcance esta fijado y no debe cambiar sin un proceso formal de cambio.

### Condiciones de entrada

- El PRD paso exitosamente la fase de Review
- El PO, TPM y Dev Lead han dado su aprobacion
- El PR en GitHub fue mergeado

### Actividades

| Actividad | Responsable | Entregable |
|-----------|-------------|------------|
| Actualizar el estado del PRD a "Approved" en el README | TPM | Estado actualizado |
| Actualizar el [indice de PRDs](../PRDs/README.md) | TPM | Indice actualizado |
| Planificar sesion(es) de descomposicion en Epics | TPM | Sesiones agendadas |
| Descomponer el PRD en Epics considerando la arquitectura MVC de Rails | PO + TPM | Epics documentados en el PRD |
| Para cada Epic, crear User Stories | TPM + Equipo | US en estado Draft |
| Sesion de refinamiento de US | TPM (facilita) | US refinadas |

### Control de cambios de alcance

Una vez aprobado, cualquier cambio en el alcance del PRD requiere:

1. El solicitante documenta el cambio propuesto y su justificacion
2. El PO evalua el impacto en scope, timeline y recursos
3. Si el cambio es significativo (> 20% del alcance original), se requiere nueva sesion de Review
4. Si el cambio es menor, el PO puede aprobar directamente
5. Todo cambio se registra en el historial del PRD

### Condiciones de salida (para pasar a In Progress)

- [ ] Al menos 1 Epic esta definido con sus US
- [ ] Al menos 1 US esta en estado Ready (cumple DoR)
- [ ] El sprint planning incluye US de este PRD

### Duracion tipica

1-2 semanas (dependiendo de la complejidad del PRD)

---

## Fase 4: In Progress — Implementacion Activa

### Descripcion

Al menos un Epic del PRD tiene User Stories en desarrollo activo. El PRD se mantiene en este estado mientras haya trabajo en curso en el codebase de ufohunters-site.

### Condiciones de entrada

- Al menos 1 US del PRD esta en estado In Progress
- Hay un developer asignado trabajando activamente en Rails/Mongoid

### Actividades

| Actividad | Responsable | Frecuencia |
|-----------|-------------|------------|
| Monitorear progreso de las US | TPM | Cada daily |
| Resolver bloqueos y dependencias (e.g., incompatibilidades Mongoid) | TPM | Bajo demanda |
| Actualizar estado de US y Epics | Developer / TPM | Al cambiar estado |
| Refinar US del siguiente Epic (pipeline) | TPM + Equipo | 1x por sprint |
| Reportar progreso al PO | TPM | 1x por sprint |

### Metricas de seguimiento durante In Progress

| Metrica | Que medir | Frecuencia |
|---------|----------|------------|
| US completadas vs totales | N Done / N Total por Epic | Cada sprint |
| Velocidad del equipo en este PRD | Puntos/dias completados por sprint | Cada sprint |
| Bloqueos activos | Numero de US bloqueadas | Cada daily |
| Desviacion de estimacion | Real vs estimado por US en Rails/Mongoid | Al completar cada US |

### Condiciones de salida (para pasar a Done)

- [ ] TODOS los Epics del PRD estan en estado Done
- [ ] Todas las US de todos los Epics estan en estado Done
- [ ] Las metricas de exito del PRD se estan midiendo (New Relic, analytics)
- [ ] No hay bugs criticos abiertos relacionados con el PRD en GitHub
- [ ] El PO ha validado todas las funcionalidades en staging (Heroku)

### Duracion tipica

Variable (depende del tamano del PRD). Tipicamente 1-4 sprints.

---

## Fase 5: Done — Completado

### Descripcion

Todos los Epics y US del PRD estan completados, validados y desplegados en produccion (Heroku). Las metricas de exito estan siendo medidas.

### Condiciones de entrada

- Todos los Epics en Done
- PO ha dado el visto bueno final
- Las funcionalidades estan en produccion en Heroku

### Actividades

| Actividad | Responsable | Entregable |
|-----------|-------------|------------|
| Actualizar estado del PRD a "Done" | TPM | Estado actualizado |
| Actualizar indice de PRDs | TPM | Indice actualizado |
| Documentar lecciones aprendidas | TPM + Equipo | Seccion "Retrospectiva" |
| Configurar medicion de metricas de exito | Dev / New Relic | Dashboards o reportes |
| Revision de metricas (30 dias post-launch) | PO | Informe de resultados |
| Comunicar cierre del PRD al equipo | PO | Comunicacion |

### Revision de metricas post-implementacion

30 dias despues de completar el PRD, el PO revisa las metricas de exito definidas:

| Metrica | Objetivo definido en PRD | Resultado real | Evaluacion |
|---------|-------------------------|---------------|------------|
| _[Metrica 1]_ | _[Objetivo]_ | _[Real — de New Relic]_ | _[Cumplido / No cumplido / Parcial]_ |
| _[Metrica 2]_ | _[Objetivo]_ | _[Real]_ | _[Cumplido / No cumplido / Parcial]_ |

### Condiciones de salida (para pasar a Archived)

- [ ] Han pasado al menos 2 sprints desde el Done
- [ ] Las metricas de exito han sido evaluadas
- [ ] No hay items de seguimiento pendientes (PDTs, bugs en GitHub)
- [ ] El equipo no necesita consultar activamente el PRD

### Duracion tipica

Se mantiene en Done durante 1-2 trimestres antes de archivar.

---

## Fase 6: Archived — Archivado

### Descripcion

El PRD se archiva por historico. Ya no es un documento activo pero se mantiene accesible en el repositorio para referencia futura.

### Condiciones de entrada

- El PRD estuvo en Done al menos 2 sprints
- Las metricas de exito fueron evaluadas
- No hay trabajo pendiente asociado

### Actividades

| Actividad | Responsable | Entregable |
|-----------|-------------|------------|
| Mover PRD a seccion "Archived" del indice | TPM | Indice actualizado |
| Agregar resumen de resultados finales | PO | Resumen en el PRD |

**Nota:** Los PRDs tambien pueden archivarse si son descartados (sin implementar). En ese caso, se documenta el motivo de descarte.

---

## Resumen de Transiciones

| De | A | Condicion principal | Aprobador |
|----|---|---------------------|-----------|
| Draft | Review | Borrador completo, PO solicita revision | PO |
| Review | Approved | Sin feedback bloqueante, viabilidad tecnica confirmada | PO + Dev Lead |
| Review | Draft | Feedback bloqueante, necesita reescritura | Reviewer |
| Approved | In Progress | Al menos 1 US en desarrollo | TPM |
| In Progress | Done | Todos los Epics en Done, PO valida en Heroku | PO |
| Done | Archived | Metricas evaluadas, > 2 sprints en Done | TPM |
| Cualquiera | Archived | Descartado con motivo documentado | PO |

---

## Tiempos de Referencia

| Fase | Duracion tipica | Maximo aceptable | Accion si excede |
|------|----------------|------------------|------------------|
| Draft | 2-5 dias | 2 semanas | TPM revisa si sigue siendo relevante |
| Review | 3-5 dias | 1 semana | TPM escala a los reviewers |
| Approved | 1-2 semanas | 1 mes | PO reevalua prioridad |
| In Progress | 1-4 sprints | 6 sprints | Retrospectiva obligatoria, reevaluar alcance |
| Done | 1-2 trimestres | — | Archivar |

---

## Referencias

- [Template PRD](../PRDs/template-prd.md) — Template para crear nuevos PRDs
- [Artefacto PRD](../PRDs/artifact-prd.md) — Definicion completa del artefacto
- [Estados y transiciones](../PRDs/artifact-estados.md) — Reglas generales de transicion
- [Flujo de refinamiento](flujo-refinamiento.md) — Proceso de refinamiento de ideas a artefactos
- [Indice de PRDs](../PRDs/README.md) — Listado de todos los PRDs
