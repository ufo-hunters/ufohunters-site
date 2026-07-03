# frozen_string_literal: true

require 'test_helper'

class SessionControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = create_dummy_user
    @user.save!
  end

  test 'should login with valid credentials' do
    login_as(@user)

    assert_redirected_to articles_myspace_path
  end

  test 'should reject invalid password' do
    post sessions_path, params: { username: 'user1', password: 'wrong' }

    assert_redirected_to articles_uforesearchteam_path
  end

  test 'should reject nonexistent user' do
    post sessions_path, params: { username: 'nobody', password: 'secret' }

    assert_redirected_to articles_uforesearchteam_path
  end

  test 'should logout' do
    login_as(@user)
    get sessions_destroy_path

    assert_response :redirect
  end

  # Regression: a Mongo operator hash in the username must not be interpreted as
  # a query operator. With the correct password of an existing user, injecting
  # {$ne: ...} would otherwise match and log in without knowing the username.
  test 'should not authenticate via nosql operator injection on username' do
    post sessions_path, params: { username: { '$ne' => 'nobody' }, password: 'secret' }

    assert_redirected_to articles_uforesearchteam_path
  end
end
