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
  if ENV['REDIS_URL']
    config.cache_store = :redis_cache_store, { url: ENV['REDIS_URL'] }
  elsif ENV['MEMCACHEDCLOUD_SERVERS']
    config.cache_store = :mem_cache_store, ENV['MEMCACHEDCLOUD_SERVERS'].split(','),
                         { username: ENV.fetch('MEMCACHEDCLOUD_USERNAME', nil),
                           password: ENV.fetch('MEMCACHEDCLOUD_PASSWORD', nil) }
  end

  config.i18n.fallbacks = true

  config.action_mailer.default_url_options = { host: 'smtp.sendgrid.net' }
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.raise_delivery_errors = true
end
