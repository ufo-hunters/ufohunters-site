# Flujo de Refinamiento — ufohunters-site

## Objetivo

El refinamiento es el proceso mediante el cual las ideas se transforman en artefactos listos para desarrollo en Rails 8 / Mongoid 9. Su objetivo es reducir la ambiguedad y asegurar que cada artefacto cumple el Definition of Ready antes de que un developer comience a trabajar en el.

---

## Flujo General: Idea -> PRD -> Epic -> US -> TC

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│          │     │          │     │          │     │          │     │          │
│   IDEA   │────>│   PRD    │────>│   EPIC   │────>│    US    │────>│    TC    │
│          │     │          │     │          │     │          │     │          │
└──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘
                                                                          │
  Checkpoint 1    Checkpoint 2    Checkpoint 3    Checkpoint 4    Checkpoint 5
  "Vale la pena?" "Esta claro?"   "Es coherente?" "Esta lista?"  "Se puede
                                                                   implementar
                                                                   en Rails/
                                                                   Mongoid?"
```

---

## Paso 1: Idea -> PRD

### Que ocurre

Se transforma una necesidad de negocio o problema de usuario en ufo-hunters.com en un documento estructurado que define el que y el por que.

### Actividades

| Actividad | Responsable | Duracion estimada |
|-----------|-------------|-------------------|
| Identificar el problema y recopilar evidencias (New Relic, feedback) | PO | 1-3 dias |
| Redactar el PRD usando el [template](../PRDs/template-prd.md) | PO | 1-2 dias |
| Definir metricas de exito cuantificables | PO | Incluido en redaccion |
| Identificar usuarios afectados (visitantes, reporteros, articulistas) | PO | Incluido en redaccion |
| Definir alcance (in/out of scope) | PO | Incluido en redaccion |
| Review interno del PRD | PO + TPM | 1 dia |

### Checkpoint 1: "Vale la pena?"

Antes de invertir tiempo en descomponer el PRD, validar:

- [ ] El problema esta respaldado por datos (metricas de New Relic, feedback de usuarios, soporte)
- [ ] El problema afecta a un numero significativo de usuarios de ufo-hunters.com
- [ ] La solucion propuesta es viable con el stack actual (Rails 8 / Mongoid 9 / Hotwire)
- [ ] El timing es correcto (no hay prioridades mas urgentes como el TDT de CI/CD)
- [ ] El PO aprueba continuar con el PRD

**Quien decide:** Product Owner
**Resultado:** PRD en estado **Draft** o descartado con motivo documentado

---

## Paso 2: PRD -> Epics

### Que ocurre

El PRD se descompone en bloques funcionales cohesivos (Epics). Cada Epic agrupa User Stories que juntas entregan una capacidad completa.

### Actividades

| Actividad | Responsable | Duracion estimada |
|-----------|-------------|-------------------|
| Identificar los bloques funcionales del PRD | PO + TPM | 1-2 horas |
| Evaluar viabilidad tecnica de cada bloque en Rails/Mongoid | Dev Lead | 30-60 min |
| Definir el alcance de cada Epic | TPM | 1-2 horas |
| Establecer dependencias entre Epics | TPM | 30 min |
| Definir el orden de implementacion | PO + TPM | 30 min |
| Documentar los Epics en el PRD | TPM | 1 hora |

### Checkpoint 2: "Esta claro?"

Antes de descomponer Epics en User Stories:

- [ ] Cada Epic tiene un titulo descriptivo y un alcance definido
- [ ] Los Epics cubren todo el alcance "In Scope" del PRD
- [ ] No hay solapamiento entre Epics
- [ ] Las dependencias entre Epics estan identificadas
- [ ] El orden de implementacion esta definido y justificado
- [ ] El Dev Lead confirmo que cada Epic es viable en el stack de ufohunters-site

**Quien decide:** PO y TPM
**Resultado:** PRD con Epics definidos, listo para descomponer en US

---

## Paso 3: Epic -> User Stories

### Que ocurre

Cada Epic se descompone en User Stories individuales que describen valor desde la perspectiva del usuario de ufo-hunters.com.

### Actividades

| Actividad | Responsable | Duracion estimada |
|-----------|-------------|-------------------|
| Identificar las historias de usuario del Epic | TPM + PO | 1-2 horas por Epic |
| Escribir cada US en formato "Como [rol], quiero [accion], para [beneficio]" | TPM | 30 min por US |
| Usar roles validos del contexto de ufo-hunters.com (visitante, reportero, etc.) | TPM | En la redaccion |
| Sesion de refinamiento con el equipo | TPM (facilita) | 1-2 horas |
| Escribir criterios de aceptacion (Given/When/Then) | TPM + Dev | En la sesion |
| Identificar edge cases y criterios de error (MongoDB errors, auth custom) | Dev + QA | En la sesion |
| Estimar cada US (S/M/L) en el contexto Rails/Mongoid | Equipo Dev | En la sesion |
| Identificar dependencias entre US | TPM | 15 min |

### Dinamica de la sesion de refinamiento

1. **Leer la US en voz alta** (2 min) — El TPM lee, todos escuchan
2. **Ronda de preguntas** (5-10 min) — Clarificar todo lo ambiguo, incluyendo comportamiento esperado con Hotwire
3. **Criterios de aceptacion** (10-15 min) — Escribir G/W/T en grupo
4. **Edge cases** (5 min) — "Que pasa si MongoDB no responde?", "Que pasa si las coordenadas son invalidas?", "Que pasa sin sesion activa?"
5. **Notas tecnicas** (5 min) — El equipo Dev agrega consideraciones: modelos Mongoid afectados, rutas Rails, componentes Stimulus
6. **Estimacion** (3 min) — Estimacion por tallas (S/M/L) considerando el stack
7. **Verificar DoR** (2 min) — Checklist rapido

### Checkpoint 3: "Es coherente?"

- [ ] Cada US sigue el formato "Como [rol en ufo-hunters.com], quiero [accion], para [beneficio]"
- [ ] Los Epics estan completamente cubiertos por sus US
- [ ] No hay US duplicadas o solapadas
- [ ] Cada US tiene al menos 3 criterios de aceptacion
- [ ] Ninguna US esta estimada como XL (si lo esta, se descompone)
- [ ] Las dependencias entre US estan mapeadas
- [ ] Las notas tecnicas mencionan los modelos Mongoid y rutas Rails relevantes

**Quien decide:** TPM con acuerdo del equipo
**Resultado:** US en estado **Draft**, listas para validacion final

---

## Paso 4: US -> Ready

### Que ocurre

Las US pasan por la validacion final del Definition of Ready. Es el ultimo filtro antes de que puedan ser asignadas a un sprint.

### Definition of Ready para una US

| Criterio | Verificado por | Obligatorio |
|----------|---------------|-------------|
| Formato correcto: "Como [rol], quiero [accion], para [beneficio]" | TPM | Si |
| Minimo 3 criterios de aceptacion en formato G/W/T | TPM | Si |
| Al menos 1 criterio de happy path | TPM | Si |
| Al menos 1 criterio de error (incluyendo casos de error Mongoid/Rails) | TPM | Si |
| Estimacion asignada (S, M, L) | Equipo Dev | Si |
| Sin dependencias bloqueantes no resueltas | TPM | Si |
| Revisada en sesion de refinamiento | TPM | Si |
| Notas tecnicas documentadas (modelos Mongoid, rutas Rails, Stimulus) | Dev | Si (si aplica) |
| Mockups disponibles | Diseno / PO | Si (si hay UI con Tailwind) |
| PO valida que la US refleja la necesidad del producto | PO | Si |

### Checkpoint 4: "Esta lista?"

- [ ] Todos los criterios del DoR se cumplen
- [ ] El PO aprueba la US
- [ ] El equipo Dev confirma que puede implementarla en Rails/Mongoid sin hacer mas preguntas

**Quien decide:** Product Owner
**Resultado:** US en estado **Ready**, disponible para sprint planning

---

## Paso 5: US -> Technical Cards

### Que ocurre

Para US de complejidad media o alta, el developer crea Technical Cards que detallan la implementacion tecnica en Rails 8 / Mongoid 9 / Hotwire.

### Actividades

| Actividad | Responsable | Duracion estimada |
|-----------|-------------|-------------------|
| Evaluar si la US necesita TCs | Developer | 15 min |
| Crear TCs usando el [template](../PRDs/template-tc.md) | Developer | 1-3 horas por TC |
| Documentar cambios en modelos Mongoid (fields, indices, validaciones) | Developer | Incluido |
| Documentar rutas Rails y controladores afectados | Developer | Incluido |
| Documentar componentes Stimulus / partials ERB | Developer | Incluido |
| Definir escenarios de test Minitest | Developer + QA | 30 min por TC |
| Estimar cada TC | Developer | 15 min por TC |
| Review tecnico de las TCs | Peer Dev | 30 min |

### Cuando crear TCs en ufohunters-site

| Situacion | Crear TC? |
|-----------|-----------|
| US con cambios en rutas o controladores Rails | Si |
| US con nuevos fields o indices en modelos Mongoid | Si |
| US con logica de negocio compleja (geospatial, CarrierWave) | Si |
| US con nuevo Stimulus controller o Turbo Stream | Si |
| US de frontend simple (cambio de parcial ERB, estilos Tailwind) | Opcional |
| US trivial (cambio de copy, texto hardcodeado) | No |
| US con integracion con Cloudinary o Google Maps API | Si |

### Checkpoint 5: "Se puede implementar?"

- [ ] La TC tiene descripcion clara y completa del cambio en Rails/Mongoid
- [ ] Si hay cambios en modelos Mongoid: fields, validaciones e indices documentados
- [ ] Si hay rutas nuevas o modificadas: spec completa del controlador y respuestas
- [ ] Escenarios de test Minitest definidos con inputs y outputs esperados
- [ ] Criterios de aceptacion tecnicos definidos (incluyendo compatibilidad con Turbo Drive)
- [ ] Estimacion asignada
- [ ] Un peer developer la ha revisado y entiende lo que hay que hacer

**Quien decide:** Developer + Dev Lead
**Resultado:** TC en estado **Ready**, el developer puede comenzar a implementar

---

## Participantes por Sesion

### Sesion de refinamiento de PRD (1x al mes o bajo demanda)

| Rol | Obligatorio | Funcion |
|-----|-------------|---------|
| Product Owner | Si | Presenta el PRD, responde preguntas de negocio y comunidad |
| Technical PM | Si | Facilita, documenta, asegura calidad |
| Dev Lead | Si | Evalua viabilidad en el stack Rails/Mongoid/Hotwire |
| Developers | 1-2 representantes | Aportan perspectiva de implementacion |
| QA | Opcional | Anticipa necesidades de testing Minitest |

### Sesion de refinamiento de US (1x por sprint, 1-2 horas)

| Rol | Obligatorio | Funcion |
|-----|-------------|---------|
| Technical PM | Si | Facilita la sesion |
| Product Owner | Si | Clarifica requisitos del producto, acepta criterios |
| Developers | Todos | Estiman en contexto Rails/Mongoid, cuestionan, agregan notas tecnicas |
| QA | Recomendado | Identifica edge cases y necesidades de test Minitest |

### Refinamiento tecnico de TCs (bajo demanda, 30-60 min)

| Rol | Obligatorio | Funcion |
|-----|-------------|---------|
| Developer autor | Si | Presenta la TC |
| Peer Developer | Si | Revisa viabilidad y completitud tecnica |
| Dev Lead | Opcional | Valida decisiones de arquitectura Rails/Mongoid |

---

## Metricas del Refinamiento

| Metrica | Que mide | Objetivo |
|---------|---------|----------|
| Tasa de rechazo en DoR | % de US que no pasan el DoR en primera revision | < 20% |
| Tiempo de refinamiento | Dias desde Draft hasta Ready | < 2 semanas |
| Precision de estimaciones | Desviacion entre estimado y real | < 30% |
| US que vuelven de In Progress a Ready | US insuficientemente refinadas | < 10% |
| Cobertura de refinamiento | % de US que pasan por sesion de refinamiento | 100% |

---

## Antipatrones del Refinamiento

| Antipatron | Problema | Solucion |
|------------|----------|----------|
| "Ya lo refinamos despues" | US entran a sprint sin DoR, generan bloqueos al implementar en Mongoid | Nunca permitir una US en sprint sin DoR cumplido |
| "El PO no vino" | Se refinan US sin el decisor, despues se rechazan | La sesion se pospone si el PO no puede asistir |
| "Ya entendemos todos" | No se escriben criterios porque "es obvio" | Siempre escribir criterios explicitos en G/W/T |
| "Estimemos a ojo" | Sin acuerdo en equipo, las estimaciones son del optimista | Usar proceso formal de estimacion en equipo |
| "Esto es gigante pero urgente" | US XL entran a sprint y no se completan | Descomponer obligatoriamente antes de entrar a sprint |
| "No necesita TC, es simple" | La US afecta modelos Mongoid sin documentacion y el developer no sabe que indices agregar | Siempre crear TC si hay cambios en documentos Mongoid |

---

## Referencias

- [Template PRD](../PRDs/template-prd.md) — Para crear nuevos PRDs
- [Template US](../PRDs/template-us.md) — Para crear nuevas User Stories
- [Template TC](../PRDs/template-tc.md) — Para crear nuevas Technical Cards
- [Artefacto US](../PRDs/artifact-us.md) — Definition of Ready y Done completos
- [Estados y transiciones](../PRDs/artifact-estados.md) — Reglas de cambio de estado
- [Lifecycle del PRD](prd-lifecycle.md) — Ciclo de vida completo de un PRD
