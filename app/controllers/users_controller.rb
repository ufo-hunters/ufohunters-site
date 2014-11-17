class UsersController < ApplicationController

  include SimpleCaptcha::ControllerHelpers

  protect_from_forgery except: :create

  def create
    @user = User.new(user_params)

    if simple_captcha_valid?

        if @user.save
          session[:user_id] = @user.id
          redirect_to :controller => 'articles', :action =>'myspace'
        else
            flash["form"]=2
            flash["error"]="Sorry, username already exists. Please enter a different username"
            redirect_to :controller => 'articles', :action =>'uforesearchteam'

        end

     else
          flash["form"]=2
          flash["error"]="You must enter the text of the image!"
          redirect_to :controller => 'articles', :action =>'uforesearchteam'
     end

  end

  private

    def user_params
      params.require(:user).permit(:username, :password)
    end


end

