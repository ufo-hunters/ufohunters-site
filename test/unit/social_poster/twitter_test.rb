# frozen_string_literal: true

require 'test_helper'

module SocialPoster
  class TwitterTest < ActiveSupport::TestCase
    setup do
      ENV['TWITTER_API_KEY'] ||= 'test_key'
      ENV['TWITTER_API_SECRET'] ||= 'test_secret'
      ENV['TWITTER_ACCESS_TOKEN'] ||= 'test_token'
      ENV['TWITTER_ACCESS_TOKEN_SECRET'] ||= 'test_token_secret'
    end

    test 'build_tweet fits within 280 characters' do
      poster = SocialPoster::Twitter.new
      report = create_dummy_report
      report.location = 'A' * 200
      report.sighted_at = '20250101'

      tweet = poster.send(:build_tweet, report)

      assert_operator tweet.length, :<=, 280, "Tweet too long: #{tweet.length} chars"
    end

    test 'build_tweet includes location and shape' do
      poster = SocialPoster::Twitter.new
      report = create_dummy_report
      report.location = 'Texas, USA'
      report.shape = 'Triangle'
      report.sighted_at = '20250315'

      tweet = poster.send(:build_tweet, report)

      assert_includes tweet, 'Texas, USA'
      assert_includes tweet, 'Triangle'
      assert_includes tweet, '#UFO #UAP'
    end

    test 'build_tweet includes formatted date' do
      poster = SocialPoster::Twitter.new
      report = create_dummy_report
      report.sighted_at = '20250315'

      tweet = poster.send(:build_tweet, report)

      assert_includes tweet, '2025-03-15'
    end

    test 'build_tweet works with a ReportSelector candidate' do
      report = create_dummy_report
      report.status = 1
      report.reported_at = Time.current.strftime('%Y%m%d')
      report.save!

      candidate = SocialPoster::ReportSelector.candidate_for('twitter')
      tweet = SocialPoster::Twitter.new.send(:build_tweet, candidate)

      assert_includes tweet, 'My Location'
      assert_operator tweet.length, :<=, 280
    end

    test 'report_url uses APP_HOST' do
      poster = SocialPoster::Twitter.new
      report = create_dummy_report
      report.save!

      url = poster.send(:report_url, report)

      assert_match %r{https://.*ufo-hunters\.com/reports/}, url
    end

    test 'format_date converts YYYYMMDD to YYYY-MM-DD' do
      poster = SocialPoster::Twitter.new

      assert_equal '2025-03-15', poster.send(:format_date, '20250315')
    end

    test 'format_date handles invalid date gracefully' do
      poster = SocialPoster::Twitter.new

      assert_equal 'invalid', poster.send(:format_date, 'invalid')
    end
  end
end
