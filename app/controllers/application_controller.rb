# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Pagy::Backend

  helper_method :check_user
  helper_method :logged_in?
  helper_method :current_user
  helper_method :video_list
  helper_method :num_reports

  protect_from_forgery

  before_action :set_security_headers

  private

  def set_security_headers
    response.set_header('X-Content-Type-Options', 'nosniff')
    response.set_header('X-Frame-Options', 'SAMEORIGIN')
    response.set_header('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.set_header('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)')
  end

  public

  def check_user
    return if logged_in?

    redirect_to root_url
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def logged_in?
    current_user.present?
  end

  def video_list
    Rails.cache.fetch('common/video_list', expires_in: 1.day) do
      Report.where(:status => 1, :links.in => [/.*youtube.com.*/, /.*youtu.be.*/],
                   :coord.ne => nil).desc(:sighted_at).limit(20).entries
    end
  end

  def num_reports
    Rails.cache.fetch('common/num_reports', expires_in: 1.day) do
      Report.where(status: 1).count
    end
  end
end
