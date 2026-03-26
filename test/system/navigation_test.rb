# frozen_string_literal: true

require 'application_system_test_case'

class NavigationTest < ApplicationSystemTestCase
  test 'visiting the homepage' do
    visit root_path

    assert_selector 'body'
  end

  test 'visiting the about page' do
    visit sightings_about_path

    assert_selector 'body'
  end

  test 'visiting the maps page' do
    visit sightings_maps_path

    assert_selector 'body'
  end

  test 'visiting the articles page' do
    visit articles_path

    assert_selector 'body'
  end

  test 'visiting the stats page' do
    visit stats_path

    assert_selector 'body'
  end

  test 'visiting the videos page' do
    visit sightings_videos_path

    assert_selector 'body'
  end

  test 'visiting the images page' do
    visit sightings_images_path

    assert_selector 'body'
  end
end
