# frozen_string_literal: true

require 'test_helper'

class ReportsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @report = create_dummy_report
    @report.sighted_at = '01/01/2012'
    @report.reported_at = '02/01/2012'
    @report.coord = [4.0314, 36.5411]
    @report.links = ['http://www.youtube.com', 'http://www.google.com']
  end

  test 'should get index' do
    get reports_path(format: :json)

    assert_response :success
  end

  test 'should create report' do
    assert_difference('Report.count') do
      post reports_path, params: { report: @report.attributes }
    end

    assert_response :redirect
  end

  test 'should show report' do
    @report.save!
    get report_path(id: @report.id)

    assert_response :success
  end
end
