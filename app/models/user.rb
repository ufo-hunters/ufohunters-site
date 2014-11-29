class User
  include Mongoid::Document
  include ActiveModel::SecurePassword
  field :username, type: String
  field :_id, type: String, default: ->{ username }
  field :password_digest, type: String
  field :email, type: String
  has_secure_password
  has_many :articles

  validates_uniqueness_of :username, :message => "already exists. Username must be unique"
  validates_confirmation_of :password, :message => "should match password"
  validates_confirmation_of :email, :message => "should match email"
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :allow_blank => false
end
