import { Controller } from "@hotwired/stimulus"

const STYLES = {
  dark: 'https://tiles.openfreemap.org/styles/dark',
  light: 'https://tiles.openfreemap.org/styles/positron'
}

export default class extends Controller {
  static values = {
    geojson: String,
    center: { type: Array, default: [-40.57, 34.16] },
    zoom: { type: Number, default: 2 }
  }

  connect() {
    this.currentStyle = localStorage.getItem('mapStyle') || 'dark'

    this.map = new maplibregl.Map({
      container: this.element,
      style: STYLES[this.currentStyle],
      center: this.centerValue,
      zoom: this.zoomValue
    })
    this.map.addControl(new maplibregl.NavigationControl())

    this._addToggleButton()
    this._addMarkers()
    this.map.on('style.load', () => this._addMarkers())
  }

  disconnect() {
    if (this.map) {
      this.map.remove()
      this.map = null
    }
  }

  _addMarkers() {
    if (this.markers) this.markers.forEach(m => m.remove())
    this.markers = []

    if (!this.hasGeojsonValue || !this.geojsonValue) return

    try {
      const geojson = JSON.parse(this.geojsonValue)
      geojson.features.forEach(feature => {
        const marker = new maplibregl.Marker({ color: '#D7DF21' })
          .setLngLat(feature.geometry.coordinates)
          .setPopup(new maplibregl.Popup({ offset: 25 })
            .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>'))
          .addTo(this.map)
        this.markers.push(marker)
      })
    } catch (e) {
      console.warn('Map geojson parse error:', e.message)
    }
  }

  _addToggleButton() {
    const btn = document.createElement('button')
    btn.textContent = this.currentStyle === 'dark' ? '☀' : '☾'
    btn.title = 'Toggle map style'
    btn.style.cssText = 'position:absolute;top:10px;right:50px;z-index:1;background:#1a1a2e;color:#D7DF21;border:1px solid #D7DF21;border-radius:4px;width:30px;height:30px;cursor:pointer;font-size:16px;line-height:1;'
    this.element.style.position = 'relative'
    this.element.appendChild(btn)

    btn.addEventListener('click', () => {
      this.currentStyle = this.currentStyle === 'dark' ? 'light' : 'dark'
      localStorage.setItem('mapStyle', this.currentStyle)
      btn.textContent = this.currentStyle === 'dark' ? '☀' : '☾'
      this.map.setStyle(STYLES[this.currentStyle])
    })
  }
}
