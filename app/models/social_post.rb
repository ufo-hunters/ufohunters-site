# frozen_string_literal: true

class SocialPost
  include Mongoid::Document
  include Mongoid::Timestamps

  PLATFORMS = %w[twitter bluesky].freeze

  field :platform,    type: String
  field :report_id,   type: String
  field :external_id, type: String
  field :posted_at,   type: Time

  validates :platform,  presence: true, inclusion: { in: PLATFORMS }
  validates :report_id, presence: true, uniqueness: { scope: :platform }
  validates :posted_at, presence: true

  index({ platform: 1, report_id: 1 }, { unique: true, background: true })
  index({ platform: 1, posted_at: -1 }, { background: true })
end
