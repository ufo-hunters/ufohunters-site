import { application } from "controllers/application"

import NavbarController from "controllers/navbar_controller"
application.register("navbar", NavbarController)

import CookieConsentController from "controllers/cookie_consent_controller"
application.register("cookie-consent", CookieConsentController)

import DatatableController from "controllers/datatable_controller"
application.register("datatable", DatatableController)

import CarouselController from "controllers/carousel_controller"
application.register("carousel", CarouselController)

import GeocoderController from "controllers/geocoder_controller"
application.register("geocoder", GeocoderController)
