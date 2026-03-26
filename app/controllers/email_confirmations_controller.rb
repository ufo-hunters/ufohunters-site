# frozen_string_literal: true

class EmailConfirmationsController < ApplicationController
  def show
    user = User.where(confirmation_token: params[:token]).first

    if user
      user.confirm!
      flash[:notice] = 'Email confirmed successfully. You can now log in.'
    else
      flash[:error] = 'Invalid confirmation link.'
    end

    redirect_to articles_uforesearchteam_path
  end
end
