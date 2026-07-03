# frozen_string_literal: true

require 'test_helper'

class SocialPostTest < ActiveSupport::TestCase
  test 'valid with all required fields' do
    post = SocialPost.new(platform: 'twitter', report_id: '507f1f77bcf86cd799439011', posted_at: Time.current)

    assert_predicate post, :valid?
  end

  test 'invalid without platform' do
    post = SocialPost.new(report_id: '507f1f77bcf86cd799439011', posted_at: Time.current)

    assert_not post.valid?
    assert_includes post.errors[:platform], "can't be blank"
  end

  test 'invalid with unknown platform' do
    post = SocialPost.new(platform: 'instagram', report_id: '507f1f77bcf86cd799439011', posted_at: Time.current)

    assert_not post.valid?
  end

  test 'invalid without report_id' do
    post = SocialPost.new(platform: 'bluesky', posted_at: Time.current)

    assert_not post.valid?
    assert_includes post.errors[:report_id], "can't be blank"
  end

  test 'invalid without posted_at' do
    post = SocialPost.new(platform: 'twitter', report_id: '507f1f77bcf86cd799439011')

    assert_not post.valid?
    assert_includes post.errors[:posted_at], "can't be blank"
  end

  test 'accepts twitter platform' do
    post = SocialPost.new(platform: 'twitter', report_id: 'abc', posted_at: Time.current)

    assert_predicate post, :valid?
  end

  test 'accepts bluesky platform' do
    post = SocialPost.new(platform: 'bluesky', report_id: 'abc', posted_at: Time.current)

    assert_predicate post, :valid?
  end

  # Regression: the claim-before-post flow relies on report_id being unique per
  # platform so a report cannot be recorded (and therefore posted) twice.
  test 'invalid with a duplicate report_id on the same platform' do
    SocialPost.create!(platform: 'twitter', report_id: 'dup', posted_at: Time.current)
    duplicate = SocialPost.new(platform: 'twitter', report_id: 'dup', posted_at: Time.current)

    assert_not duplicate.valid?
  end

  test 'allows the same report_id on different platforms' do
    SocialPost.create!(platform: 'twitter', report_id: 'shared', posted_at: Time.current)
    other = SocialPost.new(platform: 'bluesky', report_id: 'shared', posted_at: Time.current)

    assert_predicate other, :valid?
  end
end
