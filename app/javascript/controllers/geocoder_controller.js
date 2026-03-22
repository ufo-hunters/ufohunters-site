import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["map", "coord", "search", "results"]
  static values = {
    lat: { type: Number, default: 40.76 },
    lon: { type: Number, default: -73.98 },
    zoom: { type: Number, default: 7 }
  }

  connect() {
    this.map = new maplibregl.Map({
      container: this.mapTarget,
      style: 'https://tiles.openfreemap.org/styles/dark',
      center: [this.lonValue, this.latValue],
      zoom: this.zoomValue
    })
    this.map.addControl(new maplibregl.NavigationControl())
    this.marker = null

    this.map.on('click', (e) => {
      this.selectLocation(e.lngLat.lng, e.lngLat.lat)
    })
  }

  disconnect() {
    if (this.map) this.map.remove()
  }

  search() {
    clearTimeout(this._timeout)
    const q = this.searchTarget.value.trim()
    if (q.length < 3) {
      this.resultsTarget.classList.add('hidden')
      return
    }
    this._timeout = setTimeout(() => {
      fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(q) + '&limit=5')
        .then(r => r.json())
        .then(results => {
          if (results.length === 0) {
            this.resultsTarget.classList.add('hidden')
            return
          }
          this.resultsTarget.innerHTML = ''
          results.forEach(r => {
            const div = document.createElement('div')
            div.className = 'px-4 py-2 text-sm text-[#dfe2eb] hover:bg-[#262a31] cursor-pointer transition-colors'
            div.textContent = r.display_name
            div.addEventListener('click', () => {
              this.selectLocation(parseFloat(r.lon), parseFloat(r.lat))
              this.searchTarget.value = r.display_name
              this.resultsTarget.classList.add('hidden')
            })
            this.resultsTarget.appendChild(div)
          })
          this.resultsTarget.classList.remove('hidden')
        })
        .catch(e => console.warn('Geocoder:', e.message))
    }, 500)
  }

  selectLocation(lon, lat) {
    this.map.flyTo({ center: [lon, lat], zoom: 10 })
    if (this.marker) this.marker.remove()
    this.marker = new maplibregl.Marker({ color: '#D7DF21' })
      .setLngLat([lon, lat])
      .addTo(this.map)
    if (this.hasCoordTarget) {
      this.coordTarget.value = lon + ',' + lat
    }
  }
}
