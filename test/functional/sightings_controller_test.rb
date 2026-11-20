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

  # Regression: 110 legacy reports store coord as [] (or another malformed array). [] is
  # truthy in Ruby, so the page ran $nearSphere with an empty point and MongoDB answered
  # "geo near accepts just one argument" -> 500 on the sighting page.
  test 'search renders a report without coordinates and skips the nearby query and map' do
    Report.collection.indexes.create_one({ coord: '2dsphere' })
    report = create_dummy_report
    report.coord = []
    report.save!(validate: false)

    get sightings_search_path(id: report.id)

    assert_response :success
    assert_no_match 'id="sightings-map"', response.body
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

  test 'home shows the featured article with a link to it' do
    create_dummy_user.save!
    article = create_dummy_article
    article.assign_attributes(title: 'Big Case', status: 1, featured: true)
    article.save!

    get root_path

    assert_response :success
    assert_select 'h2', text: 'Big Case'
    assert_select "a[href*='/articles/#{article.id}']", text: /Read the full article/
  end

  test 'home featured teaser is not double escaped' do
    create_dummy_user.save!
    article = create_dummy_article
    article.assign_attributes(teaser: "Reid's request #{'word ' * 50}", status: 1, featured: true)
    article.save!

    get root_path

    assert_response :success
    assert_not_includes response.body, '&amp;#39;'
  end

  test 'home renders without a featured article' do
    get root_path

    assert_response :success
    assert_select 'span', text: /Featured Report/, count: 0
    assert_select 'a', text: /Read the full article/, count: 0
  end

  test 'home links to the featured article' do
    create_dummy_user.save!
    featured = create_home_article(title: 'Big Case', featured: true)

    get root_path

    assert_response :success
    assert_select '#home-articles h2', text: 'Big Case'
    assert_select "a[href*='/articles/#{featured.id}']", text: /Read the full article/
  end

  test 'home lists the published related articles of the featured one in their stored order' do
    create_dummy_user.save!
    related = (1..3).map { |i| create_home_article(title: "Dossier #{i}") }
    draft = create_home_article(title: 'Draft Dossier', status: 0)
    create_home_article(title: 'Big Case', featured: true,
                        related_article_ids: [related[2].id, draft.id, related[0].id, related[1].id])

    get root_path

    assert_select '#home-related-articles li', count: 3
    assert_select '#home-related-articles li:first-child a', text: /Dossier 3/
    assert_select '#home-related-articles a', text: /Draft Dossier/, count: 0
  end

  test 'home related links use the article URL format' do
    create_dummy_user.save!
    related = create_home_article(title: 'Dossier 1')
    create_home_article(title: 'Big Case', featured: true, related_article_ids: [related.id])

    get root_path

    assert_select "#home-related-articles a[href^='/articles/#{related.id}/']", text: /Dossier 1/
    assert_select "a[href='#{articles_path}']", text: /All articles/
  end

  test 'home shows the featured article alone when it has no related articles' do
    create_dummy_user.save!
    create_home_article(title: 'Big Case', featured: true)
    create_home_article(title: 'Unrelated Dossier')

    get root_path

    assert_select '#home-articles h2', text: 'Big Case'
    assert_select '#home-related-articles', count: 0
    assert_select 'a', text: /Unrelated Dossier/, count: 0
  end

  test 'home renders a full width hero when there is no featured article' do
    create_dummy_user.save!
    create_home_article(title: 'Plain Dossier')

    get root_path

    assert_select 'h1', text: /SIGHTINGS/
    assert_select '#home-articles', count: 0
    assert_select 'a', text: /Plain Dossier/, count: 0
  end

  private

  def create_home_article(attrs = {})
    article = create_dummy_article
    article.assign_attributes({ status: 1 }.merge(attrs))
    article.save!
    article
  end
end
