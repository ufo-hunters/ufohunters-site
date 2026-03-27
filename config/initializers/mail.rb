# frozen_string_literal: true

if Rails.env.production? && ENV['RESEND_API_KEY'].present?
  Resend.api_key = ENV.fetch('RESEND_API_KEY')

  ActionMailer::Base.delivery_method = :resend
  ActionMailer::Base.default from: ENV.fetch('MAILER_FROM', 'onboarding@resend.dev')
end
