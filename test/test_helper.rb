ENV["RAILS_ENV"] = "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.(yml|csv) for all tests in alphabetical order.
  #
  # Note: You'll currently still have to declare fixtures explicitly in integration tests
  # -- they do not yet inherit this setting
  #fixtures :all

  # Looks like fixtures do not work with mongoid
  def create_dummy_report
    Report.new(:sighted_at => "20120101",
               :reported_at => "20120102",
               :location => "My Location",
               :shape => "My Shape",
               :duration => "1 min.",
               :description => "My description",
               :coord => [4.0314, 36.5411],
               :links => ["http://www.youtube.com", "http://www.google.com"],
               :source => "My Source",
               :email => "email@email.com")
  end

  # Add more helper methods to be used by all tests here...
  teardown :clean_mongodb

  def clean_mongodb
    Mongoid.default_session['ufo'].drop
    Mongoid.default_session['articles'].drop
  end

end
