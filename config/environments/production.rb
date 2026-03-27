# frozen_string_literal: true

require 'active_support/core_ext/integer/time'

Rails.application.configure do
  config.enable_reloading = false
  config.eager_load = true

  config.consider_all_requests_local = false
  config.action_controller.perform_caching = true

  config.public_file_server.enabled = ENV['RAILS_SERVE_STATIC_FILES'].present?

  config.force_ssl = true
  config.assume_ssl = true

  config.log_tags = [:request_id]
  config.log_level = ENV.fetch('RAILS_LOG_LEVEL', 'info')

  config.active_support.deprecation = :notify

  if ENV['RAILS_LOG_TO_STDOUT'].present?
    logger = ActiveSupport::Logger.new($stdout)
    logger.formatter = config.log_formatter
    config.logger = ActiveSupport::TaggedLogging.new(logger)
  end

  # Cache store
  redis_url = ENV['REDIS_URL'] || ENV['REDISCLOUD_URL']
  if redis_url.present?
    config.cache_store = :redis_cache_store, { url: redis_url }
  else
    config.cache_store = :null_store
  end

  config.i18n.fallbacks = true

  config.action_mailer.default_url_options = { host: ENV.fetch('APP_HOST', 'www.ufo-hunters.com') }
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.raise_delivery_errors = true
end
