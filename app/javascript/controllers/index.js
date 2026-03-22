import { application } from "./application"

import NavbarController from "./navbar_controller"
application.register("navbar", NavbarController)

import CookieConsentController from "./cookie_consent_controller"
application.register("cookie-consent", CookieConsentController)
