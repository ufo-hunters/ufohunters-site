# Artefacto: PRD (Product Requirements Document)

## Que es un PRD

Un PRD (Product Requirements Document) es el documento maestro que define **que** se va a construir y **por que**. No define el **como** (eso corresponde a las Technical Cards). Es el punto de entrada obligatorio para cualquier funcionalidad significativa en **ufohunters-site**.

Un buen PRD responde tres preguntas fundamentales:

1. **Que problema estamos resolviendo?** — Definicion clara del pain point para los usuarios de ufo-hunters.com
2. **Para quien lo resolvemos?** — Visitantes del mapa, reporteros de avistamientos, lectores de articulos, administradores
3. **Como sabremos que lo resolvimos?** — Metricas de exito cuantificables

---

## Estructura Canonica de un PRD

Todo PRD de ufohunters-site debe seguir esta estructura. Las secciones marcadas con (*) son obligatorias.

### 1. Encabezado (*)

```
# UFO-PRD-XXX: [Titulo descriptivo]

| Campo | Valor |
|-------|-------|
| ID | UFO-PRD-XXX |
| Estado | Draft / Ready / In Progress / In Review / Done / Archived |
| Owner | [Nombre del Product Owner] |
| Fecha de creacion | [YYYY-MM-DD] |
| Ultima actualizacion | [YYYY-MM-DD] |
| Reviewers | [Lista de reviewers] |
```

### 2. Contexto y Antecedentes (*)

Explica la situacion actual en ufo-hunters.com. Que existe hoy, como funciona, y que circunstancias motivan este PRD. Incluye datos cuantitativos siempre que sea posible.

**Preguntas guia:**
- Que existe actualmente en el sitio?
- Que ha cambiado para que esto sea necesario ahora?
- Hay datos de New Relic o analytics que respalden la necesidad?

### 3. Problema (*)

Definicion clara y concisa del problema. Debe ser verificable: al leerlo, cualquier miembro del equipo debe poder confirmar si el problema existe o no.

**Formato recomendado:**
> "Actualmente, [tipo de usuario] experimenta [problema especifico] cuando intenta [accion en ufo-hunters.com], lo que resulta en [consecuencia medible]."

### 4. Usuarios Afectados (*)

| Tipo de usuario | Descripcion | Impacto del problema | Volumen estimado |
|-----------------|-------------|---------------------|------------------|
| Visitante anonimo | [Descripcion] | [Alto/Medio/Bajo] | [N usuarios] |
| Usuario registrado | [Descripcion] | [Alto/Medio/Bajo] | [N usuarios] |
| Reportero de avistamientos | [Descripcion] | [Alto/Medio/Bajo] | [N usuarios] |

### 5. Solucion Propuesta (*)

Descripcion a alto nivel de la solucion. No es una especificacion tecnica de Rails o Mongoid; es una descripcion funcional de lo que el usuario podra hacer y como cambiara su experiencia.

**Incluir:**
- Flujo principal del usuario (happy path)
- Cambios visibles para el usuario
- Comportamiento esperado del sistema

### 6. Alcance (*)

#### In Scope (lo que se incluye)
- [Funcionalidad 1]
- [Funcionalidad 2]
- [Funcionalidad 3]

#### Out of Scope (lo que NO se incluye)
- [Lo que explicitamente no se aborda]
- [Funcionalidad pospuesta para futuro]

### 7. Metricas de Exito (*)

| Metrica | Definicion | Baseline actual | Objetivo | Plazo de medicion |
|---------|-----------|-----------------|----------|-------------------|
| [Metrica 1] | [Como se mide] | [Valor actual] | [Valor objetivo] | [Cuando se mide] |
| [Metrica 2] | [Como se mide] | [Valor actual] | [Valor objetivo] | [Cuando se mide] |

**Minimo 2 metricas de exito cuantificables.**

### 8. Epics (*)

| ID | Titulo | Descripcion | US estimadas | Prioridad |
|----|--------|-------------|--------------|-----------|
| UFO-EPIC-XXX.1 | [Titulo] | [Descripcion breve] | [N] | Alta |
| UFO-EPIC-XXX.2 | [Titulo] | [Descripcion breve] | [N] | Media |

### 9. Riesgos y Dependencias

| ID | Tipo | Descripcion | Probabilidad | Impacto | Mitigacion |
|----|------|-------------|-------------|---------|------------|
| R1 | Riesgo | [Descripcion] | [Alta/Media/Baja] | [Alto/Medio/Bajo] | [Plan] |
| D1 | Dependencia | [Descripcion] | — | [Alto/Medio/Bajo] | [Plan] |

### 10. Cronograma estimado

| Fase | Duracion estimada | Entregable |
|------|-------------------|------------|
| Refinamiento | [N dias] | US refinadas y estimadas |
| Desarrollo | [N sprints] | Codigo implementado |
| QA | [N dias] | Tests Minitest ejecutados, bugs resueltos |
| Rollout | [N dias] | Feature en produccion (Heroku) |

---

## Reglas de un Buen PRD

### Debe tener

1. **Problema verificable** — Cualquiera puede confirmar si existe o no en ufo-hunters.com
2. **Metricas cuantificables** — Numeros concretos, no "mejorar la experiencia"
3. **Alcance explicito** — In scope Y out of scope claramente definidos
4. **Usuarios identificados** — Roles concretos del contexto OVNI/comunidad
5. **Epics definidos** — Descomposicion inicial aunque sea aproximada

### No debe tener

1. **Solucion tecnica detallada** — Eso va en las TC (Rails controllers, Mongoid fields), no en el PRD
2. **Lenguaje ambiguo** — Evitar: "mejorar el mapa", "optimizar el formulario" sin definir que significa
3. **Scope creep encubierto** — No agregar funcionalidades extra disfrazadas de "nice to have"
4. **Dependencias no resueltas** — Toda dependencia debe tener un plan de mitigacion
5. **Metricas vanidosas** — No medir cosas que no se pueden accionar

### Tamano ideal

- Un PRD debe poder leerse completamente en **15-20 minutos**
- Si es mas largo, probablemente necesita dividirse en multiples PRDs
- Si es mas corto, probablemente es un Enhancement, no un PRD

---

## Ejemplo

```markdown
# UFO-PRD-001: Migracion de CI/CD a GitHub Actions

| Campo | Valor |
|-------|-------|
| ID | UFO-PRD-001 |
| Estado | Ready |
| Owner | [PO] |
| Fecha de creacion | 2026-03-22 |

## Contexto

ufohunters-site actualmente usa Travis CI con una configuracion de Ruby 2.1.2
que es incompatible con la version de produccion (Ruby 3.2.8). El CI lleva
inactivo sin ejecutarse en cada PR, lo que significa que los tests de Minitest
no se validan automaticamente antes de cada merge.

## Problema

Actualmente, el equipo de ufohunters-site no tiene un pipeline de CI/CD
funcional, lo que significa que los merges a main se realizan sin verificacion
automatica de tests, aumentando el riesgo de regresiones en produccion (Heroku).

## Usuarios afectados

| Tipo | Descripcion | Impacto | Volumen |
|------|-------------|---------|---------|
| Developer | Hace merges sin verificacion automatica | Alto | Equipo completo |

## Solucion propuesta

Implementar GitHub Actions con un workflow que ejecute `rails test` en Ruby 3.2.8,
incluyendo setup de MongoDB para tests, en cada PR y merge a main.

## Alcance

### In scope
- Workflow de GitHub Actions para Ruby 3.2.8
- Ejecucion de Minitest (`rails test`)
- Setup de MongoDB para entorno de test
- Badge de CI en README

### Out of scope
- Deploy automatico a Heroku (se evalua en PRD separado)
- Linting con RuboCop (se evalua en ENH separado)

## Metricas de exito

| Metrica | Baseline | Objetivo | Plazo |
|---------|----------|----------|-------|
| % de PRs con CI ejecutado | 0% | 100% | Al activar workflow |
| Tiempo de ejecucion de CI | N/A | < 5 minutos | Al activar workflow |

## Epics

| ID | Titulo | US estimadas | Prioridad |
|----|--------|--------------|-----------|
| UFO-EPIC-001.1 | Configuracion del workflow | 2 | Alta |
| UFO-EPIC-001.2 | Setup de MongoDB en CI | 2 | Alta |
```

---

## Referencias

- [Template de PRD](template-prd.md) — Usa este template para crear nuevos PRDs
- [Estados y transiciones](artifact-estados.md) — Ciclo de vida de un PRD
- [Flujo de refinamiento](../procedures/flujo-refinamiento.md) — Proceso de refinamiento
- [Lifecycle del PRD](../procedures/prd-lifecycle.md) — Transiciones de estado detalladas
