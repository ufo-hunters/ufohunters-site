# frozen_string_literal: true

require 'application_system_test_case'

class AuthTest < ApplicationSystemTestCase
  setup do
    @user = User.create!(username: 'testuser', password: 'secret123', email: 'test@example.com')
  end

  test 'visiting the login page' do
    visit articles_uforesearchteam_path

    assert_selector 'input[name="username"]'
    assert_selector 'input[name="password"]'
  end

  test 'logging in with valid credentials' do
    visit articles_uforesearchteam_path

    fill_in 'username', with: 'testuser'
    fill_in 'password', with: 'secret123'
    click_on 'Log in', match: :first

    assert_current_path articles_myspace_path
  end

  test 'logging in with invalid credentials shows error' do
    visit articles_uforesearchteam_path

    fill_in 'username', with: 'testuser'
    fill_in 'password', with: 'wrongpassword'
    click_on 'Log in', match: :first

    assert_text(/invalid username or password/i)
  end

  test 'visiting forgot password page' do
    visit articles_uforesearchteam_path
    click_on 'Forgot password?'

    assert_selector 'input[name="email"]'
  end

  test 'requesting password reset' do
    visit new_password_reset_path

    fill_in 'email', with: 'test@example.com'
    click_on 'Send Reset Link', match: :first

    assert_text(/reset link has been sent/i)
  end
end
