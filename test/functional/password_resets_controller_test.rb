# frozen_string_literal: true

require 'test_helper'

class PasswordResetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = create_dummy_user
    @user.save!
  end

  test 'should get new' do
    get new_password_reset_path

    assert_response :success
  end

  test 'should create password reset for valid email' do
    post password_resets_path, params: { email: @user.email }

    assert_redirected_to new_session_path
    @user.reload

    assert_not_nil @user.reset_token
    assert_not_nil @user.reset_sent_at
  end

  test 'should redirect for nonexistent email without revealing info' do
    post password_resets_path, params: { email: 'nobody@example.com' }

    assert_redirected_to new_session_path
  end

  test 'should get edit with valid token' do
    @user.generate_reset_token!
    get edit_password_reset_path(@user.reset_token)

    assert_response :success
  end

  test 'should redirect edit with invalid token' do
    get edit_password_reset_path('invalidtoken')

    assert_redirected_to new_password_reset_path
  end

  test 'should redirect edit with expired token' do
    @user.generate_reset_token!
    @user.set(reset_sent_at: 3.hours.ago)
    get edit_password_reset_path(@user.reset_token)

    assert_redirected_to new_password_reset_path
  end

  test 'should update password with valid token' do
    @user.generate_reset_token!
    token = @user.reset_token

    patch password_reset_path(token), params: {
      password: 'newsecret',
      password_confirmation: 'newsecret'
    }

    assert_redirected_to new_session_path
    @user.reload

    assert_nil @user.reset_token
    assert @user.authenticate('newsecret')
  end

  test 'should reject mismatched passwords' do
    @user.generate_reset_token!
    token = @user.reset_token

    patch password_reset_path(token), params: {
      password: 'newsecret',
      password_confirmation: 'different'
    }

    assert_response :unprocessable_entity
  end
end
