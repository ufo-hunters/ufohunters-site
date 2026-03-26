# frozen_string_literal: true

require 'application_system_test_case'

class ErrorPagesTest < ApplicationSystemTestCase
  test 'visiting 404 page' do
    visit '/404'

    assert_selector 'body'
  end

  test 'visiting 500 page' do
    visit '/500'

    assert_selector 'body'
  end
end
