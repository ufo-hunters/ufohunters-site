# Artefacto: US (User Story)

## Que es una User Story

Una User Story (US) es una descripcion breve de una funcionalidad desde la perspectiva del usuario final. No describe implementacion tecnica (Rails, Mongoid, Stimulus); describe **valor para el usuario**. Es la unidad fundamental de trabajo en el backlog de **ufohunters-site**.

**Prefijo:** `UFO-US-XXX.Y.Z`
- `XXX` = Numero del PRD padre
- `Y` = Numero del Epic dentro del PRD
- `Z` = Numero de la US dentro del Epic

---

## Formato Obligatorio

Toda User Story debe seguir este formato sin excepciones:

```
Como [tipo de usuario],
quiero [realizar una accion especifica],
para [obtener un beneficio concreto].
```

### Roles validos en ufohunters-site

| Rol | Descripcion |
|-----|-------------|
| `visitante` | Usuario no registrado que navega el sitio |
| `usuario registrado` | Usuario con cuenta activa |
| `reportero de avistamientos` | Usuario que envia reportes de avistamientos OVNI |
| `autor de articulos` | Usuario que publica articulos en la seccion de articulos |
| `administrador` | Gestor con acceso al panel de administracion |

### Reglas del formato

| Elemento | Que incluir | Que NO incluir |
|----------|-------------|----------------|
| **Como [rol]** | Un rol especifico del contexto de ufo-hunters.com | Roles vagos: "usuario", "persona", "alguien" |
| **quiero [accion]** | Una accion concreta y verificable | Multiples acciones (dividir en US separadas) |
| **para [beneficio]** | El valor de negocio o la necesidad que se cubre | Detalles de implementacion (Mongoid, Rails) |

---

## Criterios de Aceptacion

Los criterios de aceptacion definen las condiciones que deben cumplirse para que la US se considere completa. Usan el formato **Given/When/Then** (Dado/Cuando/Entonces):

```
DADO QUE [contexto inicial / precondicion]
CUANDO [el usuario realiza una accion]
ENTONCES [el sistema responde de esta manera]
```

### Reglas para criterios de aceptacion

1. **Minimo 3 criterios** por User Story
2. **Al menos 1 criterio de camino feliz** (happy path)
3. **Al menos 1 criterio de error** (que pasa cuando algo sale mal)
4. **Cada criterio es independiente** y verificable por separado
5. **Sin lenguaje ambiguo** — Evitar: "rapido", "facil", "intuitivo"

### Ejemplo de criterios bien escritos

```
Criterio 1 — Envio de reporte exitoso:
DADO QUE soy un usuario registrado en la pagina de nuevo reporte
CUANDO completo todos los campos obligatorios y presiono "Enviar reporte"
ENTONCES el sistema guarda el reporte en MongoDB y me redirige a la pagina
de confirmacion con el numero de caso asignado

Criterio 2 — Coordenadas invalidas:
DADO QUE estoy completando el formulario de reporte
CUANDO ingreso coordenadas fuera del rango valido (latitud > 90 o < -90)
ENTONCES el sistema muestra "Las coordenadas de latitud deben estar entre
-90 y 90" y no guarda el documento

Criterio 3 — Sin sesion activa:
DADO QUE no he iniciado sesion
CUANDO intento acceder a la pagina de nuevo reporte
ENTONCES el sistema me redirige a la pagina de login con un mensaje
"Debes iniciar sesion para reportar un avistamiento"
```

---

## Estimacion y Prioridad

### Estimacion por tallas

| Talla | Dias de trabajo | Descripcion |
|-------|----------------|-------------|
| **S** (Small) | 1-2 dias | US simple, sin ambiguedad, pocas integraciones — e.g., agregar un field a un modelo Mongoid existente |
| **M** (Medium) | 3-5 dias | US moderada — e.g., nuevo formulario con validaciones y tests Minitest |
| **L** (Large) | 1-2 semanas | US compleja — e.g., integracion con Google Maps API o nuevo flujo Hotwire complejo |
| **XL** (Extra Large) | > 2 semanas | **Debe descomponerse** en US mas pequenas. Una XL no es aceptable. |

### Priorizacion

| Nivel | Significado | Cuando usarlo |
|-------|-------------|---------------|
| **Critica** | Bloquea otras US o el lanzamiento | Funcionalidad core: autenticacion, envio de reportes |
| **Alta** | Necesaria para el MVP o el sprint actual | Gran impacto para el usuario, bajo riesgo tecnico |
| **Media** | Importante pero no urgente | Mejora significativa que puede esperar 1-2 sprints |
| **Baja** | Nice to have | Mejora menor, puede posponerse sin impacto |

---

## Definition of Ready (DoR)

Una US esta **Ready** (lista para desarrollo) cuando cumple TODOS estos criterios:

- [ ] Tiene formato correcto: "Como [rol], quiero [accion], para [beneficio]"
- [ ] Tiene al menos 3 criterios de aceptacion en formato Given/When/Then
- [ ] Al menos 1 criterio cubre el happy path
- [ ] Al menos 1 criterio cubre un caso de error
- [ ] Tiene estimacion asignada (S, M, o L — no XL)
- [ ] Las dependencias estan identificadas y resueltas (o tienen plan)
- [ ] El equipo la ha revisado en sesion de refinamiento
- [ ] Las notas tecnicas estan documentadas (modelos Mongoid, rutas Rails, componentes Stimulus afectados)
- [ ] Los mockups o wireframes estan disponibles (si aplica)

---

## Definition of Done (DoD)

Una US esta **Done** (completada) cuando cumple TODOS estos criterios:

- [ ] Todos los criterios de aceptacion pasan
- [ ] El codigo tiene tests con Minitest (unit y/o integration/functional)
- [ ] El code review esta aprobado (minimo 1 aprobacion)
- [ ] La funcionalidad esta desplegada en staging (Heroku)
- [ ] La documentacion tecnica esta actualizada
- [ ] No hay bugs criticos o bloqueantes abiertos
- [ ] El PO ha validado la funcionalidad en staging

---

## Ejemplo Completo

```markdown
# UFO-US-002.1.1: Previsualizacion de coordenadas en el formulario de reporte

| Campo | Valor |
|-------|-------|
| ID | UFO-US-002.1.1 |
| PRD padre | UFO-PRD-002 |
| Epic padre | UFO-EPIC-002.1 |
| Estado | Ready |
| Prioridad | Alta |
| Estimacion | M |
| Asignado a | [Developer] |

## User Story

Como reportero de avistamientos,
quiero ver mi ubicacion en el mapa antes de enviar el reporte,
para confirmar que las coordenadas capturadas son correctas y corresponden
al lugar real del avistamiento.

## Criterios de Aceptacion

### CA-1: Previsualizacion exitosa
DADO QUE estoy en el formulario de nuevo reporte y he concedido permiso de geolocalizacion
CUANDO el formulario captura mis coordenadas automaticamente
ENTONCES aparece un mini-mapa con un marcador en mi ubicacion actual

### CA-2: Coordenadas manuales
DADO QUE estoy en el formulario de reporte
CUANDO escribo manualmente latitud y longitud validas en los campos correspondientes
ENTONCES el mapa actualiza el marcador a la nueva posicion en tiempo real

### CA-3: Coordenadas fuera de rango
DADO QUE estoy en el formulario de reporte
CUANDO ingreso una latitud mayor a 90 o menor a -90
ENTONCES el mapa muestra un mensaje de error "Coordenadas invalidas" y no actualiza el marcador

## Notas Tecnicas

- Usar Stimulus controller para la logica de previsualizacion
- Google Maps API v3 ya esta integrada en el frontend
- El modelo Report tiene `field :coordinates, type: Array` con indice 2dsphere
- Ver sightings_controller.rb para el patron de manejo de coordenadas
```

---

## Antipatrones Comunes

| Antipatron | Problema | Solucion |
|------------|----------|----------|
| US epica | "Como admin quiero gestionar todos los reportes del sistema" | Descomponer: revisar reportes, aprobar reportes, eliminar reportes |
| US tecnica | "Como developer quiero agregar el indice 2dsphere a MongoDB" | Eso es un TDT o una nota tecnica de TC, no una US |
| US sin beneficio | "Como usuario quiero ver un mapa" | Agregar el por que: "para explorar avistamientos por ubicacion geografica" |
| Criterios vagos | "El mapa carga rapido" | Cuantificar: "El mapa carga en menos de 2 segundos con 1000 marcadores" |
| US gigante (XL) | Estimada en mas de 2 semanas | Descomponer obligatoriamente en US mas pequenas |

---

## Referencias

- [Template de US](template-us.md) — Usa este template para crear nuevas User Stories
- [Artefacto TC](artifact-tc.md) — Como crear Technical Cards a partir de US
- [Flujo de refinamiento](../procedures/flujo-refinamiento.md) — Proceso completo de refinamiento
- [Estados y transiciones](artifact-estados.md) — Ciclo de vida de una US
