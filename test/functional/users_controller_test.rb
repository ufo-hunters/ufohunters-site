# frozen_string_literal: true

require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test 'should redirect to uforesearchteam on failed recaptcha' do
    post users_path, params: {
      user: {
        username: 'newuser',
        password: 'password123',
        password_confirmation: 'password123',
        email: 'new@example.com',
        email_confirmation: 'new@example.com'
      }
    }

    assert_response :redirect
  end
end
