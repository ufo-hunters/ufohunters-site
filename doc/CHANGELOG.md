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
- (Cambios nuevos que aun no se han publicado en una version)

### Cambiado
-

### Corregido
-

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
