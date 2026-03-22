# Deuda Tecnica — UFO Hunters Site

## Que Cuenta como Deuda Tecnica

La deuda tecnica es toda decision tecnica que prioriza la velocidad de entrega a corto plazo a costa de la mantenibilidad o calidad a largo plazo. En ufo-hunters.com, consideramos deuda tecnica:

- **Codigo que funciona pero es dificil de mantener**: Metodos muy largos, logica duplicada, nombres poco descriptivos.
- **Ausencia de tests**: Funcionalidad critica sin cobertura de tests unitarios o funcionales.
- **Dependencias desactualizadas**: Gemas con versiones antiguas que pueden tener vulnerabilidades.
- **Workarounds y hacks**: Soluciones temporales que se convirtieron en permanentes.
- **Documentacion faltante o desactualizada**: Codigo complejo sin documentar.
- **Configuracion fragil**: Valores hardcodeados, configuracion sin validacion.
- **Problemas de infraestructura**: CI/CD obsoleto, falta de monitoring adecuado.

### Que NO es Deuda Tecnica

- Codigo funcional que "podria ser mas elegante".
- Decisiones de diseno validas que simplemente son diferentes a la preferencia personal.
- Features que aun no se han implementado (eso es backlog, no deuda).

---

## Niveles de Severidad

### Critica

Problemas que afectan directamente la estabilidad, seguridad o disponibilidad en produccion.
**Plazo de resolucion**: Sprint actual o siguiente.

### Alta

Problemas que impactan significativamente la productividad del equipo o la calidad del producto.
**Plazo de resolucion**: Proximos 1-2 sprints.

### Media

Problemas que generan friccion pero no bloquean el desarrollo ni afectan la produccion.
**Plazo de resolucion**: Planificacion trimestral.

### Baja

Problemas cosmeticos o de mejora que no afectan la funcionalidad ni la productividad.
**Plazo de resolucion**: De forma oportunista al trabajar en el area afectada.

---

## Inventario Actual de Deuda Tecnica

### Critica

| ID | Descripcion | Impacto | Esfuerzo | Estado | Fecha |
|----|-------------|---------|----------|--------|-------|
| — | _No hay items criticos registrados_ | — | — | — | — |

### Alta

| ID | Descripcion | Impacto | Esfuerzo | Estado | Fecha |
|----|-------------|---------|----------|--------|-------|
| DT-001 | CI/CD con Travis CI obsoleto (Ruby 2.1.2) | Los tests automaticos no se ejecutan en cada PR; sin integracion continua funcional | S | Identificado | 2026-03-22 |
| DT-002 | Sin linter configurado (RuboCop) | Sin enforcement automatico de estilos; la calidad del codigo depende solo de las revisiones manuales | S | Identificado | 2026-03-22 |
| DT-003 | Autenticacion custom sin funcionalidades completas | No hay recuperacion de contrasena automatica, confirmacion de email ni autenticacion OAuth; usuarios que olvidan su contrasena quedan bloqueados | M | Identificado | 2026-03-22 |

### Media

| ID | Descripcion | Impacto | Esfuerzo | Estado | Fecha |
|----|-------------|---------|----------|--------|-------|
| DT-004 | Sin docker-compose.yml para desarrollo local | Los desarrolladores deben ejecutar MongoDB manualmente o con comandos Docker sueltos; mayor friccion de onboarding | XS | Identificado | 2026-03-22 |
| DT-005 | README principal refleja informacion de la era Rails 3-4 | Documentacion de setup contradice el stack actual; confunde a nuevos contribuidores | XS | Identificado | 2026-03-22 |
| DT-006 | Cobertura de tests desconocida / probablemente baja en areas legacy | Sin metricas de cobertura; areas del codigo modificadas frecuentemente pueden carecer de tests de regresion | L | Identificado | 2026-03-22 |
| DT-007 | Sin `.env.example` documentado | Los desarrolladores no saben que variables de entorno son necesarias sin leer el codigo | XS | Identificado | 2026-03-22 |

### Baja

| ID | Descripcion | Impacto | Esfuerzo | Estado | Fecha |
|----|-------------|---------|----------|--------|-------|
| DT-008 | Configuracion de Memcached como fallback de Redis | Dos sistemas de cache con configuracion adicional; Redis deberia ser suficiente | XS | Identificado | 2026-03-22 |
| DT-009 | CKEditor integrado en modelos y uploaders (area legacy) | CKEditor 4.x tiene soporte limitado; migracion a editor alternativo podria ser necesaria | M | Identificado | 2026-03-22 |

---

## Detalle de Items de Alta Prioridad

### DT-001: CI/CD con Travis CI obsoleto

- **Severidad**: Alta
- **Categoria**: Infraestructura
- **Impacto**: Los tests no se ejecutan automaticamente en cada PR. Sin gating de calidad automatizado, los bugs pueden llegar a produccion sin deteccion.
- **Esfuerzo estimado**: S (1-2 dias)
- **Estado**: Identificado
- **Fecha de registro**: 2026-03-22
- **Responsable**: —
- **Notas**: La migracion mas logica es a GitHub Actions, dado que el repositorio esta en GitHub. El archivo `.travis.yml` actual apunta a Ruby 2.1.2 y esta completamente desactualizado. Ver plantilla de GitHub Actions para Rails + MongoDB como punto de partida.

**Plan de resolucion**:
1. Crear `.github/workflows/ci.yml` con Ruby 3.2.8, MongoDB y el comando `rails test`.
2. Verificar que el pipeline pasa en una rama de prueba.
3. Desactivar Travis CI en la configuracion del repositorio.

### DT-002: Sin linter configurado (RuboCop)

- **Severidad**: Alta
- **Categoria**: Calidad de codigo
- **Impacto**: Sin enforcement automatico de estilos, la consistencia del codigo depende exclusivamente de las revisiones manuales. Aumenta la carga cognitiva en los code reviews.
- **Esfuerzo estimado**: S (1-2 dias)
- **Estado**: Identificado
- **Fecha de registro**: 2026-03-22
- **Notas**: Agregar `rubocop`, `rubocop-rails` y `rubocop-minitest` al Gemfile. Configurar con el preset `rubocop --auto-gen-config` para aceptar el estado actual del codigo y activar progresivamente. Integrar en el pipeline de CI.

---

## Proceso de Gestion de Deuda Tecnica

### Identificacion

Cualquier miembro del equipo puede identificar y registrar deuda tecnica:

1. Agregar una entrada a este documento con el siguiente ID disponible.
2. Completar todos los campos del formato.
3. Abrir un PR con la etiqueta `tech-debt`.
4. Si es critica, notificar al tech lead inmediatamente.

### Revision Trimestral

Cada trimestre, el equipo realiza una revision de deuda tecnica:

1. Revisar el inventario: actualizar estados, eliminar items resueltos.
2. Evaluar nuevos items: priorizar y asignar severidad.
3. Planificar resolucion: seleccionar items para el proximo trimestre.
4. Metricas: numero de items por severidad, items resueltos vs. nuevos.

### Criterios de Priorizacion

1. **Riesgo**: Items que pueden causar incidentes en produccion tienen prioridad maxima.
2. **Frecuencia de impacto**: Deuda en areas del codigo que se modifican frecuentemente.
3. **Esfuerzo vs. beneficio**: Preferir items de alto beneficio y bajo esfuerzo.
4. **Dependencias**: Items que bloquean o facilitan otros trabajos.

### Regla del Boy Scout

> "Dejar el codigo mejor de como lo encontraste."

Si trabajas en un area con deuda tecnica de severidad Baja o Media, intenta resolverla como parte de tu cambio actual — siempre que no aumente significativamente el tamano del PR ni introduzca riesgo adicional.

---

## Prevencion de Deuda Tecnica

Para minimizar la acumulacion de deuda tecnica en ufo-hunters.com:

- Seguir las [convenciones de codigo](convenciones-codigo.md) del proyecto.
- Escribir tests Minitest para toda funcionalidad nueva (ver [estrategias de testing](estrategias-testing.md)).
- Realizar code reviews rigurosos (ver [como revisar PRs](como-revisar-pull-requests.md)).
- Mantener las gemas actualizadas con `bundle outdated` periodicamente.
- Documentar decisiones de diseno en los [ADRs](decisiones-de-diseno.md).
- Cuando se tome deuda tecnica conscientemente, registrarla inmediatamente en este documento.

---

## Formato de Registro

Cada item de deuda tecnica sigue este formato:

| Campo | Descripcion |
|-------|-------------|
| **ID** | Identificador unico (DT-001, DT-002, etc.) |
| **Descripcion** | Resumen claro del problema |
| **Severidad** | Critica / Alta / Media / Baja |
| **Impacto** | Que areas o funcionalidades se ven afectadas |
| **Esfuerzo Estimado** | XS (horas), S (1-2 dias), M (3-5 dias), L (1-2 semanas), XL (mas de 2 semanas) |
| **Estado** | Identificado / Planificado / En Progreso / Resuelto / Descartado |
| **Fecha de Registro** | Cuando se identifico |
| **Responsable** | Quien esta asignado (si aplica) |
| **Notas** | Contexto adicional, plan de resolucion |

---

> La deuda tecnica no es inherentemente mala — a veces es una decision consciente y valida. Lo importante es registrarla, gestionarla y no perder el control.
