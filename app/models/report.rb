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

  before_create :set_case_number

  private

  def set_case_number
    last_case_number = Report.where(source: 'ufo-hunters.com').max(:case_number)
    self.case_number = last_case_number + 1 if last_case_number
  end

  index({ coord: '2dsphere' }, { background: true })
  index({ status: 1, links: 1 }, { background: true })
  index({ status: 1, location: 1 }, { background: true })
  index({ status: 1, sighted_at: -1 }, { background: true })
  index({ location: 1 }, { background: true })
  index({ sighted_at: -1 }, { background: true })
end
