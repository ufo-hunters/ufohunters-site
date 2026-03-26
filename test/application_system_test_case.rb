# frozen_string_literal: true

ENV['SYSTEM_TEST'] = '1'
require 'test_helper'

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :headless_chrome, screen_size: [1400, 900]
end
