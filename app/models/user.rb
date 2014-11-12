class User
  include Mongoid::Document
  include ActiveModel::SecurePassword
  field :username, type: String
  field :_id, type: String, default: ->{ username }
  field :password_digest, type: String
  has_secure_password
  has_many :articles
  validates_uniqueness_of :username, :message => "Sorry, username must be unique"
end
