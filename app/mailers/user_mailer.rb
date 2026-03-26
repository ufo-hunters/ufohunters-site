# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def password_reset(user, token)
    @user = user
    @token = token
    @reset_url = edit_password_reset_url(token)
    mail(to: @user.email, subject: 'UFO Hunters — Password Reset')
  end

  def email_confirmation(user)
    @user = user
    @confirmation_url = confirm_email_url(token: user.confirmation_token)
    mail(to: @user.email, subject: 'UFO Hunters — Confirm Your Email')
  end
end
