# frozen_string_literal: true

require 'test_helper'

module SocialPoster
  class BlueskyTest < ActiveSupport::TestCase
    setup do
      ENV['BLUESKY_HANDLE'] ||= 'test.bsky.social'
      ENV['BLUESKY_APP_PASSWORD'] ||= 'test-app-password'
    end

    test 'post_random_sighting records the external id on success' do
      report = published_candidate
      poster = SocialPoster::Bluesky.new
      def poster.create_session = { 'did' => 'did:plc:test', 'accessJwt' => 'jwt' }
      def poster.post_record(*) = 'rkey123'

      result = poster.post_random_sighting

      assert_equal 'rkey123', result
      social_post = SocialPost.where(platform: 'bluesky', report_id: report.id.to_s).first

      assert_equal 'rkey123', social_post.external_id
    end

    # Regression: a failed post must keep the claim and re-raise, leaving
    # external_id nil for reconciliation, so the report is not posted twice.
    test 'post_random_sighting keeps the claim and raises when posting fails' do
      report = published_candidate
      poster = SocialPoster::Bluesky.new
      def poster.create_session = { 'did' => 'did:plc:test', 'accessJwt' => 'jwt' }
      def poster.post_record(*) = raise 'Bluesky createRecord returned no uri'

      assert_raises(RuntimeError) { poster.post_random_sighting }

      social_post = SocialPost.where(platform: 'bluesky', report_id: report.id.to_s).first

      assert_not_nil social_post, 'claim should be kept for reconciliation'
      assert_nil social_post.external_id
    end

    test 'post_record raises when the response has no uri' do
      poster = SocialPoster::Bluesky.new
      # success-shaped response but missing the uri field
      def poster.pds_post(*) = { 'cid' => 'abc' }
      session = { 'did' => 'did:plc:test', 'accessJwt' => 'jwt' }

      assert_raises(RuntimeError) do
        poster.send(:post_record, session, published_candidate)
      end
    end

    private

    def published_candidate
      report = create_dummy_report
      report.status = 1
      report.reported_at = Time.current.strftime('%Y%m%d')
      report.save!
      report
    end
  end
end
