# frozen_string_literal: true

# Social media posting configuration.
# Credentials loaded from environment variables only -- never hardcode keys.
# Required env vars:
#   TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET
#   BLUESKY_HANDLE, BLUESKY_APP_PASSWORD

TWITTER_POSTING_ENABLED = ENV['TWITTER_API_KEY'].present?
BLUESKY_POSTING_ENABLED = ENV['BLUESKY_HANDLE'].present?
