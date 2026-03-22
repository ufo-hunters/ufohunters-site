require_relative "boot"

require "action_controller/railtie"
require "action_view/railtie"
require "action_mailer/railtie"
require "active_job/railtie"
require "action_cable/engine"
require "rails/test_unit/railtie"

Bundler.require(*Rails.groups)

module Ufo
  THUMBS_URL_BASE = "http://img.youtube.com/vi/"
  MAX_PAGE_ITEMS = 5

  class Application < Rails::Application
    config.load_defaults 8.0

    config.encoding = "utf-8"
    config.filter_parameters += [:password]

    config.exceptions_app = self.routes
  end
end
