# frozen_string_literal: true

Rails.application.config.secret_key_base = ENV.fetch('SECRET_KEY_BASE') do
  raise 'SECRET_KEY_BASE environment variable must be set in production' unless Rails.env.local?

  'a074c2e2d5d26e8a488dceb3dea3c5e6edccaa5e8b24ee512e522f3a60ef9c89' \
    '1d9853bc435918266dfd127032d27b0e3ac185e8417eb02c012eb78ea6bfc031'
end
