# frozen_string_literal: true

require 'test_helper'

module SocialPoster
  class ReportSelectorTest < ActiveSupport::TestCase
    test 'returns nil when no published reports in last month' do
      result = SocialPoster::ReportSelector.candidate_for('twitter')

      assert_nil result
    end

    test 'excludes already posted reports' do
      report = create_dummy_report
      report.status = 1
      report.reported_at = Time.current.strftime('%Y%m%d')
      report.save!

      SocialPost.create!(platform: 'twitter', report_id: report.id.to_s, posted_at: Time.current)

      result = SocialPoster::ReportSelector.candidate_for('twitter')

      assert_nil result
    end

    test 'returns a published recent report when available' do
      report = create_dummy_report
      report.status = 1
      report.reported_at = Time.current.strftime('%Y%m%d')
      report.save!

      result = SocialPoster::ReportSelector.candidate_for('twitter')

      assert_not_nil result
      assert_instance_of Report, result
      assert_equal report.id, result['_id']
    end

    test 'excludes unpublished reports' do
      report = create_dummy_report
      report.status = 0
      report.reported_at = Time.current.strftime('%Y%m%d')
      report.save!

      result = SocialPoster::ReportSelector.candidate_for('twitter')

      assert_nil result
    end

    test 'excludes reports older than one month' do
      report = create_dummy_report
      report.status = 1
      report.reported_at = 2.months.ago.strftime('%Y%m%d')
      report.save!

      result = SocialPoster::ReportSelector.candidate_for('twitter')

      assert_nil result
    end

    test 'twitter and bluesky track posts independently' do
      report = create_dummy_report
      report.status = 1
      report.reported_at = Time.current.strftime('%Y%m%d')
      report.save!

      SocialPost.create!(platform: 'twitter', report_id: report.id.to_s, posted_at: Time.current)

      result = SocialPoster::ReportSelector.candidate_for('bluesky')

      assert_not_nil result
    end
  end
end
