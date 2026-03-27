# frozen_string_literal: true

require 'test_helper'

class ReportsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @report = create_dummy_report
    @report.sighted_at = '2012-01-01'
    @report.reported_at = '2012-01-02'
    @report.coord = [4.0314, 36.5411]
    @report.links = ['http://www.youtube.com', 'http://www.google.com']
  end

  test 'should get index as json' do
    get reports_path(format: :json)

    assert_response :success
  end

  test 'should get new' do
    get new_report_path

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

  test 'should show report as json' do
    @report.save!
    get report_path(id: @report.id, format: :json)

    assert_response :success
  end

  test 'should get sightings rss' do
    @report.status = 1
    @report.source = 'ufo-hunters.com'
    @report.save!
    get reports_sightings_path(format: :xml)

    assert_response :success
  end

  test 'should get nearof as json' do
    Report.collection.indexes.create_one({ coord: '2dsphere' })
    @report.status = 1
    @report.save!
    get '/reports/nearof/4/36/nearest', params: { format: :json }

    assert_response :success
  end

  test 'should get country rss' do
    country = create_country
    country.save!
    @report.status = 1
    @report.save!
    get "/reports/#{country.cod}/country", params: { format: :xml }

    assert_response :success
  end
end
