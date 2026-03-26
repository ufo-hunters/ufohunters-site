# frozen_string_literal: true

require 'test_helper'

class SessionControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = create_dummy_user
    @user.save!
  end

  test 'should login with valid credentials' do
    post sessions_path, params: { username: 'user1', password: 'secret' }

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
    post sessions_path, params: { username: 'user1', password: 'secret' }
    get sessions_destroy_path

    assert_response :redirect
  end
end
