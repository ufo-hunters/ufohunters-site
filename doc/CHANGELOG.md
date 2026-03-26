# Registro de Cambios (Changelog) — UFO Hunters Site

Todos los cambios relevantes de **ufo-hunters.com** se documentan en este archivo.

El formato esta basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/), y el proyecto adhiere a [Versionado Semantico](https://semver.org/lang/es/).

---

## Guia de Versionado

El proyecto ufo-hunters.com utiliza versionado semantico: **MAJOR.MINOR.PATCH**

| Componente | Cuando Incrementar | Ejemplo |
|------------|-------------------|---------|
| **MAJOR** | Cambios incompatibles con versiones anteriores (breaking changes, migraciones de datos) | 1.0.0 -> 2.0.0 |
| **MINOR** | Nueva funcionalidad compatible con versiones anteriores | 1.0.0 -> 1.1.0 |
| **PATCH** | Correcciones de errores compatibles con versiones anteriores | 1.0.0 -> 1.0.1 |

---

## Categorias de Cambios

Cada version agrupa sus cambios en las siguientes categorias:

- **Agregado** (`Added`): Nueva funcionalidad.
- **Cambiado** (`Changed`): Modificaciones en funcionalidad existente.
- **Deprecado** (`Deprecated`): Funcionalidad que sera eliminada en futuras versiones.
- **Eliminado** (`Removed`): Funcionalidad eliminada.
- **Corregido** (`Fixed`): Correcciones de errores.
- **Seguridad** (`Security`): Correcciones de vulnerabilidades.

---

## Como Actualizar este Archivo

1. Al preparar una nueva version, agregar una nueva seccion con el numero de version y la fecha.
2. Mover los items de `[Sin Publicar]` a la nueva version.
3. Categorizar cada cambio en la seccion correspondiente.
4. Incluir referencias a los issues o PRs relevantes.
5. Ser descriptivo pero conciso: el lector debe entender que cambio sin leer el codigo.

---

## [Sin Publicar]

### Agregado
- GitHub Actions CI con Ruby 3.2.8 + MongoDB 7 (jobs: test y lint)
- RuboCop con rubocop-rails, rubocop-minitest y rubocop-performance
- `docker-compose.yml` con MongoDB 7 y Redis 7 para desarrollo local
- SimpleCov para metricas de cobertura de tests (83.23%)
- 94 tests unitarios y funcionales con Minitest (112 assertions)
- Health check endpoint `/up` (Rails built-in)
- `.dockerignore` para reducir tamaño de imagen Docker
- Helper `sanitize_article` con allowlist para contenido HTML de artículos
- Helper `login_as` para tests de autenticación
- Indices de MongoDB para Article (status + published_date, user_id)

### Cambiado
- Dockerfile optimizado: multi-stage build, usuario non-root, sin build-essential en producción
- README reescrito para reflejar stack actual (Rails 8, Ruby 3.2.8, Tailwind, Mongoid 9)
- Cache de producción simplificado: solo Redis, fail-fast si `REDIS_URL` no está configurado
- Tests legacy migrados de Mongoid 3 API a Mongoid 9 (`Mongoid::Clients.default`)
- Tests funcionales migrados de action symbols a URL paths (API Rails 8)

### Eliminado
- Travis CI (`.travis.yml`) — reemplazado por GitHub Actions
- Memcached como fallback de cache en producción
- CKEditor: modelos, uploaders y `cktext_area` en formularios
- Fixtures de Rails (incompatibles con Mongoid)
- Test de performance obsoleto (`rails/performance_test_help`)
- Dead code: cache invalidation comments, SendGrid dead code en Notifier

### Corregido
- URL hardcodeada de ufo-hunters.com en helper `random_image`
- Minitest fijado a ~> 5.25 por incompatibilidad con 6.x en Rails 8
- `config/cable.yml` añadido para ActionCable en test

### Seguridad
- `html_safe` reemplazado por `sanitize` en todas las vistas de artículos y sightings
- Atributos `style` y `target` removidos del allowlist de sanitización
- Validación regex en render dinámico de partials (`partial_1`) para prevenir path traversal

---

<!-- Plantilla para nuevas versiones:

## [X.Y.Z] — YYYY-MM-DD

### Agregado
- Descripcion del cambio. ([#ISSUE](https://github.com/ufo-hunters/ufohunters-site/issues/ISSUE))

### Cambiado
- Descripcion del cambio. ([#ISSUE](https://github.com/ufo-hunters/ufohunters-site/issues/ISSUE))

### Deprecado
- Descripcion de lo que se depreco y que usar en su lugar.

### Eliminado
- Descripcion de lo que se elimino.

### Corregido
- Descripcion del bug corregido. ([#ISSUE](https://github.com/ufo-hunters/ufohunters-site/issues/ISSUE))

### Seguridad
- Descripcion de la vulnerabilidad corregida.

-->

## [8.0.0] — (Upgrade a Rails 8)

### Cambiado
- Upgrade de Rails a 8.0.2 y Ruby a 3.2.8 desde versiones anteriores.
- Migracion del asset pipeline de Sprockets a Propshaft.
- Introduccion de Import Maps (`importmap-rails`) en lugar de Webpack/esbuild.
- Adopcion de Turbo Rails y Stimulus Rails (Hotwire stack completo).
- Actualizacion de Mongoid a 9.0 para compatibilidad con Rails 8.
- Actualizacion de Puma a 6.x como servidor web.

### Agregado
- Soporte de Tailwind CSS 3.x via `tailwindcss-rails`.
- Dockerfile basado en `ruby:3.2.8-slim` para despliegue contenedorizado.
- Configuracion de Redis 5.x como cache store en produccion.

---

## Informacion del Proyecto

| Campo | Valor |
|-------|-------|
| Proyecto | ufohunters-site |
| Repositorio | git@github.com:ufo-hunters/ufohunters-site.git |
| Lenguaje | Ruby 3.2.8 |
| Framework | Rails 8.0.2 |

---

> Para contribuir, incluir los cambios relevantes en la seccion `[Sin Publicar]` como parte de cada Pull Request.
