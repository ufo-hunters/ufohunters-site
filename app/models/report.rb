# frozen_string_literal: true

class Report
  include Mongoid::Document

  store_in collection: 'ufo'

  field :id, type: String
  field :sighted_at, type: String
  field :reported_at, type: String
  field :location, type: String
  field :shape, type: String
  field :duration, type: String
  field :description, type: String
  field :coord, type: Array
  field :links, type: Array
  field :source, type: String
  field :email, type: String
  field :image_cloudinary, type: Array
  field :image_imagekit, type: Array
  field :status, type: Integer
  field :case_number, type: Integer

  validates :sighted_at, presence: { message: 'Sighted date is mandatory' }
  validates :reported_at, presence: { message: 'Reported date is mandatory' }
  validates :location, presence: { message: 'Location is mandatory' }
  validates :duration, presence: { message: 'Duration is mandatory' }
  validates :shape, presence: { message: 'Shape is mandatory' }
  validates :description, presence: { message: 'Description is mandatory' }
  validates :email, confirmation: { message: 'Should match contact email confirmation' }
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, allow_blank: true }
  validate :coord_must_be_valid_pair
  validate :sighted_at_must_be_plausible, if: :sighted_at_changed?

  before_create :set_case_number

  private

  # coord feeds a 2dsphere index; a malformed value makes MongoDB reject the
  # write with an unrescued OperationFailure (500 + lost report). Reject it at
  # the model layer so the user gets a form error instead. [0, 0] is the app's
  # "no coordinates" sentinel and is allowed.
  def coord_must_be_valid_pair
    return if coord.blank?

    unless coord.is_a?(Array) && coord.size == 2 && coord.all?(Numeric)
      errors.add(:coord, 'must be a [longitude, latitude] pair')
      return
    end

    lng, lat = coord
    errors.add(:coord, 'longitude must be between -180 and 180') unless lng.between?(-180, 180)
    errors.add(:coord, 'latitude must be between -90 and 90') unless lat.between?(-90, 90)
  end

  # sighted_at is stored as a "YYYYMMDD" string. Date.strptime happily accepts
  # five-digit years ("52026-06-21" -> "520260621"), which no date helper can
  # read back. Only checked when the field changes so legacy documents with
  # odd dates can still be edited. One day of slack covers reporters whose
  # local date is already ahead of the server's.
  def sighted_at_must_be_plausible
    return if sighted_at.blank?

    date = Date.strptime(sighted_at, '%Y%m%d') if sighted_at.match?(/\A\d{8}\z/)
    return if date&.between?(Date.new(1900, 1, 1), Time.zone.today + 1)

    errors.add(:sighted_at, 'Sighted date must be between 1900 and today')
  rescue Date::Error
    errors.add(:sighted_at, 'Sighted date must be between 1900 and today')
  end

  def set_case_number
    return if case_number.present?

    last_case_number = Report.where(source: 'ufo-hunters.com').max(:case_number)
    self.case_number = (last_case_number || 0) + 1
  end

  index({ coord: '2dsphere' }, { background: true })
  index({ status: 1, links: 1 }, { background: true })
  index({ status: 1, location: 1 }, { background: true })
  index({ status: 1, sighted_at: -1 }, { background: true })
  index({ location: 1 }, { background: true })
  index({ sighted_at: -1 }, { background: true })
end
