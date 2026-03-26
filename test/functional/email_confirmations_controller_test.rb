# frozen_string_literal: true

require 'test_helper'

class EmailConfirmationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = create_dummy_user
    @user.save!
    @user.generate_confirmation_token!
  end

  test 'should confirm email with valid token' do
    get confirm_email_path(token: @user.confirmation_token)

    assert_redirected_to articles_uforesearchteam_path
    @user.reload

    assert_predicate @user, :confirmed?
    assert_nil @user.confirmation_token
  end

  test 'should reject invalid confirmation token' do
    get confirm_email_path(token: 'invalidtoken')

    assert_redirected_to articles_uforesearchteam_path
  end
end
