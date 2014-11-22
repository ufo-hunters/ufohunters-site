class ErrorsController < ApplicationController
 
  def not_found
  	@page_title = "ERROR"
    render :status => 404
  end
 
  def unacceptable
  	@page_title = "ERROR"
    render :status => 422
  end
 
  def internal_error
  	@page_title = "ERROR"
    render :status => 500
  end
 
end
