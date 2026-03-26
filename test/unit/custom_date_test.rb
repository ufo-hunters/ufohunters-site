# frozen_string_literal: true

require 'test_helper'

class CustomDateTest < ActiveSupport::TestCase
  test 'should mongoize a date string' do
    result = CustomDate.mongoize('2012-01-15')

    assert_equal 'Sunday 15. January 2012', result
  end

  test 'should return nil for blank input' do
    assert_nil CustomDate.mongoize('')
    assert_nil CustomDate.mongoize(nil)
  end

  test 'should demongoize to string' do
    result = CustomDate.demongoize('Sunday 15. January 2012')

    assert_equal 'Sunday 15. January 2012', result
  end

  test 'should evolve same as mongoize' do
    result = CustomDate.evolve('2012-01-15')

    assert_equal CustomDate.mongoize('2012-01-15'), result
  end
end
