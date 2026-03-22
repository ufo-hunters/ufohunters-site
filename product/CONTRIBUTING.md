# Guia de Contribucion — ufohunters-site

## Introduccion

Esta guia explica como contribuir a la documentacion de producto de **ufohunters-site**. Cualquier miembro del equipo puede proponer nuevas features, crear PRDs, refinar User Stories o mejorar la documentacion existente.

---

## Como Proponer Nuevas Features

### 1. Identificar la necesidad

Antes de proponer una feature, responde estas preguntas:

- **Problema:** Que problema resuelve? Es un problema real y recurrente en la comunidad de usuarios de ufo-hunters.com?
- **Usuarios:** A quienes afecta? Visitantes del mapa, reporteros de avistamientos, lectores de articulos?
- **Impacto:** Cual es el impacto de no resolver este problema?
- **Alternativas:** Existen soluciones alternativas? Por que no son suficientes?

### 2. Evaluar el tamano

| Tamano | Accion requerida | Artefacto |
|--------|-----------------|-----------|
| Grande (> 2 sprints) | Crear un PRD completo | `UFO-PRD-XXX` |
| Mediano (1-2 sprints) | Crear un PRD simplificado o Epic | `UFO-PRD-XXX` o `UFO-EPIC-XXX.Y` |
| Pequeno (< 1 sprint) | Crear un Enhancement | `UFO-ENH-XXX` |
| Deuda de producto | Crear un PDT | `UFO-PDT-XXX` |
| Deuda tecnica | Crear un TDT | `UFO-TDT-XXX` |

### 3. Crear la propuesta

1. Copia el template adecuado desde [PRDs/template-prd.md](PRDs/template-prd.md) o [backlog/templates/template-backlog-item.md](backlog/templates/template-backlog-item.md)
2. Rellena todas las secciones obligatorias
3. Asigna el siguiente numero secuencial disponible
4. Crea un branch con el formato: `product/UFO-PRD-XXX-titulo-corto`
5. Abre un Pull Request para revision

### 4. Presentar al equipo

- Presenta la propuesta en la proxima sesion de refinamiento
- Prepara respuestas para: por que ahora, que pasa si no lo hacemos, como medimos exito
- El Product Owner decide si se aprueba, se pospone o se descarta

---

## Como Crear un PRD

### Paso a paso

1. **Obtener el siguiente numero disponible**
   - Revisa [PRDs/README.md](PRDs/README.md) para ver el ultimo PRD creado
   - Asigna el siguiente numero secuencial: `UFO-PRD-XXX`

2. **Copiar el template**
   - Usa [PRDs/template-prd.md](PRDs/template-prd.md) como base
   - Crea el archivo en `PRDs/UFO-PRD-XXX/README.md`

3. **Rellenar las secciones obligatorias**
   - **Contexto:** Explica la situacion actual en ufo-hunters.com y por que surge esta necesidad
   - **Problema:** Define el problema de forma clara y medible
   - **Usuarios:** Identifica los tipos de usuario afectados (visitantes, reporteros, articlistas, administradores)
   - **Solucion:** Describe la solucion propuesta a alto nivel
   - **Alcance:** Define explicitamente que esta IN y OUT de scope
   - **Metricas:** Como sabremos si fue exitoso (minimo 2 metricas)
   - **Epics:** Descomposicion inicial en bloques funcionales

4. **Establecer el estado inicial**
   - Todo PRD nuevo comienza en estado **Draft**
   - No avanza a **Ready** hasta que el PO lo apruebe

5. **Crear el PR**
   - Branch: `product/UFO-PRD-XXX-titulo-corto`
   - Titulo del PR: `[PRD] UFO-PRD-XXX: Titulo del PRD`
   - Asignar como reviewer al Product Owner

### Checklist de calidad para un PRD

- [ ] El problema esta claramente definido y es verificable
- [ ] La solucion responde directamente al problema planteado
- [ ] El alcance tiene secciones explicitas de In Scope y Out of Scope
- [ ] Hay al menos 2 metricas de exito cuantificables
- [ ] Los Epics cubren todo el alcance definido
- [ ] Los riesgos estan identificados con mitigaciones
- [ ] No hay ambiguedades ni terminos vagos ("mejorar", "optimizar" sin definir que significa)

---

## Como Refinar User Stories

### Proceso de refinamiento

El refinamiento transforma User Stories de alto nivel en artefactos listos para desarrollo en Rails 8 / Mongoid 9.

#### Antes de la sesion

1. **PO/TPM** revisa las US candidatas para refinamiento
2. **PO/TPM** asegura que cada US tiene formato correcto: "Como [rol], quiero [accion], para [beneficio]"
3. **Dev Lead** revisa viabilidad tecnica preliminar considerando el stack (Rails 8, Mongoid 9, Hotwire)

#### Durante la sesion

1. **Leer la US en voz alta** — Todos deben entender lo mismo
2. **Clarificar dudas** — Preguntar todo lo que no este claro
3. **Escribir criterios de aceptacion** — Formato Given/When/Then:
   ```
   DADO QUE [contexto]
   CUANDO [el usuario hace algo]
   ENTONCES [pasa esto]
   ```
4. **Identificar edge cases** — Que pasa si...? Y si el input es invalido? Y si hay un error en MongoDB?
5. **Estimar** — Usar tallas: S (1-2d), M (3-5d), L (1-2sem)
6. **Verificar Definition of Ready:**
   - [ ] Formato de US correcto
   - [ ] Minimo 3 criterios de aceptacion
   - [ ] Estimacion asignada
   - [ ] Sin dependencias bloqueantes no resueltas
   - [ ] Notas tecnicas agregadas (si aplica: modelos Mongoid afectados, rutas Rails, componentes Stimulus)

#### Despues de la sesion

1. Actualizar la US con los criterios de aceptacion acordados
2. Mover el estado de **Draft** a **Ready**
3. Crear Technical Cards si la US lo requiere
4. Actualizar el backlog con la nueva priorizacion

### Senales de que una US necesita mas refinamiento

- El equipo no se pone de acuerdo en que significa "hecho"
- La estimacion es XL (mas de 2 semanas) — necesita descomponerse
- Hay mas de 3 dependencias externas sin resolver
- Los criterios de aceptacion son vagos o subjetivos

---

## Proceso de Review

### Para documentacion de producto (PRDs, US, TC)

1. **Autor** crea el PR siguiendo las convenciones de nombrado
2. **Reviewer asignado** (tipicamente PO o TPM) revisa usando el [checklist de review](procedures/pr-review.md)
3. **Revision tecnica** (si aplica) — Un developer revisa la viabilidad tecnica en el contexto de Rails 8 / Mongoid 9
4. **Aprobacion** — Minimo 1 aprobacion del PO o TPM
5. **Merge** — El autor hace merge tras la aprobacion

### Criterios de review

| Aspecto | Que verificar |
|---------|---------------|
| Formato | Sigue el template correcto? Tiene todas las secciones? |
| Contenido | Es claro, concreto y sin ambiguedades? |
| Completitud | Estan todos los campos obligatorios rellenos? |
| Consistencia | Los IDs siguen la convencion UFO-? Los links funcionan? |
| Viabilidad | Es tecnica y temporalmente viable en el stack actual? |
| Valor | El problema justifica la solucion propuesta? |

### Tiempos esperados de review

| Tipo de artefacto | Tiempo maximo de review |
|-------------------|------------------------|
| PRD | 3 dias laborales |
| Epic | 2 dias laborales |
| US | 1 dia laboral |
| TC | 1 dia laboral |
| PDT/TDT/ENH | 1 dia laboral |

---

## Convenciones de Nombrado

### Archivos

| Tipo | Formato del archivo | Ejemplo |
|------|---------------------|---------|
| PRD | `PRDs/UFO-PRD-XXX/README.md` | `PRDs/UFO-PRD-001/README.md` |
| US dentro de PRD | `PRDs/UFO-PRD-XXX/US-XXX.Y.Z.md` | `PRDs/UFO-PRD-001/US-001.1.1.md` |
| TC dentro de PRD | `PRDs/UFO-PRD-XXX/TC-XXX.Y.Z.N.md` | `PRDs/UFO-PRD-001/TC-001.1.1.1.md` |
| Backlog item | `backlog/UFO-[PDT|TDT|ENH]-XXX.md` | `backlog/UFO-TDT-001.md` |

### Branches

```
product/UFO-PRD-XXX-titulo-corto
product/UFO-ENH-XXX-titulo-corto
product/UFO-TDT-XXX-titulo-corto
```

### Commits

```
docs(product): crear PRD-001 migracion ci-cd github-actions
docs(product): refinar US-002.1.1 previsualizacion coordenadas
docs(product): agregar TC-002.1.1.1 componente stimulus mapa
docs(product): actualizar backlog con TDT-001 travis-ci
```

### Pull Requests

```
[PRD] UFO-PRD-001: Migracion CI/CD a GitHub Actions
[US] UFO-US-002.1.1: Previsualizacion de coordenadas en reporte
[TC] UFO-TC-002.1.1.1: Componente Stimulus para mapa de reporte
[ENH] UFO-ENH-001: Paginacion en listado de avistamientos
[TDT] UFO-TDT-001: Migrar Travis CI a GitHub Actions
```

---

## Preguntas Frecuentes

**P: Puedo crear una US sin un PRD?**
R: No para funcionalidades nuevas. Si para correcciones menores (ENH) o deuda (PDT/TDT).

**P: Quien asigna los numeros a los artefactos?**
R: El autor del artefacto, consultando el ultimo numero usado en el indice correspondiente.

**P: Puedo modificar un PRD que ya esta en estado "In Progress"?**
R: Solo cambios menores (typos, clarificaciones). Cambios de alcance requieren un nuevo proceso de aprobacion.

**P: Que hago si encuentro un bug durante el desarrollo?**
R: Si es un bug del codigo existente, abre un issue en GitHub. Si es un requisito faltante del PRD, comunica al PO para decidir si se agrega al alcance o se pospone.

**P: Como manejo cambios de schema en Mongoid? No hay migraciones.**
R: Mongoid no usa migraciones. Los cambios de schema (nuevos fields, indices) se documentan en la TC y se aplican directamente en los modelos. Usar el campo "Cambios en Modelos Mongoid" de la TC en lugar de "Migraciones de BD".

**P: Con que frecuencia se refinan las US?**
R: Minimo una vez por sprint, idealmente al inicio o a mitad del sprint anterior al que se planean implementar.

---

> **Nota:** Esta guia se aplica a la documentacion de producto de ufohunters-site (Rails 8.0.2 / Ruby 3.2.8 / MongoDB + Mongoid 9). Para contribuciones al codigo, consulta el README del repositorio principal.
