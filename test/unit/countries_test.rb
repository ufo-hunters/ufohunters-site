# frozen_string_literal: true

require 'test_helper'

class CountriesTest < ActiveSupport::TestCase
  setup do
    @country = create_country
  end

  test 'should save valid country' do
    assert @country.save, 'Did not save a valid country'
  end

  test 'should store country code' do
    @country.save!

    assert_equal 'ESP', @country.cod
  end

  test 'should store country name' do
    @country.save!

    assert_equal 'Spain', @country.name
  end

  test 'should store continent' do
    @country.save!

    assert_equal 'Europe', @country.continent
  end

  test 'should store center coordinates' do
    @country.save!

    assert_equal [-4, 40], @country.center
  end

  test 'should store geometry as hash' do
    @country.save!

    assert_equal 'Polygon', @country.geometry[:type]
    assert_kind_of Array, @country.geometry[:coordinates]
  end

  test 'should find country by code' do
    @country.save!
    found = Countries.where(cod: 'ESP').first

    assert_not_nil found
    assert_equal 'Spain', found.name
  end
end
