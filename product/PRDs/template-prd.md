# UFO-PRD-XXX: [Titulo del PRD]

| Campo | Valor |
|-------|-------|
| **ID** | UFO-PRD-XXX |
| **Estado** | Draft |
| **Owner** | _[Nombre del Product Owner]_ |
| **Fecha de creacion** | _[YYYY-MM-DD]_ |
| **Ultima actualizacion** | _[YYYY-MM-DD]_ |
| **Reviewers** | _[Lista de reviewers]_ |
| **Proyecto** | ufohunters-site |
| **Framework** | Rails 8.0.2 |
| **Lenguaje** | Ruby 3.2.8 |

---

## 1. Contexto y Antecedentes

_[Explica la situacion actual en ufo-hunters.com. Que existe hoy? Como funciona? Que circunstancias hacen que este PRD sea necesario ahora?]_

_[Incluye datos cuantitativos siempre que sea posible: numero de usuarios afectados, frecuencia del problema, coste actual de no resolverlo.]_

### Antecedentes relevantes

- _[Decision o evento previo relevante 1]_
- _[Decision o evento previo relevante 2]_
- _[Referencia a PRDs anteriores relacionados, si los hay]_

---

## 2. Problema

_[Define el problema de forma clara, concisa y verificable. Al leerlo, cualquier miembro del equipo debe poder confirmar si el problema existe o no.]_

> **Formato recomendado:** "Actualmente, [tipo de usuario] experimenta [problema especifico] cuando intenta [accion], lo que resulta en [consecuencia medible]."

_[Escribe aqui el problema.]_

### Evidencias

| Fuente | Dato | Fecha |
|--------|------|-------|
| _[Feedback de usuarios / Analytics / Soporte / New Relic / Observacion]_ | _[Dato concreto]_ | _[Fecha]_ |
| _[Fuente 2]_ | _[Dato]_ | _[Fecha]_ |

---

## 3. Usuarios Afectados

| Tipo de usuario | Descripcion | Impacto del problema | Volumen estimado |
|-----------------|-------------|---------------------|------------------|
| _[Visitante anonimo]_ | _[Descripcion del rol y contexto]_ | _[Alto / Medio / Bajo]_ | _[N usuarios]_ |
| _[Usuario registrado]_ | _[Descripcion del rol y contexto]_ | _[Alto / Medio / Bajo]_ | _[N usuarios]_ |
| _[Reportero de avistamientos]_ | _[Descripcion del rol y contexto]_ | _[Alto / Medio / Bajo]_ | _[N usuarios]_ |

### Persona principal

_[Describe al usuario principal que se beneficia de esta solucion: quien es, que hace en ufo-hunters.com, que necesita, que frustracion tiene actualmente.]_

---

## 4. Solucion Propuesta

_[Describe la solucion a alto nivel. No es una especificacion tecnica; es una descripcion funcional de lo que el usuario podra hacer y como cambiara su experiencia.]_

### Flujo principal (Happy Path)

1. _[Paso 1: El usuario hace...]_
2. _[Paso 2: El sistema responde...]_
3. _[Paso 3: El usuario ve...]_
4. _[Paso N: Resultado final]_

### Cambios visibles para el usuario

- _[Cambio 1: Nueva pantalla / funcionalidad / comportamiento]_
- _[Cambio 2]_
- _[Cambio 3]_

### Wireframes / Mockups

_[Link a wireframes o mockups si estan disponibles. Si no, indicar "Pendiente de diseno".]_

---

## 5. Alcance

### In Scope (lo que se incluye)

- [ ] _[Funcionalidad 1 — descripcion breve]_
- [ ] _[Funcionalidad 2 — descripcion breve]_
- [ ] _[Funcionalidad 3 — descripcion breve]_

### Out of Scope (lo que NO se incluye)

- _[Funcionalidad explicitamente excluida 1 — motivo]_
- _[Funcionalidad excluida 2 — motivo]_
- _[Funcionalidad pospuesta para futuro — motivo]_

### Supuestos

- _[Supuesto 1: Asumimos que...]_
- _[Supuesto 2: Asumimos que...]_

### Restricciones

- _[Restriccion tecnica: debe ser compatible con Mongoid 9 / Rails 8]_
- _[Restriccion temporal o de recursos]_

---

## 6. Metricas de Exito

> **Minimo 2 metricas de exito cuantificables.**

| Metrica | Definicion | Baseline actual | Objetivo | Plazo de medicion |
|---------|-----------|-----------------|----------|-------------------|
| _[Metrica principal 1]_ | _[Como se mide exactamente]_ | _[Valor actual]_ | _[Valor objetivo]_ | _[N dias/semanas post-launch]_ |
| _[Metrica principal 2]_ | _[Como se mide exactamente]_ | _[Valor actual]_ | _[Valor objetivo]_ | _[N dias/semanas post-launch]_ |
| _[Metrica secundaria]_ | _[Como se mide]_ | _[Valor actual]_ | _[Valor objetivo]_ | _[Plazo]_ |

### Como medimos

_[Describe las herramientas o metodos de medicion: New Relic APM, analytics, queries MongoDB, encuestas, logs de Rails, etc.]_

---

## 7. Epics

| ID | Titulo | Descripcion | US estimadas | Prioridad | Dependencias |
|----|--------|-------------|--------------|-----------|--------------|
| UFO-EPIC-XXX.1 | _[Titulo Epic 1]_ | _[Descripcion breve]_ | _[N]_ | _[Alta/Media/Baja]_ | _[Ninguna / Epic N]_ |
| UFO-EPIC-XXX.2 | _[Titulo Epic 2]_ | _[Descripcion breve]_ | _[N]_ | _[Alta/Media/Baja]_ | _[Ninguna / Epic N]_ |
| UFO-EPIC-XXX.3 | _[Titulo Epic 3]_ | _[Descripcion breve]_ | _[N]_ | _[Alta/Media/Baja]_ | _[Ninguna / Epic N]_ |

### Orden de implementacion sugerido

1. **Epic XXX.1** — _[Motivo por el que va primero]_
2. **Epic XXX.2** — _[Motivo]_
3. **Epic XXX.3** — _[Motivo]_

---

## 8. Riesgos y Dependencias

### Riesgos

| ID | Riesgo | Probabilidad | Impacto | Mitigacion | Owner |
|----|--------|-------------|---------|------------|-------|
| R1 | _[Descripcion del riesgo]_ | _[Alta/Media/Baja]_ | _[Alto/Medio/Bajo]_ | _[Plan de mitigacion]_ | _[Responsable]_ |
| R2 | _[Descripcion del riesgo]_ | _[Alta/Media/Baja]_ | _[Alto/Medio/Bajo]_ | _[Plan de mitigacion]_ | _[Responsable]_ |

### Dependencias

| ID | Dependencia | Tipo | Impacto si no se resuelve | Estado | Responsable |
|----|-------------|------|---------------------------|--------|-------------|
| D1 | _[Descripcion]_ | _[Interna / Externa]_ | _[Que bloquea]_ | _[Resuelta / Pendiente]_ | _[Responsable]_ |
| D2 | _[Descripcion]_ | _[Interna / Externa]_ | _[Que bloquea]_ | _[Resuelta / Pendiente]_ | _[Responsable]_ |

---

## 9. Cronograma Estimado

| Fase | Duracion estimada | Fecha tentativa | Entregable |
|------|-------------------|-----------------|------------|
| Refinamiento | _[N dias]_ | _[Fecha]_ | US refinadas y estimadas |
| Sprint 1 — Epic XXX.1 | _[N semanas]_ | _[Fecha]_ | _[Entregable]_ |
| Sprint 2 — Epic XXX.2 | _[N semanas]_ | _[Fecha]_ | _[Entregable]_ |
| QA integral | _[N dias]_ | _[Fecha]_ | Tests Minitest ejecutados |
| Rollout | _[N dias]_ | _[Fecha]_ | Feature en produccion (Heroku) |

---

## 10. Alternativas Consideradas

| Alternativa | Descripcion | Motivo de descarte |
|-------------|-------------|--------------------|
| _[Alternativa 1]_ | _[Breve descripcion del enfoque]_ | _[Por que no se eligio]_ |
| _[Alternativa 2]_ | _[Breve descripcion del enfoque]_ | _[Por que no se eligio]_ |
| No hacer nada | Mantener la situacion actual | _[Impacto de no actuar]_ |

---

## Historial de Cambios

| Fecha | Version | Cambio | Autor |
|-------|---------|--------|-------|
| _[YYYY-MM-DD]_ | 1.0 | Creacion inicial | _[Nombre]_ |

---

## Aprobaciones

| Rol | Nombre | Fecha | Decision |
|-----|--------|-------|----------|
| Product Owner | _[Nombre]_ | _[Pendiente]_ | _[Aprobado / Rechazado / Pendiente]_ |
| Technical PM | _[Nombre]_ | _[Pendiente]_ | _[Aprobado / Rechazado / Pendiente]_ |
| Dev Lead | _[Nombre]_ | _[Pendiente]_ | _[Aprobado / Rechazado / Pendiente]_ |

---

> **Instrucciones de uso:** Copia este template, reemplaza `XXX` por el numero secuencial del PRD, y rellena todas las secciones marcadas con _[cursiva]_. Elimina esta nota al finalizar.
