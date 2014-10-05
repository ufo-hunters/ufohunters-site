class SessionsController < ApplicationController
  def new
  end

	def create
	  user = User.where(:username => params[:username]).first
	  if user && user.authenticate(params[:password])
	    session[:user_id] = user.id
	    redirect_to :controller => 'articles', :action =>'myspace'
	  else
	    flash.now.alert = "Invalid username or password"
	    redirect_to :controller => 'articles', :action =>'uforesearch'

	  end
	end

	def destroy
		session[:user_id] = nil
		redirect_to root_url, :notice => "Logged out!"
	end

end
