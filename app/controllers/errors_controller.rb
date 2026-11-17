# frozen_string_literal: true

class ErrorsController < ApplicationController
  def not_found
    render_error :not_found
  end

  def unacceptable
    render_error :unprocessable_content
  end

  def internal_error
    render_error :internal_server_error
  end

  private

  # Error pages only have HTML templates. Any other format (an unknown .jpg or .txt URL
  # routed here by exceptions_app) gets the bare status: rendering would raise
  # MissingTemplate and the failsafe would turn a 404 into a 500.
  def render_error(status)
    @page_title = 'ERROR'
    respond_to do |format|
      format.html { render status: status }
      format.any { head status }
    end
  end
end
