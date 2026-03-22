# Dashboard del Backlog — ufohunters-site

## Resumen Ejecutivo

| Metrica | Valor |
|---------|-------|
| **Total de items** | _0_ |
| **In Progress** | _0_ |
| **Ready** | _0_ |
| **Blocked** | _0_ |
| **Pending Review** | _0_ |
| **Done (ultimo sprint)** | _0_ |
| **Velocidad promedio** | _— items/sprint_ |
| **Deuda acumulada (PDT+TDT)** | _0 items_ |

---

## Priorizacion RICE

> **RICE Score = (Reach x Impact x Confidence) / Effort**

| Posicion | ID | Titulo | Tipo | R | I | C | E | Score | Estado |
|----------|----|--------|------|---|---|---|---|-------|--------|
| 1 | _[UFO-XXX-NNN]_ | _[Titulo]_ | _[US/PDT/TDT/ENH]_ | _[N]_ | _[1-3]_ | _[0.5-1]_ | _[N dias]_ | _[Score]_ | _[Estado]_ |
| 2 | _[UFO-XXX-NNN]_ | _[Titulo]_ | _[Tipo]_ | _[N]_ | _[1-3]_ | _[0.5-1]_ | _[N dias]_ | _[Score]_ | _[Estado]_ |

### Como calcular RICE

| Factor | Descripcion | Escala |
|--------|-------------|--------|
| **Reach** | Cuantos usuarios de ufo-hunters.com se ven afectados por sprint | Numero estimado de usuarios |
| **Impact** | Cuanto cambia la experiencia | 3=Masivo, 2=Alto, 1=Medio, 0.5=Bajo, 0.25=Minimo |
| **Confidence** | Que tan seguros estamos | 100%=Datos duros (New Relic, analytics), 80%=Cualitativos, 50%=Intuicion |
| **Effort** | Cuantos dias-persona requiere | Numero de dias-persona |

---

## Items en Progreso (In Progress)

> Items activamente siendo trabajados en el sprint actual.

| ID | Titulo | Tipo | Asignado a | Sprint | Dias en progreso | Estimacion |
|----|--------|------|------------|--------|-----------------|------------|
| _Vacio_ | — | — | — | — | — | — |

### Alertas de progreso

- Items con mas de 5 dias en progreso requieren revision del TPM
- Items con mas de 1 sprint en progreso se escalan al PO

---

## Items Listos (Ready)

> Items completamente refinados y listos para ser tomados en el proximo sprint.

| Posicion | ID | Titulo | Tipo | RICE Score | Estimacion | Dependencias |
|----------|----|--------|------|------------|------------|--------------|
| _Vacio_ | — | — | — | — | — | — |

---

## Items Bloqueados (Blocked)

> Items que no pueden avanzar por una dependencia no resuelta.

| ID | Titulo | Tipo | Bloqueado por | Desde | Accion requerida | Responsable |
|----|--------|------|---------------|-------|------------------|-------------|
| _Vacio_ | — | — | — | — | — | — |

### Politica de bloqueos

- Todo item bloqueado debe tener un responsable asignado para resolver el bloqueo
- Si un bloqueo dura mas de 3 dias, se escala en la daily
- Si dura mas de 1 sprint, el TPM reevalua prioridades

---

## Items en Revision (Pending Review)

> Items implementados, pendientes de code review en GitHub o validacion del PO en staging.

| ID | Titulo | Tipo | Implementado por | PR | Reviewer | Dias en review |
|----|--------|------|-----------------|-----|----------|---------------|
| _Vacio_ | — | — | — | — | — | — |

### Politica de review

- Tiempo maximo de review: 3 dias laborales
- Si excede 3 dias, el TPM asigna un reviewer alternativo

---

## Items Completados (Done) — Ultimo Sprint

> Items completados en el sprint actual o anterior.

| ID | Titulo | Tipo | Completado por | Fecha | Esfuerzo real |
|----|--------|------|---------------|-------|---------------|
| _Vacio_ | — | — | — | — | — |

---

## Deuda de Producto (PDT)

| ID | Titulo | Prioridad | Area | RICE Score | Estado |
|----|--------|-----------|------|------------|--------|
| _Vacio_ | — | — | — | — | — |

**Total PDTs abiertos:** 0
**Ratio PDT creados/cerrados (ultimo trimestre):** —

---

## Deuda Tecnica (TDT)

| ID | Titulo | Tipo de deuda | Riesgo | RICE Score | Estado |
|----|--------|---------------|--------|------------|--------|
| `UFO-TDT-001` | Migrar CI/CD de Travis CI (stale) a GitHub Actions | CI-CD | Alto | _Por calcular_ | Draft |

**Total TDTs abiertos:** 1
**Capacidad reservada para TDTs:** 20% del sprint
**Ratio TDT creados/cerrados (ultimo trimestre):** —

> **Nota:** Se ha pre-cargado UFO-TDT-001 como el primer item de deuda tecnica identificado en el analisis inicial del proyecto. Travis CI esta configurado para Ruby 2.1.2 pero produccion usa Ruby 3.2.8.

---

## Enhancements (ENH)

| ID | Titulo | Valor | Esfuerzo | RICE Score | Estado |
|----|--------|-------|----------|------------|--------|
| _Vacio_ | — | — | — | — | — |

**Total ENHs abiertos:** 0

---

## Estadisticas del Backlog

### Health Check

| Indicador | Valor | Umbral saludable | Estado |
|-----------|-------|-------------------|--------|
| Items Ready disponibles | _0_ | >= 1 sprint de trabajo | _Por evaluar_ |
| Items bloqueados | _0_ | < 10% del total | _Por evaluar_ |
| Tiempo promedio en Review | _— dias_ | < 3 dias | _Por evaluar_ |
| Items stale (> 3 sprints en Ready) | _0_ | 0 | _Por evaluar_ |
| Ratio deuda/features | _—_ | < 30% | _Por evaluar_ |

### Tendencias

| Sprint | Items completados | Items nuevos | Deuda resuelta | Velocidad |
|--------|-------------------|--------------|----------------|-----------|
| _Sprint N_ | _0_ | _0_ | _0_ | _0 pts_ |
| _Sprint N-1_ | _0_ | _0_ | _0_ | _0 pts_ |
| _Sprint N-2_ | _0_ | _0_ | _0_ | _0 pts_ |

---

## Como Agregar Items al Backlog

### Paso a paso

1. **Identifica el tipo de artefacto** adecuado:
   - Nueva funcionalidad grande -> PRD -> [PRDs/template-prd.md](../PRDs/template-prd.md)
   - User Story dentro de un Epic -> US -> [PRDs/template-us.md](../PRDs/template-us.md)
   - Deuda de producto -> PDT -> [templates/template-backlog-item.md](templates/template-backlog-item.md)
   - Deuda tecnica -> TDT -> [templates/template-backlog-item.md](templates/template-backlog-item.md)
   - Mejora pequena -> ENH -> [templates/template-backlog-item.md](templates/template-backlog-item.md)

2. **Crea el artefacto** usando el template correspondiente

3. **Calcula el RICE Score** del item

4. **Agrega el item** a la seccion correspondiente de este dashboard

5. **Presenta en refinamiento** para validacion y priorizacion final

### Reglas de priorizacion

- Los items se ordenan por RICE Score descendente dentro de cada seccion
- Items de seguridad (TDT con tipo "Seguridad") tienen prioridad automatica
- El PO tiene la decision final sobre el orden de ejecucion
- La capacidad de cada sprint se distribuye: 80% features/ENH, 20% deuda (PDT+TDT)

---

## Referencias

- [Flujo de artefactos en el backlog](flujo-artefactos-backlog.md)
- [Template para items de backlog](templates/template-backlog-item.md)
- [Artefactos y Glosario](../ARTEFACTOS-Y-GLOSARIO.md)
- [Estados y transiciones](../PRDs/artifact-estados.md)

---

> **Mantenimiento:** Este dashboard debe actualizarse al inicio de cada sprint (sprint planning) y al cierre (sprint review). Es responsabilidad del TPM mantenerlo al dia.
