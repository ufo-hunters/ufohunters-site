# UFO-US-XXX.Y.Z: [Titulo de la User Story]

| Campo | Valor |
|-------|-------|
| **ID** | UFO-US-XXX.Y.Z |
| **PRD padre** | [UFO-PRD-XXX](../UFO-PRD-XXX/README.md) |
| **Epic padre** | UFO-EPIC-XXX.Y |
| **Estado** | Draft |
| **Prioridad** | _[Critica / Alta / Media / Baja]_ |
| **Estimacion** | _[S (1-2d) / M (3-5d) / L (1-2sem)]_ |
| **Asignado a** | _[Nombre del developer]_ |
| **Sprint** | _[Numero de sprint o "Sin asignar"]_ |
| **Proyecto** | ufohunters-site |

---

## User Story

> Como _[tipo de usuario especifico — visitante, usuario registrado, reportero de avistamientos, administrador]_,
> quiero _[realizar una accion concreta]_,
> para _[obtener un beneficio medible]_.

---

## Criterios de Aceptacion

### CA-1: _[Titulo descriptivo — Happy path]_

```
DADO QUE _[contexto inicial / precondicion]_
CUANDO _[el usuario realiza una accion]_
ENTONCES _[el sistema responde de esta manera]_
```

### CA-2: _[Titulo descriptivo — Caso alternativo]_

```
DADO QUE _[contexto inicial / precondicion]_
CUANDO _[el usuario realiza una accion]_
ENTONCES _[el sistema responde de esta manera]_
```

### CA-3: _[Titulo descriptivo — Caso de error]_

```
DADO QUE _[contexto inicial / precondicion]_
CUANDO _[el usuario realiza una accion incorrecta o hay un error]_
ENTONCES _[el sistema maneja el error de esta manera]_
```

### CA-4: _[Titulo descriptivo — Edge case]_ (opcional)

```
DADO QUE _[contexto limite]_
CUANDO _[accion en condiciones especiales]_
ENTONCES _[comportamiento esperado]_
```

> **Nota:** Minimo 3 criterios de aceptacion. Al menos 1 happy path y 1 caso de error.

---

## Notas Tecnicas

_[Consideraciones de implementacion relevantes para el developer. No es una especificacion tecnica completa — eso va en la TC.]_

- **Controlador afectado:** _[sightings / reports / articles / sessions / stats / errors]_
- **Modelo Mongoid afectado:** _[Report / User / Article / Countries — fields o indices a agregar/modificar]_
- **Ruta Rails:** _[GET/POST/PATCH/DELETE /recurso]_
- **Componentes frontend:** _[Partial ERB / Turbo Frame / Turbo Stream / Stimulus controller afectado]_
- **Validaciones:** _[Reglas de validacion del lado del servidor (Mongoid validates) y cliente]_
- **Performance:** _[Requisitos de rendimiento si aplica — queries MongoDB, cache Redis]_

---

## Dependencias

| Tipo | ID | Descripcion | Estado |
|------|----|-------------|--------|
| Bloquea a | _[UFO-US-XXX.Y.Z]_ | _[Esta US debe completarse antes de...]_ | _[Pendiente]_ |
| Bloqueada por | _[UFO-US-XXX.Y.Z]_ | _[Esta US requiere que antes se complete...]_ | _[Pendiente]_ |
| Relacionada con | _[UFO-US-XXX.Y.Z]_ | _[Comparten funcionalidad o datos]_ | — |

_[Si no hay dependencias, indicar "Sin dependencias identificadas."]_

---

## Technical Cards

| ID | Titulo | Tipo | Estado | Asignado | Estimacion |
|----|--------|------|--------|----------|------------|
| UFO-TC-XXX.Y.Z.1 | _[Titulo TC 1]_ | _[Backend Rails / Frontend Stimulus / Mongoid]_ | Draft | _[Nombre]_ | _[S/M/L]_ |
| UFO-TC-XXX.Y.Z.2 | _[Titulo TC 2]_ | _[Backend Rails / Frontend Stimulus / Mongoid]_ | Draft | _[Nombre]_ | _[S/M/L]_ |

_[Si la US no requiere TCs, indicar "Esta US no requiere Technical Cards por su baja complejidad tecnica."]_

---

## Mockups / Wireframes

_[Link a mockups en Figma, capturas o descripciones de pantalla. Si no aplica, indicar "No aplica — sin cambios de UI."]_

---

## Definition of Ready (Checklist)

Antes de mover esta US a **Ready**, verificar:

- [ ] La User Story sigue el formato "Como [rol], quiero [accion], para [beneficio]"
- [ ] Tiene al menos 3 criterios de aceptacion en formato Given/When/Then
- [ ] Al menos 1 criterio cubre el happy path
- [ ] Al menos 1 criterio cubre un caso de error
- [ ] La estimacion esta asignada (S, M o L — no XL)
- [ ] Las dependencias estan identificadas y resueltas o tienen plan
- [ ] El equipo la ha revisado en sesion de refinamiento
- [ ] Las notas tecnicas estan documentadas (modelos Mongoid y rutas Rails afectados)
- [ ] Los mockups estan disponibles (si hay cambios de UI)

---

## Definition of Done (Checklist)

Antes de mover esta US a **Done**, verificar:

- [ ] Todos los criterios de aceptacion pasan
- [ ] El codigo tiene tests con Minitest (unit y/o integration)
- [ ] El code review esta aprobado (minimo 1 aprobacion)
- [ ] La funcionalidad esta desplegada en staging (Heroku)
- [ ] La documentacion tecnica esta actualizada
- [ ] No hay bugs criticos o bloqueantes abiertos
- [ ] El PO ha validado la funcionalidad en staging

---

## Historial

| Fecha | Cambio | Autor |
|-------|--------|-------|
| _[YYYY-MM-DD]_ | Creacion de la US | _[Nombre]_ |

---

> **Instrucciones de uso:** Copia este template, reemplaza los placeholders `XXX.Y.Z` con los numeros correspondientes (PRD.Epic.US), y rellena todas las secciones marcadas con _[cursiva]_. Elimina esta nota al finalizar.
