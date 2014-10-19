class SessionsController < ApplicationController
	def new
		@numUFO = Report.where(:status => 1).count()
	    @menu = "uforesearch"
	    @articles = Article.all.desc(:published_date)
	    @page_title = "UFO Resarch Team - Articles"
	    @page_description = "Latest Articles"
	    @user = User.new

	    respond_to do |format|
	      	format.html # index.html.erb
	      	format.json { render json: @articles }
    	end
	end

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
		redirect_to root_url, :notice => "Logged out!"
	end

end
