# config/initializers/timeout.rb
Rails.application.config.middleware.insert_before Rack::Runtime, Rack::Timeout, service_timeout: 10
