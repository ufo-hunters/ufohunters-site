# Indice de PRDs — ufohunters-site

## PRDs Activos

> Listado de todos los Product Requirements Documents del proyecto **ufohunters-site** (`UFO`).

| ID | Titulo | Estado | Owner | Epics | US completadas | Ultima actualizacion |
|----|--------|--------|-------|-------|----------------|---------------------|
| `UFO-PRD-001` | _[Titulo del primer PRD]_ | Draft | _[Asignar]_ | 0/0 | 0/0 | _[Fecha]_ |

---

## Por Estado

### Draft

PRDs en fase de redaccion inicial. Aun no han sido revisados ni aprobados.

_Ningun PRD en Draft actualmente._

### Ready

PRDs aprobados por el Product Owner. Listos para ser descompuestos en Epics y User Stories.

_Ningun PRD en Ready actualmente._

### In Progress

PRDs con Epics y/o User Stories en desarrollo activo.

_Ningun PRD In Progress actualmente._

### In Review

PRDs con todas las User Stories completadas. En fase de validacion final.

_Ningun PRD In Review actualmente._

### Done

PRDs completamente implementados, validados y cerrados.

_Ningun PRD Done actualmente._

### Archived

PRDs que fueron descartados, pospuestos indefinidamente o reemplazados.

_Ningun PRD Archived actualmente._

---

## Estadisticas

| Metrica | Valor |
|---------|-------|
| Total de PRDs | 0 |
| PRDs activos (Ready + In Progress) | 0 |
| PRDs completados | 0 |
| Tasa de completitud | — |
| Tiempo promedio de PRD (Draft a Done) | — |

---

## Como Crear un Nuevo PRD

1. Consulta la [guia de contribucion](../CONTRIBUTING.md) para el proceso completo
2. Usa el [template de PRD](template-prd.md) como base
3. Asigna el siguiente numero secuencial: `UFO-PRD-XXX`
4. Crea el directorio `UFO-PRD-XXX/` dentro de esta carpeta
5. Abre un PR con el formato: `[PRD] UFO-PRD-XXX: Titulo`

---

## Templates y Definiciones

### Templates (para crear nuevos artefactos)

| Template | Descripcion | Link |
|----------|-------------|------|
| Template PRD | Estructura base para un nuevo PRD | [template-prd.md](template-prd.md) |
| Template US | Estructura base para una nueva User Story | [template-us.md](template-us.md) |
| Template TC | Estructura base para una nueva Technical Card | [template-tc.md](template-tc.md) |

### Definiciones de artefactos (referencia)

| Artefacto | Descripcion | Link |
|-----------|-------------|------|
| PRD | Que es y como escribir un buen PRD | [artifact-prd.md](artifact-prd.md) |
| User Story | Formato, criterios y mejores practicas | [artifact-us.md](artifact-us.md) |
| Technical Card | Estructura y contenido tecnico | [artifact-tc.md](artifact-tc.md) |
| Product Debt Task | Deuda de producto | [artifact-pdt.md](artifact-pdt.md) |
| Technical Debt Task | Deuda tecnica | [artifact-tdt.md](artifact-tdt.md) |
| Enhancement | Mejoras puntuales | [artifact-enh.md](artifact-enh.md) |
| Estados | Ciclo de vida y transiciones | [artifact-estados.md](artifact-estados.md) |

---

## Estructura de un PRD

Cada PRD se almacena en su propio directorio con la siguiente estructura:

```
PRDs/
└── UFO-PRD-001/
    ├── README.md          # El PRD principal
    ├── US-001.1.1.md      # User Story 1 del Epic 1
    ├── US-001.1.2.md      # User Story 2 del Epic 1
    ├── TC-001.1.1.1.md    # Technical Card de la US 1.1.1
    └── assets/            # Diagramas, mockups, etc.
```

---

> **Mantenimiento:** Este indice debe actualizarse cada vez que se crea, cambia de estado o se archiva un PRD. Es responsabilidad del autor del cambio actualizar esta tabla.
