class ApplicationController < ActionController::Base

  helper_method :check_user
  helper_method :logged_in?
  helper_method :video_list
  helper_method :num_reports

  protect_from_forgery

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
    Rails.cache.fetch("common/video_list", :expires_in => 12.hours) do
      Report.where(:status => 1, :links.in => [/.*youtube.com.*/, /.*youtu.be.*/], :coord.ne => nil).desc(:sighted_at).limit(20).entries
    end
  end

  def num_reports
    Rails.cache.fetch("common/num_reports", :expires_in => 8.hours) do
      Report.where(:status => 1).count()
    end
  end

end
