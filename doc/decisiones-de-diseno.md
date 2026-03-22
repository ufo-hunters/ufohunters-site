# Decisiones de Diseno (ADRs) — UFO Hunters Site

## Que son los Architecture Decision Records (ADRs)

Los ADRs son documentos breves que registran decisiones arquitectonicas y de diseno significativas tomadas durante el desarrollo de **ufo-hunters.com**. Su proposito es:

- **Documentar el contexto**: Por que se tomo la decision en ese momento.
- **Preservar el razonamiento**: Que alternativas se consideraron y por que se descartaron.
- **Facilitar la incorporacion**: Nuevos miembros del equipo pueden entender las decisiones pasadas sin preguntar.
- **Evitar revisitar decisiones**: Si el contexto no ha cambiado, no hay razon para rediscutir.
- **Identificar cuando cambiar**: Si el contexto cambio, el ADR ayuda a entender si la decision sigue siendo valida.

---

## Formato de un ADR

Cada ADR debe seguir esta estructura:

```markdown
# ADR-[NUMERO]: [TITULO]

**Fecha**: YYYY-MM-DD
**Estado**: [Propuesto | Aceptado | Deprecado | Sustituido por ADR-XXX]
**Autores**: [Nombre(s)]

## Contexto

Describir la situacion, el problema o la necesidad que motiva esta decision.

## Decision

Describir la decision tomada de forma clara y concisa.

## Alternativas Consideradas

### Alternativa 1: [Nombre]
- **Descripcion**: Breve descripcion.
- **Ventajas**: Puntos a favor.
- **Desventajas**: Puntos en contra.
- **Razon de descarte**: Por que no se eligio.

## Consecuencias

### Positivas
- Beneficios esperados de la decision.

### Negativas
- Costos, riesgos o trade-offs aceptados.

### Neutras
- Efectos secundarios que no son claramente positivos ni negativos.

## Referencias

- Links a documentacion, articulos o discusiones relevantes.
```

---

## Como Crear un Nuevo ADR

1. **Identificar la necesidad**: Una decision es candidata a ADR cuando afecta la estructura del sistema, involucra la eleccion de una tecnologia, cambia un patron establecido, o tiene implicaciones a largo plazo.
2. **Escribir el ADR**: Usar la plantilla. Estado inicial: `Propuesto`.
3. **Revisarlo en equipo**: Compartir en un PR para discusion.
4. **Aprobar y registrar**: Una vez aprobado, cambiar estado a `Aceptado` y agregar al indice.
5. **Actualizar si es necesario**: Si la decision cambia, marcar el original como `Deprecado` o `Sustituido por ADR-XXX` y crear un nuevo ADR.

---

## Indice de Decisiones

| ADR | Titulo | Estado | Fecha |
|-----|--------|--------|-------|
| [ADR-001](#adr-001-mongodb-como-base-de-datos-principal) | MongoDB como base de datos principal | Aceptado | (inicio del proyecto) |
| [ADR-002](#adr-002-rails-mvc-monolith-sobre-microservicios) | Rails MVC monolith sobre microservicios | Aceptado | (inicio del proyecto) |
| [ADR-003](#adr-003-autenticacion-custom-sin-devise) | Autenticacion custom sin Devise | Aceptado | (inicio del proyecto) |
| [ADR-004](#adr-004-propshaft--import-maps-sobre-webpackesbuild) | Propshaft + Import Maps sobre Webpack/esbuild | Aceptado | (upgrade a Rails 8) |
| [ADR-005](#adr-005-hotwire-turbo--stimulus-sobre-spa) | Hotwire (Turbo + Stimulus) sobre SPA | Aceptado | (upgrade a Rails 8) |
| [ADR-006](#adr-006-cloudinary-para-almacenamiento-de-imagenes) | Cloudinary para almacenamiento de imagenes | Aceptado | (decision historica) |

---

## ADR-001: MongoDB como Base de Datos Principal

**Fecha**: (inicio del proyecto, era Rails 3)
**Estado**: Aceptado
**Autores**: Equipo original de ufo-hunters.com

### Contexto

El proyecto necesita almacenar datos de avistamientos de OVNIs que incluyen coordenadas geograficas, formas, duraciones, descripciones y multiples imagenes. Los datos tienen estructura variable (no todos los campos aplican a todos los avistamientos) y se requieren queries geoespaciales para los mapas interactivos.

### Decision

Usaremos MongoDB como unica base de datos persistente, con Mongoid como ODM. Se usaran indices 2dsphere para las queries geoespaciales del mapa.

### Alternativas Consideradas

#### PostgreSQL con PostGIS
- **Ventajas**: Soporte maduro de geoespacial, transacciones ACID, ecosistema SQL.
- **Desventajas**: Esquema rigido para datos variables; PostGIS agrega complejidad operacional.
- **Razon de descarte**: La flexibilidad del modelo de documentos era prioritaria para el tipo de datos del proyecto.

#### MySQL
- **Ventajas**: Familiar, amplio soporte de hosting.
- **Desventajas**: Sin soporte nativo de geoespacial avanzado, esquema rigido.
- **Razon de descarte**: No cumple los requisitos geoespaciales sin plugins adicionales.

### Consecuencias

#### Positivas
- Modelo de documentos flexible para datos de avistamientos con estructura variable.
- Soporte nativo de 2dsphere para queries geoespaciales eficientes.
- Embedding de documentos para datos relacionados (imagenes dentro del report).

#### Negativas
- Sin transacciones multi-documento por defecto (Mongoid 9 soporta transacciones limitadas).
- Los fixtures de Rails son incompatibles con Mongoid: requiere helper methods propios para tests.
- No hay migraciones: cambios de esquema requieren manejo manual de documentos existentes.
- Menor ecosistema de gemas Rails compatible con Mongoid vs. ActiveRecord.

#### Neutras
- El esquema vive en los modelos (`field` declarations) en lugar de en `schema.rb`.

---

## ADR-002: Rails MVC Monolith sobre Microservicios

**Fecha**: (inicio del proyecto)
**Estado**: Aceptado
**Autores**: Equipo de ufo-hunters.com

### Contexto

El proyecto es una aplicacion web de contenido generado por usuarios con escala moderada. Se necesita un framework que permita desarrollo rapido con un equipo pequeno.

### Decision

Usaremos Rails como framework full-stack en arquitectura MVC monolith. No se dividira el sistema en microservicios.

### Consecuencias

#### Positivas
- Desarrollo rapido con una sola base de codigo.
- Ciclo de debug simple.
- Un solo pipeline de CI/CD y un solo despliegue.

#### Negativas
- Escalado menos granular que microservicios (escalar toda la aplicacion o nada).
- Si el proyecto crece mucho, puede convertirse en un monolito difícil de mantener.

---

## ADR-003: Autenticacion Custom sin Devise

**Fecha**: (decision historica, anterior a la popularizacion de Devise)
**Estado**: Aceptado
**Autores**: Equipo original

### Contexto

El proyecto necesita autenticacion de usuarios. En el momento de la decision inicial (Rails 3 era), la autenticacion custom era mas comun. La migracion a Devise nunca se realizo durante los upgrades de Rails.

### Decision

Mantenemos la autenticacion custom basada en sesiones con bcrypt (`has_secure_password`). El `SessionsController` gestiona manualmente login/logout. Los users usan `username` como `_id` del documento MongoDB.

### Alternativas Consideradas

#### Devise
- **Ventajas**: Funcionalidad completa (password reset, confirmacion de email, etc.), mantenido activamente.
- **Desventajas**: Requiere ActiveRecord o adaptacion a Mongoid (devise-mongoid). Migracion desde sistema existente con costo no trivial.
- **Razon de descarte**: El costo de migracion no ha justificado el beneficio en ningun ciclo de desarrollo hasta la fecha.

### Consecuencias

#### Negativas
- Funcionalidades como password reset, confirmacion de email y OAuth deben implementarse manualmente.
- Mas codigo de autenticacion a mantener.

---

## ADR-004: Propshaft + Import Maps sobre Webpack/esbuild

**Fecha**: (upgrade a Rails 8)
**Estado**: Aceptado
**Autores**: Equipo de ufo-hunters.com

### Contexto

Al actualizar a Rails 8, se evaluo la estrategia de assets. El proyecto no tiene necesidades de bundling JavaScript complejo (sin TypeScript, sin JSX, sin modulos npm extensos).

### Decision

Usaremos Propshaft como asset pipeline y Import Maps para gestionar dependencias JavaScript. No se usa Webpack, esbuild ni Vite.

### Consecuencias

#### Positivas
- Sin paso de build para JavaScript.
- Configuracion mas simple que Webpack.
- Alineado con la direccion de Rails 8.

#### Negativas
- No es posible usar paquetes npm que requieran bundling (TypeScript, React, etc.) sin cambiar este setup.
- Import Maps requiere HTTP/2 para rendimiento optimo en produccion.

---

## ADR-005: Hotwire (Turbo + Stimulus) sobre SPA

**Fecha**: (upgrade a Rails 8)
**Estado**: Aceptado
**Autores**: Equipo de ufo-hunters.com

### Contexto

La mayoria de la interactividad del sitio (navegacion, formularios, actualizacion de listas) puede implementarse con Hotwire sin necesidad de un framework JavaScript de frontend completo.

### Decision

Usaremos Turbo Rails y Stimulus Rails para interactividad. No se introduce React, Vue ni Angular.

### Consecuencias

#### Positivas
- Renderizado en servidor: mejor SEO, menor tiempo de carga inicial.
- Menor complejidad de arquitectura.
- El equipo no necesita expertise en frontend frameworks.

#### Negativas
- Interacciones muy complejas (como un editor de mapas en tiempo real) son mas dificiles de implementar que con un SPA.

---

## ADR-006: Cloudinary para Almacenamiento de Imagenes

**Fecha**: (decision historica)
**Estado**: Aceptado
**Autores**: Equipo original

### Contexto

Los usuarios pueden subir imagenes de avistamientos. Las imagenes no deben almacenarse en el servidor de aplicacion (Heroku no tiene almacenamiento persistente).

### Decision

Usaremos Cloudinary para almacenamiento y CDN de imagenes, via la gema `cloudinary` integrada con CarrierWave y `carrierwave-mongoid`. MiniMagick gestiona el procesamiento previo.

### Consecuencias

#### Positivas
- CDN global para carga rapida de imagenes en todo el mundo.
- Transformaciones de imagen on-the-fly.
- Sin costos de almacenamiento en el servidor.

#### Negativas
- Dependencia de un servicio de terceros.
- Los tests deben mockear las llamadas a Cloudinary.

---

> Para proponer una nueva decision de diseno, crear un archivo ADR siguiendo la plantilla y abrir un PR con la etiqueta `adr`.
