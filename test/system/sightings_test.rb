# frozen_string_literal: true

require 'application_system_test_case'

class SightingsTest < ApplicationSystemTestCase
  setup do
    Report.collection.indexes.create_one({ coord: '2dsphere' })
    @report = Report.create!(
      sighted_at: '20120101',
      reported_at: '20120102',
      location: 'Test Location',
      shape: 'Triangle',
      duration: '5 min.',
      description: 'A bright triangle in the sky',
      coord: [-3.7, 40.4],
      source: 'ufo-hunters.com',
      status: 1,
      case_number: 9999
    )
  end

  test 'viewing a sighting detail' do
    visit sightings_search_path(id: @report.id)

    assert_text(/test location/i)
    assert_text(/triangle/i)
  end

  test 'visiting continent map page' do
    visit sightings_europe_path

    assert_selector 'body'
  end

  test 'visiting the report form' do
    visit new_report_path

    assert_selector 'input[name="report[location]"]'
    assert_selector 'textarea[name="report[description]"]'
  end

  test 'searching UFOs with valid dates and location returns results' do
    visit sightings_ufosearch_path

    page.execute_script("document.getElementById('startdate').value = '2012-01-01'")
    page.execute_script("document.getElementById('enddate').value = '2012-01-31'")
    page.execute_script("document.getElementById('coord').value = '-3.7,40.4'")

    click_on 'SEARCH UFOS'

    assert_text(/search results/i)
    assert_text 'Test Location'
  end

  test 'searching UFOs with dates outside range returns no matching results' do
    visit sightings_ufosearch_path

    page.execute_script("document.getElementById('startdate').value = '2020-01-01'")
    page.execute_script("document.getElementById('enddate').value = '2020-12-31'")
    page.execute_script("document.getElementById('coord').value = '-3.7,40.4'")

    click_on 'SEARCH UFOS'

    assert_text(/search results/i)
    assert_no_text 'Test Location'
  end
end
