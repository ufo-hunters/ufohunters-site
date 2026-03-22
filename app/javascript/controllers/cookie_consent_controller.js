import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["banner", "privacy"]

  connect() {
    if (!this.getCookie("msgcookie")) {
      this.bannerTarget.classList.remove("hidden")
    }
  }

  accept(event) {
    event.preventDefault()
    this.setCookie("msgcookie", "accepted", 365)
    this.bannerTarget.classList.add("hidden")
  }

  showPrivacy(event) {
    event.preventDefault()
    this.privacyTarget.classList.remove("hidden")
  }

  hidePrivacy(event) {
    event.preventDefault()
    this.privacyTarget.classList.add("hidden")
  }

  getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(";").shift()
  }

  setCookie(name, value, days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`
  }
}
