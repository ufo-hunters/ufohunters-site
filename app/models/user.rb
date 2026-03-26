# frozen_string_literal: true

class User
  include Mongoid::Document
  include ActiveModel::SecurePassword

  field :username, type: String
  field :_id, type: String, default: -> { username }
  field :password_digest, type: String
  field :email, type: String
  field :reset_token, type: String
  field :reset_sent_at, type: Time
  field :confirmation_token, type: String
  field :confirmed_at, type: Time
  has_secure_password
  has_many :articles, dependent: :destroy

  validates :username, uniqueness: { message: 'already exists. Username must be unique' }
  validates :password, confirmation: { message: 'should match password' }
  validates :email, confirmation: { message: 'should match email' }
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, allow_blank: false }
  validates :password, length: { minimum: 6, message: 'must be at least 6 characters' }, if: :password_digest_changed?

  index({ reset_token: 1 }, { unique: true, sparse: true })
  index({ confirmation_token: 1 }, { unique: true, sparse: true })

  def generate_reset_token!
    self.reset_token = SecureRandom.urlsafe_base64(32)
    self.reset_sent_at = Time.current
    save!(validate: false)
  end

  def reset_token_expired?
    reset_sent_at.nil? || reset_sent_at < 2.hours.ago
  end

  def clear_reset_token!
    self.reset_token = nil
    self.reset_sent_at = nil
    save!(validate: false)
  end

  def generate_confirmation_token!
    self.confirmation_token = SecureRandom.urlsafe_base64(32)
    save!(validate: false)
  end

  def confirm!
    self.confirmed_at = Time.current
    self.confirmation_token = nil
    save!(validate: false)
  end

  def confirmed?
    confirmed_at.present?
  end
end
