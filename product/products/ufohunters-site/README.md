# Producto: ufohunters-site

## Informacion General

| Campo | Valor |
|-------|-------|
| **Nombre** | ufohunters-site |
| **Prefijo de artefactos** | UFO |
| **Framework** | Rails 8.0.2 |
| **Lenguaje** | Ruby 3.2.8 |
| **Base de datos** | MongoDB (Mongoid 9.0) |
| **Frontend** | Hotwire (Turbo + Stimulus) + Tailwind CSS 3.x |
| **Deploy** | Docker + Heroku |
| **Repositorio** | git@github.com:ufo-hunters/ufohunters-site.git |
| **Product Owner** | _[Nombre del PO]_ |
| **Technical PM** | _[Nombre del TPM]_ |
| **Dev Lead** | _[Nombre del Dev Lead]_ |
| **Estado** | Activo |
| **Fecha de inicio** | _[Fecha de inicio del proyecto]_ |

---

## Descripcion

**ufo-hunters.com** es una plataforma publica de comunidad y contenido dedicada a la recopilacion, visualizacion e interaccion en torno a avistamientos de OVNIs de todo el mundo. La aplicacion permite a los usuarios registrarse y autenticarse (via sistema custom sin Devise), publicar articulos, reportar avistamientos OVNI con datos geoespaciales precisos (coordenadas, forma, duracion, descripcion), subir imagenes a Cloudinary, explorar mapas interactivos con Google Maps API v3, filtrar por region y pais, y consultar estadisticas y galerías.

El proyecto tiene un historial largo — originalmente construido en Rails 3 con Ruby 1.9 y progresivamente modernizado hasta Rails 8.0.2 / Ruby 3.2.8 con Hotwire y Propshaft. MongoDB permanece como la base de datos principal, aprovechando sus capacidades geoespaciales para los indices 2dsphere sobre coordenadas de avistamientos.

---

## PRDs del Producto

### Activos

| ID | Titulo | Estado | Owner | Progreso | Ultima actualizacion |
|----|--------|--------|-------|----------|---------------------|
| _Ninguno aun_ | — | — | — | — | — |

### Completados

| ID | Titulo | Fecha Done | Metricas cumplidas |
|----|--------|-----------|-------------------|
| _Ninguno aun_ | — | — | — |

### Archivados

| ID | Titulo | Motivo de archivo | Fecha |
|----|--------|-------------------|-------|
| _Ninguno aun_ | — | — | — |

---

## Epics en Curso

| ID | Titulo | PRD padre | US totales | US completadas | Estado |
|----|--------|-----------|------------|----------------|--------|
| _Ninguno aun_ | — | — | — | — | — |

---

## User Stories — Resumen

### Por estado

| Estado | Cantidad |
|--------|----------|
| Draft | _0_ |
| Ready | _0_ |
| In Progress | _0_ |
| In Review | _0_ |
| Done | _0_ |
| **Total** | **_0_** |

### Ultimas User Stories completadas

| ID | Titulo | Sprint | Fecha Done |
|----|--------|--------|-----------|
| _Ninguna aun_ | — | — | — |

### Proximas User Stories planificadas

| ID | Titulo | Sprint planificado | Asignado a | Estimacion |
|----|--------|--------------------|------------|------------|
| _Ninguna aun_ | — | — | — | — |

---

## Backlog del Producto

### Resumen

| Tipo | Abiertos | En progreso | Cerrados |
|------|----------|-------------|----------|
| User Stories | _0_ | _0_ | _0_ |
| Product Debt (PDT) | _0_ | _0_ | _0_ |
| Technical Debt (TDT) | _1_ | _0_ | _0_ |
| Enhancements (ENH) | _0_ | _0_ | _0_ |

### Items prioritarios

| Posicion | ID | Titulo | Tipo | RICE Score | Sprint tentativo |
|----------|----|--------|------|------------|------------------|
| 1 | `UFO-TDT-001` | Migrar CI/CD de Travis CI (stale) a GitHub Actions | TDT | _Por calcular_ | Sprint 1 |

> Dashboard completo: [backlog/INDEX.md](../../backlog/INDEX.md)

---

## Metricas del Producto

### Metricas de Negocio

| Metrica | Valor actual | Objetivo | Tendencia |
|---------|-------------|----------|-----------|
| Reportes de avistamiento por mes | _Por medir_ | _Por definir_ | — |
| Usuarios registrados activos (DAU/MAU) | _Por medir_ | _Por definir_ | — |
| Tiempo de sesion en mapa | _Por medir_ | > 3 min | — |

### Metricas de Desarrollo

| Metrica | Valor actual | Objetivo |
|---------|-------------|----------|
| Velocidad del equipo | _— items/sprint_ | _Tendencia creciente_ |
| Cycle time promedio (US) | _— dias_ | _< 10 dias_ |
| Tasa de rechazo en review | _—%_ | _< 20%_ |
| Cobertura de tests (Minitest) | _—%_ | _> 70%_ |
| Deuda tecnica (TDTs abiertos) | _1_ | _< 5_ |
| Deuda de producto (PDTs abiertos) | _0_ | _< 3_ |
| CI funcional | No (Travis CI stale) | Si (GitHub Actions) |

### Metricas de Calidad de Documentacion

| Metrica | Valor |
|---------|-------|
| PRDs con todas las secciones completas | _—%_ |
| US con DoR cumplido | _—%_ |
| Items stale (> 3 sprints sin movimiento) | _0_ |

---

## Arquitectura y Stack

### Stack tecnologico

| Componente | Tecnologia | Version |
|-----------|------------|---------|
| Framework | Rails | 8.0.2 |
| Lenguaje | Ruby | 3.2.8 |
| ODM | Mongoid | 9.0 |
| Base de datos | MongoDB | — |
| Cache | Redis | 5.x |
| Frontend JS | Hotwire (Turbo + Stimulus) + Import Maps | — |
| CSS | Tailwind CSS via tailwindcss-rails | 3.x |
| Asset pipeline | Propshaft | — |
| Images | Cloudinary via CarrierWave | — |
| Monitoring | New Relic | — |
| Email | SendGrid SMTP via ActionMailer | — |
| Geospatial | Google Maps API v3 + rgeo-geojson | — |
| Auth | Custom (bcrypt + sessions controller) | — |
| Hosting | Heroku | — |
| CI/CD | Travis CI (stale) → GitHub Actions (pendiente) | — |
| Test framework | Minitest | Rails default |

### Modelos Mongoid principales

| Modelo | Coleccion MongoDB | Descripcion |
|--------|------------------|-------------|
| `Report` | `ufo` | Avistamiento OVNI. Campo `coord` con indice 2dsphere. |
| `User` | `users` | Usuario autenticado. `_id` es el username. |
| `Article` | `articles` | Articulo publicado por un usuario. |
| `Countries` | `countries` | Fronteras geograficas de paises (geometria poligonal). |

### Diagramas

_[Links a diagramas de arquitectura, flujos del mapa, modelo de datos Mongoid, etc. — pendiente de crear en doc/]_

---

## Equipo

| Rol | Nombre | Dedicacion | Contacto |
|-----|--------|-----------|----------|
| Product Owner | _[Nombre]_ | _[% dedicacion]_ | _[Email/Slack]_ |
| Technical PM | _[Nombre]_ | _[% dedicacion]_ | _[Email/Slack]_ |
| Dev Lead | _[Nombre]_ | _[% dedicacion]_ | _[Email/Slack]_ |
| Developer | _[Nombre]_ | _[% dedicacion]_ | _[Email/Slack]_ |

---

## Links Rapidos

| Recurso | Link |
|---------|------|
| Roadmap del producto | [ROADMAP.md](../../ROADMAP.md) |
| Indice de PRDs | [PRDs/README.md](../../PRDs/README.md) |
| Dashboard del backlog | [backlog/INDEX.md](../../backlog/INDEX.md) |
| Guia de contribucion | [CONTRIBUTING.md](../../CONTRIBUTING.md) |
| Artefactos y glosario | [ARTEFACTOS-Y-GLOSARIO.md](../../ARTEFACTOS-Y-GLOSARIO.md) |
| Flujo de refinamiento | [procedures/flujo-refinamiento.md](../../procedures/flujo-refinamiento.md) |
| Repositorio de codigo | git@github.com:ufo-hunters/ufohunters-site.git |
| Board de tareas | _[URL de GitHub Projects / Linear / Jira]_ |
| Staging (Heroku) | _[URL del entorno de staging]_ |
| Produccion | https://ufo-hunters.com |
| New Relic APM | _[URL del dashboard de New Relic]_ |

---

## Historial

| Fecha | Evento | Autor |
|-------|--------|-------|
| 2026-03-22 | Creacion de la ficha del producto ufohunters-site | _[Nombre]_ |

---

> **Mantenimiento:** Esta ficha de producto se actualiza al inicio de cada sprint con el estado actual de PRDs, metricas y backlog. Es responsabilidad del TPM mantenerla al dia.
