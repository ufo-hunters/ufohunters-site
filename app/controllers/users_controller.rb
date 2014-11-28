class UsersController < ApplicationController

  include SimpleCaptcha::ControllerHelpers

  protect_from_forgery except: :create

  def create

    if simple_captcha_valid?

      @user = User.new(user_params)

      if @user.save
        session[:user_id] = @user.id
        redirect_to :controller => 'articles', :action =>'myspace'
      else
        flash[:form] = 2
        flash[:error] = @user.errors.full_messages
        redirect_to :controller => 'articles', :action =>'uforesearchteam'
      end

    else
      flash[:form] = 2
      flash[:error] = ["You must enter the text of the image!"]
      redirect_to :controller => 'articles', :action =>'uforesearchteam'
    end

  end

  private

    def user_params
      params.require(:user).permit(:username, :password, :password_confirmation, :email, :email_confirmation)
    end


end

