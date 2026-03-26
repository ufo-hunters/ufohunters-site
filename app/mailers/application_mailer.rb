# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'noreply@ufo-hunters.com'
  layout 'mailer'
end
