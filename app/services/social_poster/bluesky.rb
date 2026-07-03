# frozen_string_literal: true

require 'net/http'
require 'json'

module SocialPoster
  class Bluesky
    PDS_HOST = 'bsky.social'

    def self.post_random_sighting
      new.post_random_sighting
    end

    def post_random_sighting
      report = ReportSelector.candidate_for('bluesky')

      unless report
        Rails.logger.info '[SocialPoster::Bluesky] No unposted candidates in last month'
        return nil
      end

      # Claim before posting: the unique (platform, report_id) index prevents a
      # persistence failure or concurrent run from posting the same report twice.
      social_post = claim(report)
      return nil unless social_post

      begin
        session = create_session
        rkey = post_record(session, report)
      rescue StandardError => e
        # Keep the claim (duplicate-averse) and re-raise. external_id stays nil
        # as the reconciliation marker: SocialPost.where(external_id: nil).
        Rails.logger.error "[SocialPoster::Bluesky] Post failed for report #{report.id} " \
                           "(claim kept for reconciliation): #{e.class}: #{e.message}"
        raise
      end

      social_post.update!(external_id: rkey)
      Rails.logger.info "[SocialPoster::Bluesky] Posted record #{rkey} for report #{report.id}"
      rkey
    end

    private

    def claim(report)
      SocialPost.create!(platform: 'bluesky', report_id: report.id.to_s, posted_at: Time.current)
    rescue Mongoid::Errors::Validations, Mongo::Error::OperationFailure => e
      Rails.logger.warn "[SocialPoster::Bluesky] Report #{report.id} already claimed: #{e.message}"
      nil
    end

    def create_session
      response = pds_post(
        '/xrpc/com.atproto.server.createSession',
        { identifier: ENV.fetch('BLUESKY_HANDLE'), password: ENV.fetch('BLUESKY_APP_PASSWORD') }
      )
      raise "Bluesky auth failed: #{response['error']}" if response['error']

      response
    end

    def post_record(session, report)
      text = build_post_text(report)
      link = report_url(report)
      facets = build_link_facet(text, link)

      record = {
        '$type' => 'app.bsky.feed.post',
        'text' => text,
        'createdAt' => Time.current.iso8601,
        'facets' => facets
      }

      response = pds_post(
        '/xrpc/com.atproto.repo.createRecord',
        { repo: session['did'], collection: 'app.bsky.feed.post', record: record },
        bearer_token: session['accessJwt']
      )
      raise "Bluesky createRecord failed: #{response['error']}" if response['error']

      rkey = response['uri']&.split('/')&.last
      raise "Bluesky createRecord returned no uri (response: #{response.inspect})" if rkey.blank?

      rkey
    end

    def build_post_text(report)
      date = format_date(report.sighted_at)
      location = report.location.to_s[0, 80]
      shape = report.shape.to_s[0, 40]
      link = report_url(report)

      "UFO sighting in #{location} on #{date} - #{shape} shape. #{link} #UFO #UAP"
    end

    def build_link_facet(text, link)
      byte_start = text.byteindex(link)
      return [] unless byte_start

      [{
        'index' => {
          'byteStart' => byte_start,
          'byteEnd' => byte_start + link.bytesize
        },
        'features' => [{
          '$type' => 'app.bsky.richtext.facet#link',
          'uri' => link
        }]
      }]
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

    def pds_post(path, body, bearer_token: nil)
      uri = URI("https://#{PDS_HOST}#{path}")
      req = Net::HTTP::Post.new(uri)
      req['Content-Type'] = 'application/json'
      req['Authorization'] = "Bearer #{bearer_token}" if bearer_token
      req.body = body.to_json

      response = Net::HTTP.start(uri.hostname, uri.port,
                                 use_ssl: true, open_timeout: 10, read_timeout: 15) do |http|
        http.request(req)
      end

      parsed = begin
        JSON.parse(response.body.to_s)
      rescue JSON::ParserError
        {}
      end

      unless response.is_a?(Net::HTTPSuccess)
        raise "Bluesky request to #{path} failed: HTTP #{response.code} " \
              "#{parsed['error'] || response.message}"
      end

      parsed
    end
  end
end
