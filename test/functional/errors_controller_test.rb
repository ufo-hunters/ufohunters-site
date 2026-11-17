# frozen_string_literal: true

require 'test_helper'

class ErrorsControllerTest < ActionDispatch::IntegrationTest
  test 'should render 404' do
    get '/404'

    assert_response :not_found
  end

  test 'should render 422' do
    get '/422'

    assert_response :unprocessable_entity
  end

  test 'should render 500' do
    get '/500'

    assert_response :internal_server_error
  end

  # Regression: an unknown URL ending in .jpg reached errors#not_found as JPEG, found no
  # template and the failsafe answered 500 instead of 404 (seen in production logs).
  test 'missing image URL answers 404, not 500' do
    with_production_error_pages do
      get '/524878083c024d5ed6000010/UFO%20Sighting%20in%20Bloemfontein(3).jpg'
    end

    assert_response :not_found
    assert_empty response.body
  end

  test 'missing text file URL answers 404, not 500' do
    with_production_error_pages do
      get '/sightings/country/PRT/sources/deep.txt'
    end

    assert_response :not_found
  end

  test 'error pages without an HTML template answer with the status only' do
    get '/404.json'

    assert_response :not_found
    assert_empty response.body
  end

  test 'error pages still render HTML for browsers' do
    get '/404', headers: { 'Accept' => 'text/html' }

    assert_response :not_found
    assert_match 'ERROR', response.body
  end

  private

  # The test environment shows the debug page for routing errors; production hands them
  # to config.exceptions_app (ErrorsController). Switch to production behaviour.
  def with_production_error_pages
    env_config = Rails.application.env_config
    original = env_config.slice('action_dispatch.show_exceptions', 'action_dispatch.show_detailed_exceptions')
    env_config['action_dispatch.show_exceptions'] = :all
    env_config['action_dispatch.show_detailed_exceptions'] = false
    yield
  ensure
    env_config.merge!(original)
  end
end
