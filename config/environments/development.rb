require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.enable_reloading = true
  config.eager_load = false

  config.consider_all_requests_local = true
  config.server_timing = true

  if Rails.root.join("tmp/caching-dev.txt").exist?
    config.action_controller.perform_caching = true
    config.cache_store = :redis_cache_store, { url: "redis://127.0.0.1:6379/0" }
  else
    config.action_controller.perform_caching = false
    config.cache_store = :null_store
  end

  config.active_support.deprecation = :log

  config.action_mailer.raise_delivery_errors = false
  config.action_mailer.perform_caching = false

  config.public_file_server.enabled = true
end
