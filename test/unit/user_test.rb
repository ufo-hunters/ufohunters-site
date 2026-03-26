# frozen_string_literal: true

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  setup do
    @user = create_dummy_user
  end

  test 'should save valid user' do
    assert @user.save, 'Did not save a valid user'
  end

  test 'should not save user with invalid email' do
    @user.email = 'invalid-email'

    assert_not @user.save, 'Saved user with invalid email'
  end

  test 'should save user with valid email' do
    @user.email = 'valid@example.com'

    assert @user.save, 'Did not save user with valid email'
  end

  test 'should not save duplicate username' do
    @user.save!
    duplicate = User.new(username: 'user1', password: 'secret2', email: 'other@example.com')

    assert_not duplicate.save, 'Saved user with duplicate username'
  end

  test 'should have secure password' do
    @user.save!
    found = User.find('user1')

    assert found.authenticate('secret'), 'Password authentication failed'
    assert_not found.authenticate('wrong'), 'Wrong password authenticated'
  end

  test 'should use username as _id' do
    @user.save!

    assert_equal 'user1', @user._id
  end

  test 'should have many articles' do
    @user.save!
    article = Article.create!(title: 'Test', teaser: 'Teaser', body: 'Body', user: @user)

    assert_includes @user.articles, article
  end

  test 'should generate reset token' do
    @user.save!
    @user.generate_reset_token!

    assert_not_nil @user.reset_token
    assert_not_nil @user.reset_sent_at
  end

  test 'should detect expired reset token' do
    @user.save!
    @user.generate_reset_token!

    assert_not @user.reset_token_expired?

    @user.set(reset_sent_at: 3.hours.ago)

    assert_predicate @user, :reset_token_expired?
  end

  test 'should clear reset token' do
    @user.save!
    @user.generate_reset_token!
    @user.clear_reset_token!

    assert_nil @user.reset_token
    assert_nil @user.reset_sent_at
  end
end
