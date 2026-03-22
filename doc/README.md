# Documentacion de UFO Hunters Site

Bienvenido a la documentacion oficial de **ufo-hunters.com**. Este repositorio contiene toda la informacion necesaria para entender, desarrollar, mantener y escalar el proyecto.

ufo-hunters.com es una aplicacion web publica que recoge, muestra y permite la interaccion comunitaria en torno a avistamientos de OVNIs de todo el mundo. Los usuarios pueden registrarse, publicar informes de avistamientos con datos de geolocalizacion, subir imagenes, explorar mapas interactivos, filtrar por pais y consultar estadisticas y galerias.

---

## Indice General

### Guias de Desarrollo
- [Setup de Desarrollo Local](setup-desarrollo-local.md) — Como configurar tu entorno de desarrollo desde cero.
- [Convenciones de Codigo](convenciones-codigo.md) — Estandares de codigo Ruby/Rails, naming, estructura y estilo.
- [Estrategias de Testing](estrategias-testing.md) — Filosofia de testing con Minitest, piramide de tests y cobertura.
- [Como Revisar Pull Requests](como-revisar-pull-requests.md) — Guia para realizar code reviews efectivos.

### Arquitectura y Diseno
- [Arquitectura del Sistema](arquitectura.md) — Vision general del sistema, componentes Rails/Mongoid y flujo de datos.
- [Decisiones de Diseno (ADRs)](decisiones-de-diseno.md) — Registro de decisiones arquitectonicas.
- [Deuda Tecnica](deuda-tecnica.md) — Inventario y seguimiento de deuda tecnica.

### Infraestructura
- [Infraestructura](infra/infraestructura.md) — Entornos, despliegue en Heroku/Docker, CI/CD y monitoring con New Relic.

### Reportes Trimestrales
- [Resumen Ejecutivo](quarterly/01-resumen-ejecutivo.md)
- [Arquitectura Tecnica](quarterly/02-arquitectura-tecnica.md)
- [Integracion](quarterly/03-integracion.md)
- [Roadmap de Implementacion](quarterly/04-roadmap-implementacion.md)

### Manuales de Usuario
- [Manual de Usuario](manuales-de-usuario/manual.md) — Guia para usuarios finales del sitio.

---

## Como Navegar esta Documentacion

La documentacion esta organizada en secciones tematicas. Dependiendo de tu rol, te recomendamos comenzar por:

| Rol | Seccion recomendada |
|-----|---------------------|
| Nuevo desarrollador | [Setup de Desarrollo Local](setup-desarrollo-local.md) y luego [Convenciones de Codigo](convenciones-codigo.md) |
| Revisor de codigo | [Como Revisar Pull Requests](como-revisar-pull-requests.md) |
| Arquitecto / Tech Lead | [Arquitectura](arquitectura.md) y [Decisiones de Diseno](decisiones-de-diseno.md) |
| Product Owner / Manager | [Reportes Trimestrales](quarterly/01-resumen-ejecutivo.md) |
| Ops / DevOps | [Infraestructura](infra/infraestructura.md) |
| Usuario final | [Manual de Usuario](manuales-de-usuario/manual.md) |

---

## Contribuir a la Documentacion

La documentacion es tan importante como el codigo. Si encuentras algo desactualizado, incompleto o incorrecto, por favor contribuye:

### Principios
1. **Mantener actualizada**: Cada cambio significativo en el codigo debe reflejarse en la documentacion.
2. **Ser conciso pero completo**: Evitar prosa innecesaria, pero no omitir informacion importante.
3. **Usar ejemplos**: Siempre que sea posible, incluir ejemplos de codigo Ruby/Rails o comandos reales.
4. **Escribir para el lector**: Pensar en quien va a leer el documento y que necesita saber.

### Proceso para Actualizar Documentacion
1. Crear una rama con el prefijo `docs/` (por ejemplo: `docs/actualizar-setup`).
2. Realizar los cambios en los archivos Markdown correspondientes.
3. Abrir un Pull Request con la etiqueta `documentation`.
4. Solicitar revision de al menos un miembro del equipo.
5. Mergear tras la aprobacion.

### Formato
- Usar Markdown estandar.
- Incluir encabezados jerarquicos (h1 para titulo, h2 para secciones, h3 para subsecciones).
- Usar bloques de codigo con el lenguaje especificado para syntax highlighting (`ruby`, `bash`, `javascript`).
- Incluir tablas cuando ayuden a organizar informacion comparativa.

---

## Informacion del Proyecto

| Campo | Valor |
|-------|-------|
| Proyecto | ufohunters-site |
| Lenguaje | Ruby 3.2.8 |
| Framework | Rails 8.0.2 |
| Base de datos | MongoDB (Mongoid 9.0) |
| Repositorio | git@github.com:ufo-hunters/ufohunters-site.git |

---

> Esta documentacion se genera y mantiene como parte del ciclo de desarrollo de ufo-hunters.com.
