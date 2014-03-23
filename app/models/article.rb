class Article
  include Mongoid::Document
  field :title, type: String
  field :author, type: String
  field :published_date, type: String
  field :teaser, type: String
  field :body, type: String
  field :partial_1, type: String
end
