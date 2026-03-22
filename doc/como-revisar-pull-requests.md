# Como Revisar Pull Requests — UFO Hunters Site

## Filosofia de Revision

Las revisiones de codigo en ufo-hunters.com se basan en los siguientes principios:

1. **Constructiva, no destructiva**: El objetivo es mejorar el codigo, no criticar al autor. Siempre asumir buena intencion.
2. **Enfocada en los cambios**: Revisar lo que cambio, no reescribir el sistema. Si encuentras algo no relacionado con el PR, abre un issue separado.
3. **Educativa**: Las revisiones son una oportunidad de aprendizaje mutuo. Explicar el "por que" detras de cada sugerencia.
4. **Pragmatica**: Buscar el equilibrio entre perfeccion y velocidad de entrega.

---

## Etiquetas de Revision

Usamos un sistema de etiquetas para clasificar los comentarios en los PRs:

### [CRITICAL] — Bloqueante

Indica un problema que **debe corregirse** antes de hacer merge. Ejemplos:

- Bug evidente que afecta funcionalidad.
- Vulnerabilidad de seguridad (API key expuesta, query MongoDB sin validacion de input).
- Perdida de datos posible.
- Violacion de una regla critica del proyecto.

```
[CRITICAL] El campo `coordinates` no se valida antes de crear el indice 2dsphere.
Un array con valores no numericos lanzara un error en MongoDB al consultar el mapa.
Agregar: validates :coordinates, length: { is: 2 }, allow_nil: true
```

### [SUG] — Sugerencia

Propuesta de mejora que **se recomienda** pero no bloquea el merge.

```
[SUG] Este scope podria simplificarse usando el metodo Mongoid `gt`:
  scope :recent, -> { where(:created_at.gt => 30.days.ago) }
en lugar de hacer la comparacion en Ruby.
```

### [NIT] — Detalle Menor

Observacion cosmetica o de estilo que **no bloquea** el merge.

```
[NIT] Hay un espacio extra al final de la linea 42.
```

### [Q] — Pregunta

Pregunta para entender mejor el cambio. No bloquea el merge necesariamente.

```
[Q] Por que se usa `find_by` aqui en lugar del scope `confirmed`?
Hay algun caso donde el informe puede mostrarse estando pendiente?
```

---

## Checklist de Revision

### Correctitud

- [ ] El codigo hace lo que dice hacer segun la descripcion del PR.
- [ ] Los edge cases estan contemplados (coordenadas nulas, strings vacios, campos opcionales de Mongoid).
- [ ] Los errores se manejan adecuadamente.
- [ ] La logica condicional es correcta.

### Seguridad

- [ ] No hay credenciales, API keys ni URIs de MongoDB hardcodeados.
- [ ] Los inputs del usuario estan validados (Mongoid validators + Strong Parameters).
- [ ] No hay vulnerabilidades de XSS en vistas ERB (usar `html_escape` o `h()` al mostrar contenido de usuario).
- [ ] La autenticacion se verifica con `before_action :require_login` en acciones que lo necesitan.
- [ ] Los uploaders de CarrierWave tienen `extension_allowlist` definido.

### Rendimiento con MongoDB

- [ ] No hay queries N+1 a MongoDB (`.each` sobre una coleccion que hace queries adicionales por cada elemento).
- [ ] Los campos usados en `where()` tienen un indice MongoDB declarado en el modelo.
- [ ] No se carga la coleccion entera en memoria para filtrar en Ruby: usar scopes Mongoid.
- [ ] Las queries geoespaciales usan el indice 2dsphere correctamente.

### Legibilidad

- [ ] Los nombres de variables, metodos y clases son descriptivos.
- [ ] El codigo sigue las [convenciones de codigo](convenciones-codigo.md) del proyecto.
- [ ] Los metodos no superan las ~15 lineas.
- [ ] No hay codigo comentado.

### Tests

- [ ] Los cambios incluyen tests Minitest adecuados.
- [ ] Los tests cubren el happy path y los casos de error.
- [ ] Los tests existentes siguen pasando.
- [ ] Se usan los helper methods del proyecto (`create_dummy_report`, etc.) en lugar de crear objetos directamente.
- [ ] No se usan fixtures (incompatibles con Mongoid).

### Frontend (Rails + Hotwire)

- [ ] Los cambios de UI no rompen el layout de Tailwind CSS.
- [ ] Se usa Turbo correctamente (si aplica): Turbo Frames para actualizaciones parciales.
- [ ] Los Stimulus controllers siguen la convencion de nombrado (`nombre_controller.js`).
- [ ] No hay JavaScript inline en vistas ERB.
- [ ] Los assets nuevos se referencian correctamente en Propshaft (no require_tree).

### Mongoid Especifico

- [ ] Los nuevos campos del modelo estan declarados con `field :nombre, type: Tipo`.
- [ ] Si se agregan indices nuevos, se documenta que hay que ejecutar `rails db:mongoid:create_indexes`.
- [ ] No se accede a campos no declarados en el modelo (evitar la trampa del duck typing de MongoDB).
- [ ] Las asociaciones usan el tipo correcto (`has_many` vs `embeds_many`).

---

## Que NO Hacer en una Revision

### No solicitar refactoring no relacionado

Si el PR agrega una feature y ves codigo legacy cercano que podria mejorarse, no pidas refactorizarlo en el mismo PR. En su lugar:
- Abre un issue para el refactoring.
- Agrega una entrada en [deuda tecnica](deuda-tecnica.md) si es relevante.

### No imponer preferencias personales

Si el codigo es correcto y sigue las convenciones documentadas, no pidas cambios por preferencia personal. El estandar esta en [convenciones-codigo.md](convenciones-codigo.md).

### No hacer revisiones superficiales

Un "LGTM" sin revision real no ayuda. Si no tienes tiempo para revisar en profundidad, comunica al autor.

### No bloquear un PR sin justificacion clara

Si marcas "Changes Requested", debe haber al menos un comentario [CRITICAL] que justifique el bloqueo.

---

## Principio YAGNI en las Revisiones

**You Aren't Gonna Need It** — No pidas funcionalidad especulativa:

- No pedir abstracciones prematuras ("esto deberia ser un servicio por si crece").
- No pedir generalizaciones innecesarias.
- No pedir indexes MongoDB para queries hipoteticas que no existen aun.

El codigo debe resolver el problema **actual**.

---

## Puntos Especificos para Rails + Mongoid

Al revisar codigo de ufo-hunters.com, prestar especial atencion a:

### Modelos Mongoid

- Verificar que los nuevos campos tienen el tipo correcto (evitar `type: Object` generico).
- Asegurar que las validaciones cubren los campos requeridos por la logica de negocio.
- Revisar que los indices esten declarados para los campos de filtrado frecuente.
- Los callbacks (`before_save`, `after_create`) deben ser simples; logica compleja va en metodos explicitos.

### Controladores Rails

- Verificar que Strong Parameters (`params.permit`) lista solo los campos necesarios.
- Asegurar que `before_action :require_login` protege las acciones correctas.
- Comprobar que las respuestas de error usan los status codes HTTP correctos (422 para errores de validacion, 404 para not found).

### Frontend Hotwire

- Turbo Frames: verificar que el `id` del frame es unico en la pagina.
- Stimulus: el `data-controller` del HTML debe coincidir exactamente con el nombre del archivo del controller.
- Import Maps: las nuevas dependencias JS deben pinarse en `config/importmap.rb`.

### Assets Propshaft

- Los nuevos archivos CSS/JS se referencian directamente por path en Propshaft, sin `require_tree`.
- El Tailwind CSS se compila con `rails tailwindcss:build`; clases nuevas deben estar en el scope de la configuracion de Tailwind.

---

## Tiempos de Revision

| Prioridad del PR | Tiempo maximo de primera revision |
|-------------------|-----------------------------------|
| Hotfix / Critical | 2 horas |
| Feature / Normal | 1 dia laboral |
| Refactoring / Docs | 2 dias laborales |

---

## Flujo de Aprobacion

1. El autor abre el PR con descripcion detallada.
2. Se asignan uno o dos revisores.
3. Los revisores usan las etiquetas [CRITICAL], [SUG], [NIT], [Q].
4. El autor responde a los comentarios y realiza los cambios necesarios.
5. Los revisores aprueban cuando todos los [CRITICAL] estan resueltos.
6. Se hace merge (squash merge o merge commit segun la complejidad del cambio).

---

> Para las convenciones de codigo que se deben verificar en cada revision, consultar [convenciones-codigo.md](convenciones-codigo.md).
