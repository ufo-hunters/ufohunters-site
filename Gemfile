# frozen_string_literal: true

source 'https://rubygems.org'

ruby '3.2.8'

gem 'minitest', '~> 5.25'
gem 'rails', '~> 8.0.2'

# MongoDB
gem 'mongoid', '~> 9.0'

# Web server
gem 'puma', '~> 6.0'

# Security
gem 'bcrypt', '~> 3.1'
gem 'recaptcha', '~> 5.0'

# Asset pipeline
gem 'importmap-rails'
gem 'propshaft'
gem 'stimulus-rails'
gem 'turbo-rails'

# CSS
gem 'tailwindcss-rails', '~> 3.0'

# Image processing
gem 'carrierwave', '~> 3.0'
gem 'carrierwave-mongoid', require: 'carrierwave/mongoid'
gem 'cloudinary', '~> 2.0'
gem 'mini_magick', '~> 4.12'

# Caching
gem 'redis', '~> 5.0'

# GeoJSON
gem 'rgeo-geojson', '~> 2.0'

# Pagination
gem 'pagy', '~> 9.0'

# SEO
gem 'sitemap_generator', '~> 6.0'

# Monitoring
gem 'newrelic_rpm'

# Email
gem 'resend', '~> 0.17'

# Rate limiting
gem 'rack-attack'

# Boot speed
gem 'bootsnap', require: false

group :development, :test do
  gem 'capybara'
  gem 'debug'
  gem 'rubocop', require: false
  gem 'rubocop-minitest', require: false
  gem 'rubocop-performance', require: false
  gem 'rubocop-rails', require: false
  gem 'selenium-webdriver'
  gem 'simplecov', require: false
end

group :development do
  gem 'web-console'
end
