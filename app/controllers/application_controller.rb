class ApplicationController < ActionController::Base

  helper_method :check_user
  helper_method :logged_in?
  helper_method :video_list

  protect_from_forgery

  caches_action :video_list, :expires_in => 12.hour

  def check_user
    unless logged_in?
    	redirect_to root_url
    end
  end

  def logged_in?
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    else
      @current_user = nil
    end
  end

  def video_list

    Report.where(:status => 1, :links.in => [/.*youtube.com.*/, /.*youtu.be.*/], :coord.ne => nil).desc(:sighted_at).limit(20)

  end

end
