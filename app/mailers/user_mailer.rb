# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def password_reset(user, token)
    @user = user
    @token = token
    @reset_url = edit_password_reset_url(token)
    mail(to: @user.email, subject: 'UFO Hunters — Password Reset')
  end
end
