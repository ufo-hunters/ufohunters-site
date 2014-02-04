class Article
  include Mongoid::Document
  field :title, type: String
  field :author, type: String
  field :published_date, type: Date
  field :teaser, type: String
  field :body, type: String
end
