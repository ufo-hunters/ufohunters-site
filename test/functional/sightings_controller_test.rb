# frozen_string_literal: true

require 'test_helper'

class SightingsControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get root_path

    assert_response :success
  end

  test 'should get search' do
    Report.collection.indexes.create_one({ coord: '2dsphere' })
    report = create_dummy_report
    report.save!
    get sightings_search_path(id: report.id)

    assert_response :success
  end

  test 'should maps statistics' do
    get sightings_maps_path

    assert_response :success
  end

  test 'should maps countrieslist' do
    get sightings_countrieslist_path(format: :json)

    assert_response :success
  end

  test 'should maps northamerica' do
    get sightings_northamerica_path

    assert_response :success
  end

  test 'should maps northamerica json' do
    get sightings_northamerica_path(format: :json)

    assert_response :success
  end

  test 'should maps oceania' do
    get sightings_oceania_path

    assert_response :success
  end

  test 'should maps oceania json' do
    get sightings_oceania_path(format: :json)

    assert_response :success
  end

  test 'should maps southamerica' do
    get sightings_southamerica_path

    assert_response :success
  end

  test 'should maps southamerica json' do
    get sightings_southamerica_path(format: :json)

    assert_response :success
  end

  test 'should maps africa' do
    get sightings_africa_path

    assert_response :success
  end

  test 'should maps africa json' do
    get sightings_africa_path(format: :json)

    assert_response :success
  end

  test 'should maps europe' do
    get sightings_europe_path

    assert_response :success
  end

  test 'should maps europe json' do
    get sightings_europe_path(format: :json)

    assert_response :success
  end

  test 'should maps asia' do
    get sightings_asia_path

    assert_response :success
  end

  test 'should maps asia json' do
    get sightings_asia_path(format: :json)

    assert_response :success
  end

  test 'should maps videos' do
    get sightings_videos_path

    assert_response :success
  end

  test 'should maps images' do
    get sightings_images_path

    assert_response :success
  end

  test 'should maps about' do
    get sightings_about_path

    assert_response :success
  end

  test 'should maps country' do
    country = create_country
    country.save!

    get sightings_country_path(id: 'ESP')

    assert_response :success
  end

  # Regression (finding #14): the country page parsed geometry by key position,
  # so a document whose geometry stored 'coordinates' before 'type' silently
  # swapped them. Explicit key access must render regardless of key order.
  test 'should render country page when geometry keys are in reverse order' do
    country = create_country
    country.geometry = { 'coordinates' => country.geometry[:coordinates], 'type' => 'Polygon' }
    country.save!

    get sightings_country_path(id: 'ESP')

    assert_response :success
  end

  test 'should return 404 for an unknown country code' do
    get sightings_country_path(id: 'ZZZ')

    assert_response :not_found
  end
end
