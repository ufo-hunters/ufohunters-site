# frozen_string_literal: true

class EmailConfirmationsController < ApplicationController
  def show
    user = User.where(confirmation_token: params[:token]).first

    if user && !user.confirmation_token_expired?
      user.confirm!
      flash[:notice] = 'Email confirmed successfully.'
    else
      flash[:error] = 'Confirmation link is invalid or has expired.'
    end

    redirect_to articles_uforesearchteam_path
  end
end
