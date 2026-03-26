# frozen_string_literal: true

ActionMailer::Base.smtp_settings = {
  address: 'smtp.sendgrid.net',
  port: 587,
  domain: 'heroku.com',
  user_name: ENV.fetch('SENDGRID_USERNAME', nil),
  password: ENV.fetch('SENDGRID_PASSWORD', nil),
  authentication: :plain,
  enable_starttls_auto: true
}
ActionMailer::Base.delivery_method = :smtp
