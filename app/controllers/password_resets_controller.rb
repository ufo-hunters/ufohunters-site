# frozen_string_literal: true

class PasswordResetsController < ApplicationController
  def new
    @page_title = 'Reset Password'
  end

  def edit
    @user = User.where(reset_token: params[:id]).first

    if @user.nil? || @user.reset_token_expired?
      flash[:error] = 'Password reset link is invalid or has expired.'
      redirect_to new_password_reset_path
      return
    end

    @page_title = 'Set New Password'
  end

  def create
    user = User.where(email: params[:email]).first

    if user
      user.generate_reset_token!
      UserMailer.password_reset(user, user.reset_token).deliver_now
    end

    flash[:notice] = 'If an account with that email exists, a reset link has been sent.'
    redirect_to articles_uforesearchteam_path
  end

  def update
    @user = User.where(reset_token: params[:id]).first

    if @user.nil? || @user.reset_token_expired?
      flash[:error] = 'Password reset link is invalid or has expired.'
      redirect_to new_password_reset_path
      return
    end

    @user.password = params[:password]
    @user.password_confirmation = params[:password_confirmation]

    if @user.valid?
      @user.reset_token = nil
      @user.reset_sent_at = nil
      @user.save!
      flash[:notice] = 'Password has been reset. You can now log in.'
      redirect_to articles_uforesearchteam_path
    else
      flash[:error] = @user.errors.full_messages.join(', ')
      render :edit, status: :unprocessable_content
    end
  end
end
