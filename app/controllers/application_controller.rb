class ApplicationController < ActionController::Base
  
  helper_method :video_list

  protect_from_forgery

  def video_list
  	 
    Report.where(:status => 1, :links.in => [/.*youtube.com.*/, /.*youtu.be.*/], :coord.ne => nil).desc(:sighted_at).limit(30)

  end

end