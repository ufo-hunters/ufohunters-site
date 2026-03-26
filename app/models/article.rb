# frozen_string_literal: true

class Article
  include Mongoid::Document

  field :title, type: String
  field :published_date, type: String
  field :teaser, type: String
  field :body, type: String
  field :article_type, type: String
  field :image_thumbnail, type: String
  # date to filter the reports returned
  field :date_filter, type: String
  field :article_helper_method, type: String
  field :partial_1, type: String
  field :status, type: Integer, default: 0

  belongs_to :user

  validates :title, presence: { message: 'Title is mandatory' }
  validates :teaser, presence: { message: 'Teaser is mandatory' }
  validates :body, presence: { message: 'Body is mandatory' }

  index({ status: 1, published_date: -1 }, { background: true })
  index({ user_id: 1 }, { background: true })
end
