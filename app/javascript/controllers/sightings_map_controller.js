import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    geojson: String,
    center: { type: Array, default: [-40.57, 34.16] },
    zoom: { type: Number, default: 2 }
  }

  connect() {
    this.map = new maplibregl.Map({
      container: this.element,
      style: 'https://tiles.openfreemap.org/styles/dark',
      center: this.centerValue,
      zoom: this.zoomValue
    })
    this.map.addControl(new maplibregl.NavigationControl())

    if (this.hasGeojsonValue && this.geojsonValue) {
      try {
        const geojson = JSON.parse(this.geojsonValue)
        geojson.features.forEach(feature => {
          const popup = new maplibregl.Popup({ offset: 25 })
            .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')

          new maplibregl.Marker({ color: '#D7DF21' })
            .setLngLat(feature.geometry.coordinates)
            .setPopup(popup)
            .addTo(this.map)
        })
      } catch (e) {
        console.warn('Map geojson parse error:', e.message)
      }
    }
  }

  disconnect() {
    if (this.map) {
      this.map.remove()
      this.map = null
    }
  }
}
