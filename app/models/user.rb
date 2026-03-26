# frozen_string_literal: true

class User
  include Mongoid::Document
  include ActiveModel::SecurePassword

  field :username, type: String
  field :_id, type: String, default: -> { username }
  field :password_digest, type: String
  field :email, type: String
  has_secure_password
  has_many :articles, dependent: :destroy

  validates :username, uniqueness: { message: 'already exists. Username must be unique' }
  validates :password, confirmation: { message: 'should match password' }
  validates :email, confirmation: { message: 'should match email' }
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, allow_blank: false }
end
