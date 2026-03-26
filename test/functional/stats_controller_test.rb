# frozen_string_literal: true

require 'test_helper'

class StatsControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get stats_path

    assert_response :success
  end

  test 'should get map_json as json' do
    get map_json_path(format: :json)

    assert_response :success
  end

  test 'should get shape as json' do
    get stats_shape_path(format: :json)

    assert_response :success
  end
end
