# Artefacto: PDT (Product Debt Task)

## Que es la Deuda de Producto

La Deuda de Producto (Product Debt) son todos aquellos aspectos de **ufohunters-site** que funcionan tecnicamente pero no cumplen el estandar de calidad deseado desde la perspectiva del usuario. Es el equivalente de producto a la deuda tecnica: atajos tomados en UX, copy, flujos o diseno que generan un coste futuro.

**Prefijo:** `UFO-PDT-XXX`

---

## Tipos de Deuda de Producto

| Tipo | Descripcion | Ejemplo en ufohunters-site |
|------|-------------|---------------------------|
| **UX incompleta** | Flujos que funcionan pero son confusos o carecen de feedback al usuario | Formulario de reporte de avistamiento sin indicadores de progreso ni validacion en tiempo real |
| **Copy provisional** | Textos placeholder, mensajes de error genericos, traducciones pendientes | Mensaje de error "Error 500" en lugar de "Hubo un problema al guardar tu reporte. Intenta de nuevo." |
| **Flujos parciales** | Funcionalidades que se lanzaron con el minimo viable y necesitan completarse | Filtro de avistamientos que solo filtra por pais pero el diseno contemplaba filtros por fecha, forma y duracion |
| **Inconsistencias visuales** | Diferencias de estilo entre secciones del producto | Botones con estilos Tailwind inconsistentes entre la seccion de mapas y la de articulos |
| **Accesibilidad** | Elementos que no cumplen estandares WCAG | Formularios sin labels, contraste insuficiente, navegacion por teclado incompleta |
| **Onboarding** | Falta de guias, tooltips o ayuda contextual para nuevos usuarios | Usuario nuevo no sabe como interpretar el mapa o como completar todos los campos del reporte |

---

## Cuando Crear un PDT

Crea un PDT cuando:

1. **Se lanzo una funcionalidad de reporte o mapa de forma rapida** — "Lo lanzamos asi por ahora, despues lo mejoramos"
2. **Se detecta una inconsistencia en el producto** — Feedback del equipo o de usuarios sobre flujos confusos
3. **Los usuarios reportan confusion** — Comentarios sobre el proceso de envio de avistamientos, registro, etc.
4. **Se identifica un gap en accesibilidad** — Auditorias de accesibilidad detectan problemas
5. **Se pospuso la internacionalizacion** — Textos hardcodeados que necesitan externalizarse para i18n

---

## Formato de un PDT

```markdown
# UFO-PDT-XXX: [Titulo descriptivo del problema de producto]

| Campo | Valor |
|-------|-------|
| ID | UFO-PDT-XXX |
| Estado | [Draft / Ready / In Progress / In Review / Done] |
| Tipo de deuda | [UX / Copy / Flujo parcial / Inconsistencia visual / Accesibilidad / Onboarding] |
| Prioridad | [Critica / Alta / Media / Baja] |
| Impacto en usuarios | [Alto / Medio / Bajo] |
| Esfuerzo estimado | [S / M / L] |
| Origen | [Feedback de usuario / Auditoria / Observacion interna / Sprint retro] |
| Area afectada | [Mapas / Reportes / Articulos / Registro / Estadisticas / Global] |
| Asignado a | [Nombre o equipo] |

## Descripcion del Problema

[Describir que funciona mal desde la perspectiva del usuario. Ser especifico
y medible. Incluir capturas de pantalla si es posible.]

## Situacion Actual

[Como funciona o se ve actualmente en ufo-hunters.com. Que experimenta el usuario.]

## Situacion Deseada

[Como deberia funcionar o verse. Que deberia experimentar el usuario.]

## Impacto

- **Usuarios afectados:** [Cuantos y de que tipo: visitantes, reporteros, etc.]
- **Frecuencia:** [Cada cuanto se encuentran con este problema]
- **Severidad:** [Que tan frustrante o bloqueante es]

## Criterios de Aceptacion

- [ ] [Criterio especifico y verificable 1]
- [ ] [Criterio especifico y verificable 2]
- [ ] [Criterio especifico y verificable 3]

## Notas

- [Contexto adicional, decisiones previas, restricciones del stack Rails/Tailwind]
```

---

## Priorizacion de PDTs

Los PDTs se priorizan usando una version adaptada de RICE:

| Factor | Peso | Como medir |
|--------|------|------------|
| **Reach (Alcance)** | Cuantos usuarios se ven afectados | % de visitantes o reporteros que pasan por el flujo afectado |
| **Impact (Impacto)** | Cuanto afecta la experiencia | 3=Alto (bloqueo/confusion severa), 2=Medio (molestia), 1=Bajo (estetico) |
| **Confidence (Confianza)** | Que tan seguros estamos del impacto | 100%=Datos concretos, 80%=Feedback cualitativo, 50%=Intuicion |
| **Effort (Esfuerzo)** | Cuanto cuesta resolverlo | Numero de dias-persona estimados |

**Score RICE = (Reach * Impact * Confidence) / Effort**

### Umbrales de prioridad

| Score RICE | Prioridad | Accion |
|------------|-----------|--------|
| > 50 | Critica | Proximo sprint |
| 20-50 | Alta | Dentro de 2 sprints |
| 5-20 | Media | Planificar en el trimestre |
| < 5 | Baja | Backlog, revisar trimestralmente |

---

## Ejemplo Completo

```markdown
# UFO-PDT-001: Unificar mensajes de error en el formulario de reporte de avistamiento

| Campo | Valor |
|-------|-------|
| ID | UFO-PDT-001 |
| Estado | Ready |
| Tipo de deuda | Copy / UX |
| Prioridad | Alta |
| Impacto en usuarios | Alto |
| Esfuerzo estimado | M (3 dias) |
| Origen | Observacion interna + feedback de usuarios |
| Area afectada | Formulario de reporte de avistamientos (/reports/new) |
| Asignado a | [Developer] |

## Descripcion del Problema

Los mensajes de error en el formulario de reporte de avistamiento de
ufohunters-site son inconsistentes. Algunos muestran errores tecnicos
de Mongoid ("Validation failed: coordinates is invalid"), otros muestran
mensajes genericos ("Error al guardar") y el formulario de registro
no muestra ningun mensaje visible al fallar.

## Situacion Actual

- Formulario de reporte: expone errores de Mongoid sin formatear
- Formulario de registro: no muestra errores, la pagina simplemente recarga
- Formulario de login: muestra "Email o contrasena incorrectos" (correcto)

## Situacion Deseada

- Todos los formularios muestran mensajes de error claros, debajo del campo afectado
- Los errores de Mongoid se traducen a mensajes comprensibles por el usuario
- El formato es consistente con los estilos Tailwind del sitio
- Los errores desaparecen cuando el usuario corrige el campo

## Impacto

- **Usuarios afectados:** 100% de los usuarios que intentan reportar
- **Frecuencia:** Cada vez que cometen un error al completar el formulario
- **Severidad:** Alta (genera abandono del formulario de reporte)

## Criterios de Aceptacion

- [ ] Los errores de validacion de Mongoid se mapean a mensajes user-friendly
- [ ] Los mensajes se muestran debajo del campo afectado con clases Tailwind de error
- [ ] Todos los formularios del sitio usan el mismo componente/partial de error
- [ ] Los errores desaparecen al corregir el campo (comportamiento Stimulus)
```

---

## Relacion con Otros Artefactos

| Relacion | Descripcion |
|----------|-------------|
| PDT puede originarse de un PRD | Cuando se lanzo el PRD con deuda de producto conocida |
| PDT puede convertirse en US | Si el PDT crece en alcance, se promueve a US dentro de un Epic |
| PDT no reemplaza un bug | Un bug es algo que no funciona. Un PDT es algo que funciona pero mal |
| PDT alimenta el backlog | Se prioriza junto con US, TDT y ENH en el backlog unificado |

---

## Referencias

- [Template de backlog item](../backlog/templates/template-backlog-item.md) — Template para crear PDTs
- [Dashboard del backlog](../backlog/INDEX.md) — Vista priorizada de todo el backlog
- [Flujo de artefactos](../backlog/flujo-artefactos-backlog.md) — Ciclo de vida en el backlog
- [Estados y transiciones](artifact-estados.md) — Ciclo de vida de estados
