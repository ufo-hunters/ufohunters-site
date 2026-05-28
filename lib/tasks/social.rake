# frozen_string_literal: true

namespace :social do
  desc 'Post one random UFO sighting to Twitter/X (run once per day via cron)'
  task twitter: :environment do
    unless TWITTER_POSTING_ENABLED
      puts 'Twitter posting disabled (TWITTER_API_KEY not set)'
      next
    end

    tweet_id = SocialPoster::Twitter.post_random_sighting
    puts tweet_id ? "Twitter: posted tweet #{tweet_id}" : 'Twitter: no candidates available'
  end

  desc 'Post one random UFO sighting to Bluesky (run once per hour via cron)'
  task bluesky: :environment do
    unless BLUESKY_POSTING_ENABLED
      puts 'Bluesky posting disabled (BLUESKY_HANDLE not set)'
      next
    end

    rkey = SocialPoster::Bluesky.post_random_sighting
    puts rkey ? "Bluesky: posted record #{rkey}" : 'Bluesky: no candidates available'
  end
end
