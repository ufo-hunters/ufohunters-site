# Documentacion de API — UFO Hunters Site

ufo-hunters.com es una aplicacion HTML-first. **No tiene una API REST formal.** La unica salida JSON es el endpoint `GET /map_json`, que sirve datos GeoJSON para el mapa interactivo del frontend.

Este documento describe ese endpoint y establece la plantilla para documentar cualquier endpoint JSON que se agregue en el futuro.

---

## Endpoint Existente: GeoJSON del Mapa

### GET /map_json

**Descripcion**: Retorna un `GeoJSON FeatureCollection` con todos los avistamientos confirmados que tienen coordenadas geograficas. Es consumido por el JavaScript del frontend para renderizar los puntos en el mapa de Google Maps API v3.

**Autenticacion**: No requerida (endpoint publico).

**Permisos**: Ninguno — accesible por cualquier visitante.

#### Parametros de Query (opcionales)

| Parametro | Tipo | Requerido | Default | Descripcion |
|-----------|------|-----------|---------|-------------|
| `country` | string | No | — | Codigo ISO del pais para filtrar avistamientos |
| `region` | string | No | — | Region geografica (northamerica, europe, etc.) |

#### Respuesta Exitosa

**Codigo**: `200 OK`

**Content-Type**: `application/json`

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-3.7038, 40.4168]
      },
      "properties": {
        "id": "507f1f77bcf86cd799439011",
        "location": "Madrid, Espana",
        "shape": "circulo",
        "duration": "5 minutos",
        "date": "2024-11-15T21:30:00Z",
        "case_number": "UFO-2024-1234"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [2.3522, 48.8566]
      },
      "properties": {
        "id": "507f191e810c19729de860ea",
        "location": "Paris, Francia",
        "shape": "triangulo",
        "duration": "2 minutos",
        "date": "2024-10-22T03:15:00Z",
        "case_number": "UFO-2024-0987"
      }
    }
  ]
}
```

**Notas sobre el formato GeoJSON**:

- `coordinates` sigue el estandar GeoJSON: `[longitude, latitude]` (orden inverso al convencional lat/lng).
- Solo se incluyen avistamientos con `status: 'confirmed'` y coordenadas validas.
- El array `coordinates` en el modelo `Report` se almacena como `[longitude, latitude]` en MongoDB con indice 2dsphere.

#### Respuestas de Error

**500 Internal Server Error** — Error de conexion con MongoDB:

```json
{
  "error": "Internal server error"
}
```

#### Ejemplo de Uso

```javascript
// En el JavaScript del frontend (Google Maps)
fetch('/map_json')
  .then(response => response.json())
  .then(geojson => {
    // Agregar features al mapa de Google Maps
    geojson.features.forEach(feature => {
      const [lng, lat] = feature.geometry.coordinates;
      addMarker(lat, lng, feature.properties);
    });
  });
```

```bash
# Desde la linea de comandos
curl http://localhost:3000/map_json | jq '.features | length'
```

---

## Convencion para Futuros Endpoints JSON

Si se agregan endpoints JSON adicionales al proyecto, deben documentarse siguiendo esta plantilla:

---

### [METODO] /ruta/del/endpoint

**Descripcion**: Breve descripcion de lo que hace este endpoint.

**Autenticacion**: Requerida / No requerida

**Permisos**: [Lista de roles o condiciones]

#### Parametros de URL

| Parametro | Tipo | Requerido | Descripcion |
|-----------|------|-----------|-------------|
| `id` | string (MongoDB ObjectId) | Si | ID del documento |

#### Parametros de Query

| Parametro | Tipo | Requerido | Default | Descripcion |
|-----------|------|-----------|---------|-------------|
| `page` | integer | No | 1 | Numero de pagina |
| `per_page` | integer | No | 20 | Resultados por pagina |

#### Cuerpo de la Peticion (solo POST/PATCH/PUT)

**Content-Type**: `application/json`

```json
{
  "campo_requerido": "valor",
  "campo_opcional": "valor"
}
```

#### Respuesta Exitosa

**Codigo**: `200 OK` / `201 Created`

```json
{
  "id": "507f1f77bcf86cd799439011",
  "campo": "valor",
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### Respuestas de Error

**400 Bad Request** — Datos invalidos.

**401 Unauthorized** — Sesion no iniciada.

**404 Not Found** — Documento MongoDB no encontrado.

**422 Unprocessable Entity** — Validaciones de Mongoid fallidas.

```json
{
  "errors": {
    "location": ["can't be blank"],
    "description": ["is too short (minimum is 20 characters)"]
  }
}
```

---

## Notas sobre Autenticacion en Futuros Endpoints

ufo-hunters.com usa autenticacion custom basada en sesiones (no JWT ni OAuth). Para endpoints JSON que requieran autenticacion:

- La sesion debe estar activa (cookie de sesion de Rails).
- Los controladores verifican con `before_action :require_login`.
- No hay sistema de API tokens actualmente.

---

## Codigos de Estado HTTP Utilizados

| Codigo | Significado | Uso en este proyecto |
|--------|-------------|---------------------|
| 200 | OK | Peticion exitosa |
| 201 | Created | Documento MongoDB creado |
| 204 | No Content | Eliminacion exitosa |
| 400 | Bad Request | Parametros invalidos |
| 401 | Unauthorized | Sesion no iniciada |
| 403 | Forbidden | Sin permisos para el recurso |
| 404 | Not Found | `Mongoid::Errors::DocumentNotFound` |
| 422 | Unprocessable Entity | Validaciones de Mongoid fallidas |
| 500 | Internal Server Error | Error interno (MongoDB, etc.) |

---

> Para agregar un nuevo endpoint JSON, copiar la plantilla de este documento y completar cada seccion. Los endpoints JSON deben devolver `Content-Type: application/json` y manejar los errores de Mongoid (`DocumentNotFound`, errores de validacion) con los codigos HTTP apropiados.
