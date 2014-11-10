class SessionsController < ApplicationController

	def create
	  @page_title = "UFO Resarch Team - Articles"
	  @user = User.new
	  user = User.where(:username => params[:username]).first
	  if user && user.authenticate(params[:password])
	    session[:user_id] = user.id
	    redirect_to :controller => 'articles', :action =>'myspace'
	  else
	  	flash["form"]=1
	    flash["error"]="Invalid username or password"
        redirect_to :controller => 'articles', :action =>'uforesearchteam'
	  end
	end

	def destroy
		session[:user_id] = nil
		redirect_to :controller => 'articles', :action =>'uforesearchteam', :notice => "Logged out!"
	end

end
