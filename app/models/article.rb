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
  # at most one article is shown on the home page: the most recent published featured one
  field :featured, type: Boolean, default: false

  belongs_to :user
  # one-sided and hand-curated (set via mongosh): the order of related_article_ids is the display order
  # Mongoid has no has_many :through; a one-sided HABTM stores the ordered id array on the document
  has_and_belongs_to_many :related_articles, class_name: 'Article', inverse_of: nil # rubocop:disable Rails/HasAndBelongsToMany

  validates :title, presence: { message: 'Title is mandatory' }
  validates :teaser, presence: { message: 'Teaser is mandatory' }
  validates :body, presence: { message: 'Body is mandatory' }

  index({ status: 1, published_date: -1 }, { background: true })
  index({ featured: 1, status: 1, published_date: -1 }, { background: true })
  index({ user_id: 1 }, { background: true })

  def self.featured
    where(status: 1, featured: true).desc(:published_date).without(:body).first
  end

  def published_related_articles
    return [] if related_article_ids.blank?

    Article.where(:_id.in => related_article_ids, status: 1).without(:body)
           .sort_by { |article| related_article_ids.index(article.id) }
  end
end
