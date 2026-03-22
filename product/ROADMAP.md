# Roadmap de Producto — ufohunters-site

## Vision del Producto

**ufo-hunters.com** es la plataforma de referencia para la comunidad hispanohablante e internacional de investigadores y entusiastas de avistamientos OVNI. Su mision es proporcionar un espacio riguroso, accesible y visualmente atractivo donde los usuarios puedan reportar, explorar y discutir avistamientos con datos geoespaciales reales, fomentando una comunidad activa y creible.

### Mision

Ser el repositorio comunitario de avistamientos OVNI mas completo y confiable, permitiendo a cualquier persona reportar un avistamiento con datos precisos de ubicacion, fecha y descripcion, y a cualquier visitante explorar el mapa global de reportes con filtros intuitivos.

### Principios Guia

1. **Valor para el usuario primero** — Cada feature debe resolver un problema real y medible de los visitantes o reporteros de la comunidad
2. **Calidad sobre velocidad** — Preferirnos entregar menos pero con la calidad correcta
3. **Iteracion continua** — Lanzar, medir, aprender y mejorar
4. **Transparencia** — El roadmap es visible para todo el equipo y se actualiza regularmente

---

## Objetivos por Trimestre

### Q1 2026 — Modernizacion y Estabilizacion

**Tema:** Actualizar la infraestructura tecnica y documentar el producto

| # | Objetivo | Metrica de exito | PRD asociado | Estado |
|---|----------|-------------------|--------------|--------|
| 1 | Migrar CI/CD de Travis CI (Ruby 2.1.2 stale) a GitHub Actions | Pipeline verde en cada PR | `UFO-PRD-001` | Draft |
| 2 | Configurar RuboCop/StandardRB para estandarizar el codigo | 0 ofensas en PR checks | — | Pendiente |
| 3 | Completar la documentacion tecnica del proyecto | doc/ generado y validado | — | Pendiente |
| 4 | Establecer metricas base de rendimiento con New Relic | Baseline de P95 documentado | — | Pendiente |

### Q2 2026 — Experiencia de Usuario

**Tema:** Mejorar el flujo de reporte y la experiencia de exploracion del mapa**

| # | Objetivo | Metrica de exito | PRD asociado | Estado |
|---|----------|-------------------|--------------|--------|
| 1 | Redisenar el formulario de reporte de avistamientos con validacion en tiempo real | Tasa de abandono del formulario < 20% | `UFO-PRD-002` | Pendiente |
| 2 | Mejorar la pagina de mapas con filtros avanzados (fecha, forma, pais) | Tiempo de sesion en mapa > 3 min | — | Pendiente |
| 3 | Implementar sistema de notificaciones para nuevos avistamientos en zona del usuario | N° de usuarios con notificaciones activas | — | Pendiente |

### Q3 2026 — Crecimiento de Comunidad

**Tema:** Aumentar la participacion y retener usuarios registrados

| # | Objetivo | Metrica de exito | PRD asociado | Estado |
|---|----------|-------------------|--------------|--------|
| 1 | Sistema de perfil de usuario con historial de reportes y articulos | DAU/MAU ratio > 20% | — | Pendiente |
| 2 | Moderacion de reportes: flujo de revision para reportes con estado | Tiempo de moderacion < 24h | — | Pendiente |

### Q4 2026 — Optimizacion y Escala

**Tema:** Optimizar rendimiento, reducir deuda tecnica y preparar el siguiente ciclo

| # | Objetivo | Metrica de exito | PRD asociado | Estado |
|---|----------|-------------------|--------------|--------|
| 1 | Optimizar queries MongoDB en listados de avistamientos | P95 < 200ms en /sightings | — | Pendiente |
| 2 | Implementar cache de Redis para el feed de estadisticas y mapa GeoJSON | Reduccion del 50% en tiempo de /map_json | — | Pendiente |

---

## Features Planificadas

### Alta Prioridad

| Feature | Descripcion | PRD | Trimestre | Esfuerzo estimado |
|---------|-------------|-----|-----------|-------------------|
| GitHub Actions CI | Reemplazar Travis CI stale con pipeline moderno (Ruby 3.2.8, Minitest, Docker) | `UFO-PRD-001` | Q1 2026 | Mediano |
| Formulario de reporte mejorado | Validacion en tiempo real, previsualizacion de ubicacion en mapa antes de enviar | `UFO-PRD-002` | Q2 2026 | Grande |

### Prioridad Media

| Feature | Descripcion | PRD | Trimestre | Esfuerzo estimado |
|---------|-------------|-----|-----------|-------------------|
| Filtros avanzados en mapa | Filtrar avistamientos por fecha, forma, duracion y pais directamente en el mapa | — | Q2 2026 | Mediano |
| Perfil de usuario | Historial personal de reportes y articulos publicados | — | Q3 2026 | Mediano |

### Exploratoria (Sujetas a validacion)

| Feature | Descripcion | Hipotesis a validar | Trimestre tentativo |
|---------|-------------|---------------------|---------------------|
| Notificaciones por zona | Alertas de nuevos reportes en el radio geografico del usuario | Los usuarios quieren saber de avistamientos en su area | Q2 2026 |
| API publica de avistamientos | Endpoint REST paginado para que terceros consuman los datos | Hay demanda de integraciones externas (investigadores, apps) | Q4 2026 |

---

## Dependencias

### Dependencias Internas

| Dependencia | Descripcion | Impacto | Responsable | Estado |
|-------------|-------------|---------|-------------|--------|
| CI/CD funcional | Sin pipeline automatico, los deploys a Heroku son manuales y riesgosos | Bloquea cualquier feature con tests | DevOps / Dev Lead | Pendiente |
| Linter configurado | Sin RuboCop, la calidad del codigo no se verifica automaticamente | Impacta mantenibilidad a largo plazo | Dev Lead | Pendiente |

### Dependencias Externas

| Dependencia | Descripcion | Impacto | Proveedor | Estado |
|-------------|-------------|---------|-----------|--------|
| MongoDB Atlas / MongoHQ | Base de datos principal en produccion | Critico — sin BD no hay sitio | MongoHQ/Atlas | Activo |
| Cloudinary | Almacenamiento de imagenes de reportes | Alto — imagenes de avistamientos | Cloudinary | Activo |
| Google Maps API | Mapas interactivos en frontend | Alto — funcionalidad de mapas | Google | Activo |
| SendGrid SMTP | Envio de correos (registro, notificaciones) | Medio | SendGrid | Activo |

---

## Riesgos

| ID | Riesgo | Probabilidad | Impacto | Mitigacion | Owner |
|----|--------|-------------|---------|------------|-------|
| R1 | Travis CI stale causa fallos en deploys por incompatibilidad de Ruby | Alta | Alto | Migrar a GitHub Actions en Q1 2026 como prioridad 1 | Dev Lead |
| R2 | Queries MongoDB sin optimizar causan degradacion con crecimiento de datos | Media | Alto | Profiling con New Relic en Q1; optimizacion en Q4 | Dev Lead |
| R3 | Dependencia de Travis CI desactualizado genera deuda tecnica acumulada | Alta | Medio | TDT creado, planificado para Q1 | TPM |
| R4 | Google Maps API depreca v3 o cambia precios | Baja | Alto | Monitorear anuncios de Google; evaluar alternativas (Leaflet + OpenStreetMap) | PO |
| R5 | Deuda tecnica acumulada (sin linter, sin CI) impacta velocidad de desarrollo | Alta | Medio | Reservar 20% de capacidad para TDTs cada sprint | TPM |

---

## Metricas del Producto

### Metricas de Negocio

| Metrica | Definicion | Baseline | Objetivo Q2 | Objetivo Q4 |
|---------|-----------|----------|-------------|-------------|
| Reportes de avistamiento enviados | N° de reportes nuevos por mes | — | _Por medir_ | +20% vs Q2 |
| Usuarios registrados activos | DAU en los ultimos 30 dias | — | _Por medir_ | +30% vs Q2 |
| Tiempo de sesion en mapa | Tiempo promedio en /sightings/maps | — | _Por medir_ | > 3 min |

### Metricas Tecnicas

| Metrica | Definicion | Baseline | Objetivo |
|---------|-----------|----------|----------|
| Tiempo de respuesta P95 | Percentil 95 de latencia en endpoints core | — | < 200ms |
| Disponibilidad | Uptime mensual en Heroku | — | 99.5% |
| Cobertura de tests | % de codigo cubierto por Minitest | — | > 70% |
| Deuda tecnica | Ratio TDTs abiertos / cerrados por sprint | — | < 1.0 |

---

## Historico de Actualizaciones

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-03-22 | Creacion inicial del roadmap de ufohunters-site | _[Autor]_ |

---

> **Nota:** Este roadmap se revisa al inicio de cada trimestre en la sesion de planificacion de producto. Los cambios entre trimestres deben ser aprobados por el Product Owner y comunicados al equipo.
