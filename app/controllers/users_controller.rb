class UsersController < ApplicationController

	#before_filter :check_user

  include SimpleCaptcha::ControllerHelpers

  def new
    #@user = User.new
  end

  def create
    @user = User.new(params[:user])

    if simple_captcha_valid?

        if @user.save
          session[:user_id] = @user.id
          redirect_to :controller => 'articles', :action =>'myspace'
        else
            flash["form"]=2
            flash["error"]="Sorry, username already exists. please enter a different username"
            redirect_to :controller => 'articles', :action =>'uforesearchteam'
                  
        end

     else
          flash["form"]=2
          flash["error"]="You must enter the text of the image!"
          redirect_to :controller => 'articles', :action =>'uforesearchteam'
     end

  end
end

