# frozen_string_literal: true

module SocialPoster
  class Twitter
    MAX_TWEET_LENGTH = 280
    TCO_URL_LENGTH = 23
    HASHTAGS = '#UFO #UAP'

    def self.post_random_sighting
      new.post_random_sighting
    end

    def initialize
      @client = X::Client.new(
        api_key: ENV.fetch('TWITTER_API_KEY'),
        api_key_secret: ENV.fetch('TWITTER_API_SECRET'),
        access_token: ENV.fetch('TWITTER_ACCESS_TOKEN'),
        access_token_secret: ENV.fetch('TWITTER_ACCESS_TOKEN_SECRET')
      )
    end

    def post_random_sighting
      report = ReportSelector.candidate_for('twitter')

      unless report
        Rails.logger.info '[SocialPoster::Twitter] No unposted candidates in last month'
        return nil
      end

      # Claim the report BEFORE posting. The unique (platform, report_id) index
      # means a persistence failure or a concurrent run can no longer let the
      # same report be tweeted twice: the claim exists before the tweet does.
      social_post = claim(report)
      return nil unless social_post

      begin
        response = @client.post('tweets', JSON.generate({ text: build_tweet(report) }))
        tweet_id = response.dig('data', 'id')
        raise "Twitter post returned no tweet id (response: #{response.inspect})" if tweet_id.blank?
      rescue StandardError => e
        # Keep the claim (duplicate-averse: a missed daily post beats a spam
        # duplicate) and re-raise so the failure is loud. external_id stays nil,
        # which is the reconciliation marker: SocialPost.where(external_id: nil).
        Rails.logger.error "[SocialPoster::Twitter] Post failed for report #{report.id} " \
                           "(claim kept for reconciliation): #{e.class}: #{e.message}"
        raise
      end

      social_post.update!(external_id: tweet_id)
      Rails.logger.info "[SocialPoster::Twitter] Posted tweet #{tweet_id} for report #{report.id}"
      tweet_id
    end

    private

    def claim(report)
      SocialPost.create!(platform: 'twitter', report_id: report.id.to_s, posted_at: Time.current)
    rescue Mongoid::Errors::Validations, Mongo::Error::OperationFailure => e
      Rails.logger.warn "[SocialPoster::Twitter] Report #{report.id} already claimed: #{e.message}"
      nil
    end

    def build_tweet(report)
      link = report_url(report)
      date = format_date(report.sighted_at)

      fixed_overhead = "UFO sighting in  on #{date} -  shape. ".length + TCO_URL_LENGTH + 1 + HASHTAGS.length
      budget = MAX_TWEET_LENGTH - fixed_overhead

      location = truncate_field(report.location.to_s, budget / 2)
      shape = truncate_field(report.shape.to_s, budget / 2)

      "UFO sighting in #{location} on #{date} - #{shape} shape. #{link} #{HASHTAGS}"
    end

    def report_url(report)
      host = ENV.fetch('APP_HOST', 'www.ufo-hunters.com')
      "https://#{host}/reports/#{report.id}"
    end

    def format_date(date_str)
      return date_str if date_str.blank?

      Date.strptime(date_str, '%Y%m%d').strftime('%Y-%m-%d')
    rescue Date::Error
      date_str
    end

    def truncate_field(value, max_length)
      return value if value.length <= max_length

      "#{value[0, max_length - 1]}…"
    end
  end
end
