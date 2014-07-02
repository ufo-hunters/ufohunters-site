require 'test_helper'

class ApplicationHelperTest < ActionView::TestCase
  extend ApplicationHelper

  setup do
    @dates_to_format = ["20130520", "20130101", "19010831"]
    @youtube_urls = ["https://www.youtube.com/watch?v=rhKgzczo8UM&feature=player_embedded", "http://youtu.be/xjFHveMSoYQ"]
    @no_youtube_urls = ["http://www.ufo-hunters.com", "http://www.unveiledfuture.com"]
    @reports = [
      Report.new(:location => "O'Fallon", :sighted_at => "20130101"),
      Report.new(:location => "Trinidad & Tobago", :sighted_at => "20130212"),
      Report.new(:location => "Unites States/Canada Border", :sighted_at => "20131106"),
      Report.new(:location => "Mt. Vernon", :sighted_at => "20130721"),
      Report.new(:location => "Chicago?", :sighted_at => "20131209"),
      Report.new(:location => "This' a location? with.lots of.'chars' to??remove/&replace.", :sighted_at => "20130329")
    ]
  end

  test "should format string date" do
    expected_responses = ["Monday 20. May 2013", "Tuesday 01. January 2013", "Saturday 31. August 1901"]
    assert_string_date_format :format_date, @dates_to_format, expected_responses
  end

  test "should format string date for rss" do
    expected_responses = ["Mon, 20 May 2013 00:00:00", "Tue, 01 January 2013 00:00:00", "Sat, 31 August 1901 00:00:00"]
    assert_string_date_format :format_date_rss, @dates_to_format, expected_responses
  end

  test "should format string date for microdata" do
    expected_responses = ["2013-05-20", "2013-01-01", "1901-08-31"]
    assert_string_date_format :format_date_microdata, @dates_to_format, expected_responses
  end

  test "should detect youtube urls" do
    @youtube_urls.each do |link|
      assert youtube_link?(link), "Should detect only youtube links"
    end
  end

  test "should not detect no youtube urls" do
    @no_youtube_urls.each do |link|
      assert !youtube_link?(link), "Should detect only youtube links"
    end
  end

  test "should extract video id" do
    actual_responses = []
    expected_responses = ["rhKgzczo8UM", "xjFHveMSoYQ"]

    @youtube_urls.each do |link|
      actual_responses << youtube_video_id(link)
    end

    assert_equal actual_responses, expected_responses, "Looks like the ids has not been correctly extracted"
  end

  test "shoud generate a friendly title" do
    expected_responses = ["UFO Sighting in OFallon on Tuesday 01 January 2013",
                          "UFO Sighting in Trinidad - Tobago on Tuesday 12 February 2013",
                          "UFO Sighting in Unites States-Canada Border on Wednesday 06 November 2013",
                          "UFO Sighting in Mt Vernon on Sunday 21 July 2013",
                          "UFO Sighting in Chicago- on Monday 09 December 2013",
                          "UFO Sighting in This a location- withlots ofchars to--remove--replace on Friday 29 March 2013"]

    actual_responses = []

    @reports.each do |report|
      actual_responses << friendly_title(report)
    end

    assert_equal actual_responses, expected_responses, "Something went wrong generating the friendly titles"

  end

private
  def assert_string_date_format(method_name, dates_to_format, expected_responses)
    actual_responses = []

    dates_to_format.each do |date_to_format|
      actual_responses << ApplicationHelperTest.send(method_name, date_to_format)
    end

    assert_equal actual_responses, expected_responses, "The formatted dates should match the specified format"
  end

end
