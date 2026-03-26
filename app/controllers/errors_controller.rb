# frozen_string_literal: true

class ErrorsController < ApplicationController
  def not_found
    @page_title = 'ERROR'
    render status: :not_found
  end

  def unacceptable
    @page_title = 'ERROR'
    render status: :unprocessable_content
  end

  def internal_error
    @page_title = 'ERROR'
    render status: :internal_server_error
  end
end
