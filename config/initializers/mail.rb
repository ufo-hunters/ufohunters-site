# frozen_string_literal: true

if Rails.env.production? && ENV['RESEND_API_KEY'].present?
  ActionMailer::Base.smtp_settings = {
    address: 'smtp.resend.com',
    port: 465,
    user_name: 'resend',
    password: ENV.fetch('RESEND_API_KEY'),
    authentication: :plain,
    enable_starttls_auto: true
  }
  ActionMailer::Base.delivery_method = :smtp
end
