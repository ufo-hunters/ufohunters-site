import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["slide"]
  static values = { interval: { type: Number, default: 5000 } }

  connect() {
    this.index = 0
    this.show(0)
    if (this.intervalValue > 0) {
      this.timer = setInterval(() => this.next(), this.intervalValue)
    }
  }

  disconnect() {
    if (this.timer) clearInterval(this.timer)
  }

  prev() {
    this.index = (this.index - 1 + this.slideTargets.length) % this.slideTargets.length
    this.show(this.index)
  }

  next() {
    this.index = (this.index + 1) % this.slideTargets.length
    this.show(this.index)
  }

  show(idx) {
    this.slideTargets.forEach((slide, i) => {
      slide.classList.toggle("hidden", i !== idx)
    })
  }
}
