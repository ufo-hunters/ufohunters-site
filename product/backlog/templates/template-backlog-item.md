# UFO-[TIPO]-XXX: [Titulo descriptivo]

> **Tipo:** Selecciona uno y elimina los demas:
> - **PDT** (Product Debt Task) — Deuda de producto en ufo-hunters.com
> - **TDT** (Technical Debt Task) — Deuda tecnica en Rails / Mongoid / infra
> - **ENH** (Enhancement) — Mejora pequena en funcionalidad existente

---

## Metadatos

| Campo | Valor |
|-------|-------|
| **ID** | UFO-[PDT/TDT/ENH]-XXX |
| **Tipo** | _[PDT / TDT / ENH]_ |
| **Estado** | Draft |
| **Prioridad** | _[Critica / Alta / Media / Baja]_ |
| **Esfuerzo estimado** | _[S (1-2d) / M (3-5d) / L (1-2sem)]_ |
| **RICE Score** | _[Calculado: (R x I x C) / E]_ |
| **Area afectada** | _[Modulo o seccion: Mapas / Reportes / Articulos / CI-CD / Modelos Mongoid / etc.]_ |
| **Origen** | _[Feedback usuario / Code review / Analisis / Sprint retro / Monitoring New Relic / Observacion]_ |
| **Solicitado por** | _[Nombre de quien detecto o solicito]_ |
| **Asignado a** | _[Nombre del responsable o "Sin asignar"]_ |
| **Sprint** | _[Numero de sprint o "Sin asignar"]_ |
| **Proyecto** | ufohunters-site |
| **Stack** | Rails 8.0.2 / Ruby 3.2.8 / Mongoid 9.0 |

---

## Calculo RICE

| Factor | Valor | Justificacion |
|--------|-------|---------------|
| **Reach** (usuarios afectados/sprint) | _[N]_ | _[Como se estimo — visitantes, reporteros, etc.]_ |
| **Impact** (1=Medio, 2=Alto, 3=Masivo) | _[1/2/3]_ | _[Justificacion del impacto en ufo-hunters.com]_ |
| **Confidence** (0.5-1.0) | _[0.5/0.8/1.0]_ | _[Datos New Relic=1.0, Feedback cualitativo=0.8, Intuicion=0.5]_ |
| **Effort** (dias-persona) | _[N]_ | _[Desglose si es > 3 dias]_ |
| **RICE Score** | _[R x I x C / E]_ | — |

---

## Descripcion del Problema

_[Describir que esta mal, que es suboptimo, o que falta. Ser especifico y medible. Para PDT: desde la perspectiva del usuario de ufo-hunters.com. Para TDT: desde la perspectiva tecnica de Rails/Mongoid. Para ENH: que se quiere mejorar y por que.]_

---

## Situacion Actual

_[Como funciona o se ve actualmente en ufo-hunters.com. Incluir capturas de pantalla, metricas de New Relic, logs o ejemplos concretos si es posible.]_

---

## Situacion Deseada

_[Como deberia funcionar o verse despues del cambio. Ser especifico sobre el resultado esperado.]_

---

## Impacto

_[Completar la seccion que corresponda al tipo de artefacto y eliminar las demas.]_

### Para PDT (Product Debt Task)

- **Usuarios afectados:** _[Cuantos y de que tipo: visitantes del mapa, reporteros, lectores de articulos]_
- **Frecuencia del problema:** _[Cada cuanto se encuentran con esto en ufo-hunters.com]_
- **Severidad para el usuario:** _[Frustrante / Confuso / Bloqueante / Estetico]_
- **Impacto en metricas de producto:** _[Afecta tasa de reporte, tiempo en el mapa, registros]_

### Para TDT (Technical Debt Task)

- **En velocidad de desarrollo:** _[Como afecta la productividad del equipo en el codebase Rails/Mongoid]_
- **En estabilidad del sistema:** _[Causa errores, caidas en Heroku, inconsistencias en MongoDB?]_
- **En seguridad:** _[Hay riesgo de vulnerabilidad? CVE conocido en dependencia?]_
- **En rendimiento:** _[Tiempos de respuesta New Relic, consumo de recursos MongoDB, escalabilidad]_
- **En mantenibilidad:** _[Cuanto cuesta cada cambio en esta area del codebase?]_

### Para ENH (Enhancement)

- **Valor para el usuario:** _[Que mejora en su experiencia en ufo-hunters.com]_
- **Usuarios beneficiados:** _[Cuantos y de que tipo]_
- **Impacto en metricas:** _[Que metricas mejoran]_

---

## Solucion Propuesta

_[Describir la solucion a alto nivel en el contexto de Rails / Mongoid / Hotwire.]_

### Pasos de implementacion

1. _[Paso 1 — e.g., Modificar modelo Mongoid Report]_
2. _[Paso 2 — e.g., Actualizar SightingsController]_
3. _[Paso 3 — e.g., Actualizar vista ERB / Stimulus controller]_

### Riesgos de la implementacion

| Riesgo | Probabilidad | Mitigacion |
|--------|-------------|------------|
| _[Riesgo 1]_ | _[Alta/Media/Baja]_ | _[Plan de mitigacion]_ |
| _[Riesgo 2]_ | _[Alta/Media/Baja]_ | _[Plan de mitigacion]_ |

---

## Criterios de Aceptacion

- [ ] _[Criterio verificable 1]_
- [ ] _[Criterio verificable 2]_
- [ ] _[Criterio verificable 3]_
- [ ] No se introducen regresiones (todos los tests Minitest pasan: `rails test`)
- [ ] _[Criterio adicional especifico del tipo de artefacto]_

### Criterios adicionales por tipo

**Para PDT:**
- [ ] La experiencia de usuario cumple el estandar visual de ufohunters-site (Tailwind CSS)
- [ ] El PO ha validado el cambio en staging (Heroku)

**Para TDT:**
- [ ] Las metricas tecnicas mejoran segun lo definido en "Situacion Deseada"
- [ ] La documentacion tecnica se actualiza si hay cambios de arquitectura Rails o modelos Mongoid
- [ ] La cobertura de tests Minitest se mantiene o mejora

**Para ENH:**
- [ ] La funcionalidad mejorada pasa todos los tests de regresion Minitest
- [ ] El PO ha validado la mejora en staging (Heroku)

---

## Notas Tecnicas

_[Consideraciones de implementacion relevantes para Rails 8 / Mongoid 9 / Hotwire.]_

- **Archivos afectados:** _[Lista de archivos: controladores, modelos, vistas, tests]_
- **Cambios en Mongoid:** _[Nuevos fields o indices a agregar en los modelos]_
- **Componentes frontend:** _[Stimulus controllers, partials Turbo, clases Tailwind]_
- **Tests necesarios:** _[Que tests Minitest hay que crear o modificar]_
- **Migraciones:** _[Mongoid no usa migraciones SQL. Si hay cambios de schema, documentar fields e indices a agregar en los modelos]_

---

## Metricas de Mejora (para TDT)

_[Solo para TDT. Eliminar esta seccion para PDT y ENH.]_

| Metrica | Valor actual | Valor objetivo | Como medir |
|---------|-------------|----------------|------------|
| _[Metrica 1]_ | _[Actual — e.g., P95 de New Relic]_ | _[Objetivo]_ | _[New Relic / `rails test` / bundle audit]_ |
| _[Metrica 2]_ | _[Actual]_ | _[Objetivo]_ | _[Herramienta]_ |

---

## Dependencias

| Tipo | Referencia | Descripcion | Estado |
|------|-----------|-------------|--------|
| _[Bloqueada por / Bloquea a / Relacionada con]_ | _[ID artefacto UFO-XXX-NNN]_ | _[Descripcion]_ | _[Resuelta/Pendiente]_ |

_[Si no hay dependencias: "Sin dependencias identificadas."]_

---

## Historial

| Fecha | Cambio | Autor |
|-------|--------|-------|
| _[YYYY-MM-DD]_ | Creacion del artefacto | _[Nombre]_ |

---

> **Instrucciones de uso:**
> 1. Copia este template
> 2. Reemplaza `[TIPO]` por PDT, TDT o ENH
> 3. Asigna el siguiente numero secuencial disponible (revisar backlog/INDEX.md)
> 4. Rellena todas las secciones marcadas con _[cursiva]_
> 5. Elimina las secciones que no apliquen a tu tipo de artefacto
> 6. Elimina esta nota al finalizar
