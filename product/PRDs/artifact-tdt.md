# Artefacto: TDT (Technical Debt Task)

## Que es la Deuda Tecnica

La Deuda Tecnica (Technical Debt) son todos aquellos atajos, decisiones suboptimas o trabajo tecnico pospuesto en **ufohunters-site** que generan un coste acumulativo sobre la velocidad de desarrollo, la estabilidad del sistema o la seguridad. Un TDT documenta y prioriza la resolucion de esta deuda.

**Prefijo:** `UFO-TDT-XXX`

---

## Tipos de Deuda Tecnica en ufohunters-site

| Tipo | Descripcion | Riesgo si no se aborda | Ejemplo especifico |
|------|-------------|------------------------|-------------------|
| **Performance** | Queries MongoDB que no escalan con el crecimiento de avistamientos | Degradacion progresiva: el mapa tarda segundos con miles de puntos | Queries sin indice en la coleccion `ufo`, carga del GeoJSON sin paginacion |
| **Seguridad** | Vulnerabilidades conocidas, dependencias desactualizadas | Brechas de seguridad, exposicion de datos de usuarios | Dependencias con CVEs conocidos, reCAPTCHA desactualizado |
| **CI/CD** | Travis CI configurado para Ruby 2.1.2 cuando produccion usa Ruby 3.2.8 | Merges sin validacion de tests, regresiones no detectadas | El `.travis.yml` esta stale y no se ejecuta funcionalidad |
| **Code smells** | Codigo duplicado, logica de negocio en controladores | Aumento del tiempo de desarrollo | Logica de coordenadas duplicada entre sightings y reports controllers |
| **Dependencias** | Librerias desactualizadas, incompatibilidades pendientes | Breaking changes acumulados | Rails 8.0.2 es reciente pero otras gemas pueden estar desactualizadas |
| **Testing** | Cobertura insuficiente con Minitest | Regresiones no detectadas, miedo a refactorizar | Modulos core (Report model, Sightings controller) sin tests |
| **Linter** | Sin RuboCop ni StandardRB configurado | Calidad de codigo no verificable, inconsistencias de estilo | No hay `.rubocop.yml` en el repositorio |
| **Infraestructura** | Sin docker-compose.yml para desarrollo local | Onboarding lento, MongoDB debe ejecutarse manualmente | Desarrolladores nuevos necesitan configurar MongoDB manualmente |
| **Documentacion tecnica** | README con informacion de Rails 3-4, desactualizado | Tiempo de onboarding alto, confusion sobre el stack actual | README menciona versiones antiguas que no corresponden al stack actual |

---

## Cuando Crear un TDT

Crea un TDT cuando:

1. **Se tomo un atajo consciente** — "Lo hacemos asi por ahora, pero debemos refactorizarlo"
2. **Se detecta un code smell durante code review** — Pero arreglarlo no cabe en el PR actual
3. **Una dependencia queda desactualizada** — Hay una nueva version major que requiere migracion
4. **Se identifica un problema de rendimiento** — Queries MongoDB lentas, mapa con mas de 1000 puntos tarda demasiado
5. **Un reporte de seguridad detecta vulnerabilidades** — CVEs en dependencias (`bundle audit`)
6. **La cobertura de tests baja del umbral** — Nuevos modelos Mongoid o controladores Rails sin tests
7. **El equipo reporta "dolor" recurrente** — Siempre tarda mas de lo esperado tocar cierto modulo

---

## Formato de un TDT

```markdown
# UFO-TDT-XXX: [Titulo descriptivo del problema tecnico]

| Campo | Valor |
|-------|-------|
| ID | UFO-TDT-XXX |
| Estado | [Draft / Ready / In Progress / In Review / Done] |
| Tipo de deuda | [Performance / Seguridad / CI-CD / Code smells / Dependencias / Testing / Linter / Infraestructura / Doc tecnica] |
| Prioridad | [Critica / Alta / Media / Baja] |
| Riesgo si no se aborda | [Alto / Medio / Bajo] |
| Esfuerzo estimado | [S / M / L] |
| Area afectada | [Modulo o componente: sightings, reports, models/report.rb, CI, etc.] |
| Detectado por | [Nombre — code review / monitoring New Relic / auditoria / desarrollo] |
| Asignado a | [Developer o equipo] |

## Descripcion del Problema

[Describir el problema tecnico de forma precisa en el contexto de Rails / Mongoid / Ruby.
Incluir metricas si es posible: tiempos de respuesta de New Relic, cobertura
de tests, version actual vs version deseada de una dependencia.]

## Impacto Actual

- **En velocidad de desarrollo:** [Como afecta la productividad del equipo]
- **En estabilidad:** [Causa errores, crasheos, inconsistencias?]
- **En seguridad:** [Hay riesgo de vulnerabilidad?]
- **En rendimiento:** [Tiempos de respuesta, consumo de recursos MongoDB]

## Solucion Propuesta

[Describir la solucion tecnica a alto nivel.]

### Pasos de implementacion

1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

### Riesgos de la solucion

- [Riesgo 1 y mitigacion]
- [Riesgo 2 y mitigacion]

## Criterios de Aceptacion

- [ ] [Criterio tecnico verificable 1]
- [ ] [Criterio tecnico verificable 2]
- [ ] No se introducen regresiones (todos los tests Minitest pasan: `rails test`)
- [ ] La documentacion se actualiza si hay cambios de arquitectura
```

---

## Priorizacion de TDTs

### Matriz de priorizacion

Los TDTs se priorizan combinando **riesgo** e **impacto en velocidad**:

```
                    RIESGO
                Bajo    |    Alto
           ┌───────────┬───────────┐
    Alto   │  MEDIA    │ CRITICA   │
IMPACTO    │ Planificar│ Proximo   │
VELOCIDAD  │ trimestre │ sprint    │
           ├───────────┼───────────┤
    Bajo   │  BAJA     │  ALTA     │
           │ Backlog   │ Dentro de │
           │           │ 2 sprints │
           └───────────┴───────────┘
```

### Reglas de priorizacion automatica

| Condicion | Prioridad asignada |
|-----------|--------------------|
| Vulnerabilidad de seguridad con CVE score >= 7.0 | Critica — Proximo sprint |
| Travis CI stale bloqueando validacion de merges | Alta — Proximo sprint |
| Sin linter configurado (RuboCop/Standard) | Alta — Dentro de 2 sprints |
| Cobertura de tests < 50% en modelo core (Report) | Alta — Dentro de 2 sprints |
| Tiempo de respuesta P95 > 1 segundo en endpoint critico | Alta — Dentro de 2 sprints |
| Code smell detectado pero sin impacto medible | Baja — Backlog |

### Capacidad reservada

**Regla del 20%:** Se reserva el 20% de la capacidad de cada sprint para TDTs. Esto asegura que la deuda tecnica no crece indefinidamente.

---

## Ejemplo Completo

```markdown
# UFO-TDT-001: Migrar CI/CD de Travis CI (stale) a GitHub Actions

| Campo | Valor |
|-------|-------|
| ID | UFO-TDT-001 |
| Estado | Ready |
| Tipo de deuda | CI-CD |
| Prioridad | Alta |
| Riesgo si no se aborda | Alto (merges sin validacion de tests Minitest) |
| Esfuerzo estimado | M (3 dias) |
| Area afectada | CI/CD — .travis.yml, GitHub repository settings |
| Detectado por | Analisis inicial del proyecto |
| Asignado a | [Developer] |

## Descripcion del Problema

El archivo `.travis.yml` de ufohunters-site esta configurado para Ruby 2.1.2,
mientras que produccion usa Ruby 3.2.8. Travis CI lleva inactivo sin
ejecutar los tests de Minitest en cada PR, lo que significa que los
merges a main ocurren sin validacion automatica.

## Impacto Actual

- **En velocidad de desarrollo:** Los developers no tienen feedback automatico
  de si sus cambios rompen tests existentes
- **En estabilidad:** Riesgo de regresiones en produccion (Heroku) sin deteccion
- **En seguridad:** Sin impacto directo
- **En rendimiento:** Sin impacto directo

## Solucion Propuesta

Crear un workflow de GitHub Actions que:
1. Ejecute en cada PR y merge a main
2. Use Ruby 3.2.8 (matriz de versiones)
3. Configure MongoDB para el entorno de test
4. Ejecute `rails test`

### Pasos de implementacion

1. Crear `.github/workflows/ci.yml`
2. Configurar la accion `ruby/setup-ruby`
3. Configurar servicio de MongoDB en GitHub Actions
4. Ejecutar `bundle install` y `rails test`
5. Agregar badge de CI al README
6. Deprecar `.travis.yml`

### Riesgos de la solucion

- Algunos tests pueden asumir configuracion especifica de Travis (mitigacion: revisar test helpers)
- MongoDB en GitHub Actions requiere configuracion especifica del servicio

## Criterios de Aceptacion

- [ ] El workflow se ejecuta en cada PR hacia main
- [ ] `rails test` pasa en el CI con Ruby 3.2.8
- [ ] MongoDB esta disponible en el entorno de CI
- [ ] El tiempo de ejecucion del workflow es < 5 minutos
- [ ] El badge de CI es visible en el README
- [ ] `.travis.yml` se elimina o archiva

## Metricas de Mejora

| Metrica | Valor actual | Valor objetivo |
|---------|-------------|----------------|
| % de PRs con CI ejecutado | 0% | 100% |
| Tiempo de deteccion de regresion | Dias (deteccion manual) | Minutos (automatico) |
```

---

## Relacion con Otros Artefactos

| Relacion | Descripcion |
|----------|-------------|
| TDT puede bloquear una US | Si la deuda tecnica impide implementar una feature, se resuelve primero |
| TDT puede originarse de una TC | Al implementar una TC se detecta deuda que no cabe en el scope |
| TDT no es un bug | Un bug rompe funcionalidad existente. Un TDT es codigo que funciona pero es suboptimo |
| TDT alimenta el backlog | Se prioriza junto con US, PDT y ENH |

---

## Referencias

- [Template de backlog item](../backlog/templates/template-backlog-item.md) — Template para crear TDTs
- [Dashboard del backlog](../backlog/INDEX.md) — Vista priorizada de todo el backlog
- [Flujo de artefactos](../backlog/flujo-artefactos-backlog.md) — Ciclo de vida en el backlog
- [Estados y transiciones](artifact-estados.md) — Ciclo de vida de estados
