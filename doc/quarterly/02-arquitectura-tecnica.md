# Arquitectura Tecnica — Reporte Trimestral — UFO Hunters Site

**Proyecto**: ufo-hunters.com
**Periodo**: [Q1/Q2/Q3/Q4] [AÑO]
**Fecha del Reporte**: [FECHA]
**Stack**: Ruby 3.2.8 / Rails 8.0.2 / MongoDB (Mongoid 9.0)
**Arquitectura**: MVC monolith

---

## Cambios de Arquitectura Este Trimestre

### Resumen de Cambios

| # | Cambio | Tipo | Impacto | ADR Relacionado |
|---|--------|------|---------|-----------------|
| 1 | [Descripcion del cambio] | [Nuevo / Modificacion / Eliminacion] | [Alto / Medio / Bajo] | [ADR-XXX o N/A] |
| 2 | [Descripcion del cambio] | [Nuevo / Modificacion / Eliminacion] | [Alto / Medio / Bajo] | [ADR-XXX o N/A] |

### Detalle de Cambios Significativos

#### Cambio 1: [Titulo]

- **Contexto**: Por que se necesitaba este cambio.
- **Que se hizo**: Descripcion tecnica del cambio.
- **Resultado**: Impacto medible del cambio.
- **Riesgos**: Riesgos introducidos o mitigados.

---

## Nuevos Componentes y Servicios

### Componentes Agregados

| Componente | Proposito | Tecnologia | Dependencias |
|------------|-----------|------------|--------------|
| [Nombre] | [Para que sirve] | [Stack utilizado] | [De que depende] |

### Componentes Modificados

| Componente | Cambio Realizado | Razon | Impacto en Otros Componentes |
|------------|-----------------|-------|------------------------------|
| [Nombre] | [Que se modifico] | [Por que] | [Que otros componentes se ven afectados] |

### Componentes Deprecados o Eliminados

| Componente | Razon de Eliminacion | Reemplazo | Fecha |
|------------|---------------------|-----------|-------|
| Travis CI (`.travis.yml`) | Configuracion obsoleta con Ruby 2.1.2; no ejecutaba tests | GitHub Actions (`.github/workflows/ci.yml`) | 2026-03-22 |
| Memcached (MEMCACHEDCLOUD) | Cache redundante; Redis es suficiente en produccion | Redis (`REDIS_URL`) | 2026-03-22 |

---

## Decisiones Tecnicas del Trimestre

### Decisiones Tomadas

| ADR | Titulo | Estado | Impacto |
|-----|--------|--------|---------|
| ADR-[XXX] | [Titulo de la decision] | [Aceptado / En discusion] | [Descripcion breve del impacto] |

### Decisiones Pendientes

| Tema | Contexto | Opciones | Fecha Estimada |
|------|----------|----------|----------------|
| [Tema pendiente] | [Contexto] | [Opciones] | [Fecha] |

---

## Mejoras de Rendimiento

### Mejoras Implementadas

| Area | Metrica | Antes | Despues | Mejora |
|------|---------|-------|---------|--------|
| [Componente/endpoint] | [Latencia/throughput] | [Valor anterior] | [Valor actual] | [% de mejora] |

### Cuellos de Botella Identificados

| Area | Problema | Severidad | Plan de Accion |
|------|----------|-----------|----------------|
| Queries MongoDB sin indice | Queries de filtrado por pais sin indice adecuado pueden ser lentas con alto volumen de datos | Media | Revisar y agregar indices en modelos `Countries` y `Report` |
| [Componente] | [Descripcion del problema] | [Alta / Media / Baja] | [Que se hara] |

### Optimizaciones de MongoDB

- Indices 2dsphere en `Report.coordinates` y `Countries.geometry` para queries geoespaciales del mapa.
- Indice en `Report.status` + `created_at` para el listado principal paginado.
- Indice de texto en `Report.description` y `Report.location` para busqueda de texto.
- [Optimizacion adicional del trimestre si aplica]

---

## Actualizaciones de Seguridad

### Vulnerabilidades Abordadas

| # | Vulnerabilidad | Severidad | Componente | Resolucion | Fecha |
|---|---------------|-----------|------------|------------|-------|
| 1 | [Descripcion o CVE] | [Critica / Alta / Media / Baja] | [Gema/componente] | [Como se resolvio] | [Fecha] |

### Auditorias de Seguridad

- **Ultima auditoria de dependencias con `bundle audit`**: [Fecha]
- **Vulnerabilidades conocidas pendientes**: [Numero]
- **Plan de remediacion**: Ejecutar `bundle audit` semanalmente y actualizar gemas con vulnerabilidades conocidas.

### Actualizaciones de Dependencias

| Dependencia | Version Anterior | Version Actual | Razon del Upgrade |
|-------------|-----------------|----------------|-------------------|
| Rails | [X.Y.Z] | [A.B.C] | [Seguridad / Features / Bugs] |
| Mongoid | [X.Y.Z] | [A.B.C] | [Razon] |
| [Otra gema] | [X.Y.Z] | [A.B.C] | [Razon] |

---

## Estado de la Deuda Tecnica

| Severidad | Inicio de Trimestre | Items Resueltos | Items Nuevos | Fin de Trimestre |
|-----------|--------------------|-----------------|--------------|--------------------|
| Critica | 0 | 0 | 0 | 0 |
| Alta | 3 (DT-001, DT-002, DT-003) | 2 (DT-001, DT-002) | 0 | 1 (DT-003) |
| Media | 7 (DT-004 a DT-007, DT-010 a DT-012) | 4 (DT-004, DT-005, DT-010, DT-011) | 0 | 3 (DT-006, DT-007 resuelto, DT-012) |
| Baja | 2 (DT-008, DT-009) | 1 (DT-008) | 0 | 1 (DT-009) |
| **Total** | **12** | **7** | **0** | **5** |

Para el detalle completo, ver [deuda-tecnica.md](../deuda-tecnica.md).

---

## Diagrama de Arquitectura Actual

```
Usuarios
   │ HTTPS
   ▼
Heroku Dynos (Puma 6.x + Rails 8.0.2)
   │
   ├── SightingsController    → MongoDB (Report collection, 2dsphere index)
   ├── ReportsController      → MongoDB + Cloudinary (imagenes)
   ├── ArticlesController     → MongoDB (Article collection)
   ├── SessionsController     → MongoDB (User collection, bcrypt)
   ├── StatsController        → MongoDB (Report, Countries) → JSON para Google Maps
   └── ErrorsController       → Renders 404/422/500
   │
   ├── MongoDB Atlas (ufosightings / sightings_test)
   ├── Redis (cache en produccion via REDIS_URL)
   ├── Cloudinary (imagenes via CarrierWave)
   ├── SendGrid (email via ActionMailer)
   ├── New Relic (APM)
   └── reCAPTCHA (proteccion formularios publicos)

Frontend:
   Propshaft + Import Maps + Turbo + Stimulus + Tailwind CSS 3.x + Google Maps API v3

CI/CD:
   GitHub Actions (.github/workflows/ci.yml)
   └── job test: Ruby 3.2.8 + MongoDB 7 service → rails test
   └── job lint: rubocop

Desarrollo local:
   docker-compose.yml → MongoDB 7 (27017) + Redis 7 Alpine (6379)
```

Ver diagrama completo en [arquitectura.md](../arquitectura.md).

---

## Planes Tecnicos para el Proximo Trimestre

### Cambios de Arquitectura Planificados

1. [Cambio planificado 1: Descripcion y justificacion]
2. [Cambio planificado 2: Descripcion y justificacion]

### Mejoras de Rendimiento Planificadas

1. Revisar y optimizar queries MongoDB que no usan indices (analizar con `explain()`).
2. [Mejora planificada 2: Objetivo medible]

### Actualizaciones de Seguridad Pendientes

1. Ejecutar `bundle audit` y actualizar gemas con vulnerabilidades conocidas.
2. Revisar configuracion de CORS y CSP headers en Rails 8.

### Reduccion de Deuda Tecnica

Items priorizados para el proximo trimestre (ver [deuda-tecnica.md](../deuda-tecnica.md)):

1. DT-012: Configurar system tests con Capybara
2. DT-006: Mejorar cobertura en areas legacy

---

> Para la vision completa de la arquitectura, consultar [arquitectura.md](../arquitectura.md). Para decisiones de diseno, consultar [decisiones-de-diseno.md](../decisiones-de-diseno.md).
