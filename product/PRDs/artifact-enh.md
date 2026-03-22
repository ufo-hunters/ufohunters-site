# Artefacto: ENH (Enhancement)

## Que es un Enhancement

Un Enhancement (ENH) es una mejora pequena y autocontenida en **ufohunters-site** que no justifica la creacion de un PRD completo. Son optimizaciones puntuales, adiciones de valor rapido o mejoras en funcionalidades existentes que se pueden implementar de forma independiente.

**Prefijo:** `UFO-ENH-XXX`

---

## Cuando Crear un Enhancement

### Si, crear ENH

- Mejora que se puede completar en **1-3 dias** de trabajo
- No cambia la arquitectura ni introduce nuevos conceptos al producto
- No requiere descomposicion en Epics o multiples User Stories
- Es autocontenida: no depende de otros artefactos en desarrollo
- El valor es claro y el riesgo es bajo

### No, crear otro artefacto

| Situacion | Artefacto correcto |
|-----------|--------------------|
| La mejora requiere mas de 1 semana | PRD (si es funcionalidad nueva) o US (si se puede enmarcar en un Epic) |
| Es un problema de UX/copy en funcionalidad existente | PDT (Product Debt Task) |
| Es una mejora tecnica sin valor visible para el usuario | TDT (Technical Debt Task) |
| Es un error en funcionalidad existente | Bug (issue tracker de GitHub) |
| Requiere cambios en la arquitectura de Rails o el schema de Mongoid | PRD con Epic(s) |

---

## Formato Simplificado

Los ENH usan un formato mas ligero que los PRDs porque su alcance es reducido:

```markdown
# UFO-ENH-XXX: [Titulo descriptivo de la mejora]

| Campo | Valor |
|-------|-------|
| ID | UFO-ENH-XXX |
| Estado | [Draft / Ready / In Progress / In Review / Done] |
| Prioridad | [Alta / Media / Baja] |
| Esfuerzo estimado | [S / M] (si es L o mas, no es un ENH) |
| Area afectada | [Mapas / Reportes / Articulos / Estadisticas / Global] |
| Solicitado por | [Quien pidio o detecto la mejora] |
| Asignado a | [Nombre] |

## Descripcion

[Que se quiere mejorar y por que. Maximo 2-3 parrafos.]

## Situacion Actual

[Como funciona hoy en ufo-hunters.com.]

## Mejora Propuesta

[Como deberia funcionar tras el cambio. Ser especifico.]

## Criterios de Aceptacion

- [ ] [Criterio 1 — verificable]
- [ ] [Criterio 2 — verificable]
- [ ] [Criterio 3 — verificable]

## Notas de Implementacion

- [Controlador Rails afectado: e.g., sightings_controller.rb]
- [Modelo Mongoid afectado (si aplica): e.g., agregar field a Report]
- [Componente Stimulus / partial ERB a modificar]
- [Tests Minitest necesarios]
```

---

## Priorizacion de Enhancements

Los ENH se priorizan con un modelo simplificado basado en **valor vs esfuerzo**:

### Cuadrante de decision

```
              VALOR PARA EL USUARIO
              Bajo         Alto
         ┌──────────┬──────────┐
  Bajo   │ HACER    │ HACER    │
ESFUERZO │ cuando   │ PRIMERO  │
         │ hay      │ (quick   │
         │ hueco    │  wins)   │
         ├──────────┼──────────┤
  Alto   │ DESCARTAR│ REEVALUAR│
         │ (no vale │ (quiza es│
         │ la pena) │ un PRD)  │
         └──────────┴──────────┘
```

### Quick wins (Alto valor, Bajo esfuerzo)

Estos ENH se implementan prioritariamente. Son las mejoras con mejor retorno de inversion.

**Criterios de quick win:**
- Se completa en 1-2 dias
- Impacta positivamente a > 50% de usuarios
- No requiere coordinacion con otros equipos
- No tiene riesgo de regresion significativo

---

## Ejemplo Completo

```markdown
# UFO-ENH-001: Agregar paginacion al listado de avistamientos en la portada

| Campo | Valor |
|-------|-------|
| ID | UFO-ENH-001 |
| Estado | Ready |
| Prioridad | Alta |
| Esfuerzo estimado | S (2 dias) |
| Area afectada | Portada — listado de avistamientos (/sightings) |
| Solicitado por | Feedback de usuarios (lentitud al cargar muchos reportes) |
| Asignado a | [Developer] |

## Descripcion

El listado de avistamientos de la portada de ufohunters-site actualmente
carga todos los reportes de MongoDB en una sola pagina. Con la base de datos
creciendo, la pagina tarda varios segundos en cargar y genera una query
pesada sin limite.

## Situacion Actual

- El endpoint GET /sightings devuelve todos los Reports sin paginacion
- El SightingsController no tiene limite en la query de Mongoid
- No hay navegacion entre paginas de avistamientos

## Mejora Propuesta

- Implementar paginacion en el SightingsController (20 avistamientos por pagina)
- Agregar navegacion de paginas en la vista ERB
- Agregar parametro `page` a la ruta existente

## Criterios de Aceptacion

- [ ] El endpoint /sightings acepta el parametro `page`
- [ ] Por defecto muestra 20 avistamientos por pagina
- [ ] La vista muestra navegacion de paginas con Tailwind
- [ ] La primera pagina carga en < 500ms
- [ ] Los tests funcionales cubren la paginacion en SightingsControllerTest

## Notas de Implementacion

- Usar la gema `kaminari` o implementar paginacion manual con `.skip` y `.limit` de Mongoid
- El controlador afectado es `app/controllers/sightings_controller.rb`, accion `index`
- La query base es `Report.all.order(created_at: :desc)`
- Agregar tests en `test/functional/sightings_controller_test.rb`
```

---

## Flujo de Vida de un ENH

```
1. DETECCION
   └─> Alguien identifica una mejora pequena en ufo-hunters.com

2. DOCUMENTACION (5-15 minutos)
   └─> Crear el ENH con el formato simplificado

3. PRIORIZACION
   └─> Evaluar en el cuadrante valor/esfuerzo
   └─> Si es quick win, entra en el proximo sprint

4. IMPLEMENTACION (1-3 dias)
   └─> Desarrollo en Rails/Mongoid + tests Minitest + code review

5. VALIDACION
   └─> PO verifica que la mejora cumple los criterios en staging

6. DONE
   └─> Merge, deploy a Heroku, actualizar backlog
```

### Tiempos objetivo

| Fase | Tiempo maximo |
|------|---------------|
| De deteccion a documentacion | 1 dia |
| De documentacion a priorizacion | Siguiente sesion de refinamiento |
| De Ready a completado | 1 sprint |
| Tiempo total (deteccion a Done) | 2-3 semanas |

---

## Diferencia ENH vs Otros Artefactos

| Aspecto | ENH | US | PDT | TDT |
|---------|-----|-----|-----|-----|
| Tamano | 1-3 dias | Variable (S/M/L) | Variable | Variable |
| Necesita PRD | No | Si (dentro de un Epic) | No | No |
| Valor visible para usuario | Si | Si | Si | No directamente |
| Cambia arquitectura Rails | No | Puede | No | Puede |
| Formato | Simplificado | Completo con G/W/T | Medio | Medio |

---

## Referencias

- [Template de backlog item](../backlog/templates/template-backlog-item.md) — Template para crear ENH
- [Dashboard del backlog](../backlog/INDEX.md) — Vista priorizada de todo el backlog
- [Flujo de artefactos](../backlog/flujo-artefactos-backlog.md) — Ciclo de vida en el backlog
- [Estados y transiciones](artifact-estados.md) — Ciclo de vida de estados
- [Artefactos y Glosario](../ARTEFACTOS-Y-GLOSARIO.md) — Definiciones generales
