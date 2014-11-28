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

  validates_presence_of :title, :message => "Title is mandatory"
  validates_presence_of :teaser, :message => "Teaser is mandatory"
  validates_presence_of :body, :message => "Body is mandatory"
end
