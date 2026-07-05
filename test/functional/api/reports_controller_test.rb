# frozen_string_literal: true

require 'test_helper'

module Api
  class ReportsControllerTest < ActionDispatch::IntegrationTest
    APP_KEY = 'test-mobile-key'

    setup do
      ENV['MOBILE_APP_KEY'] = APP_KEY
      @valid_params = {
        report: {
          location: 'Madrid, Spain',
          shape: 'Circle',
          duration: '30 seconds',
          description: 'A bright green disc hovering over the city.',
          coord: '-3.70379,40.41678',
          sighted_at: '2026-07-01',
          email: 'witness@example.com'
        }
      }
    end

    teardown do
      ENV.delete('MOBILE_APP_KEY')
    end

    test 'rejects submission without the app key' do
      assert_no_difference('Report.count') do
        post api_reports_path, params: @valid_params
      end

      assert_response :unauthorized
    end

    test 'rejects submission with a wrong app key' do
      assert_no_difference('Report.count') do
        post api_reports_path, params: @valid_params, headers: { 'X-App-Key' => 'nope' }
      end

      assert_response :unauthorized
    end

    test 'creates an unpublished mobile report with a valid key' do
      assert_difference('Report.count', 1) do
        post api_reports_path, params: @valid_params, headers: { 'X-App-Key' => APP_KEY }
      end

      assert_response :created
      assert_predicate response.parsed_body['id'], :present?
    end

    test 'stores mobile reports unpublished and tagged as mobile-app' do
      post api_reports_path, params: @valid_params, headers: { 'X-App-Key' => APP_KEY }

      report = Report.find(response.parsed_body['id'])

      assert_equal 0, report.status
      assert_equal 'mobile-app', report.source
    end

    test 'normalizes the ISO date and lng,lat coordinates on submission' do
      post api_reports_path, params: @valid_params, headers: { 'X-App-Key' => APP_KEY }

      report = Report.find(response.parsed_body['id'])

      assert_equal '20260701', report.sighted_at
      assert_equal [-3.70379, 40.41678], report.coord
    end

    test 'returns validation errors for missing mandatory fields' do
      assert_no_difference('Report.count') do
        post api_reports_path,
             params: { report: { location: 'Nowhere' } },
             headers: { 'X-App-Key' => APP_KEY }
      end

      assert_response :unprocessable_content
      assert_predicate response.parsed_body['errors'], :present?
    end

    test 'falls back to [0,0] on malformed coordinates' do
      params = @valid_params.deep_dup
      params[:report][:coord] = 'not,a,coord'

      post api_reports_path, params: params, headers: { 'X-App-Key' => APP_KEY }

      assert_response :created
      report = Report.find(response.parsed_body['id'])

      assert_equal [0, 0], report.coord
    end
  end
end
