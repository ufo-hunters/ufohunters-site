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
end
