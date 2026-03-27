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

    assert_current_path articles_uforesearchteam_path
  end

  test 'signing up with valid credentials redirects to myspace' do
    visit articles_uforesearchteam_path

    fill_in 'user[username]', with: 'newuser'
    fill_in 'user[password]', with: 'secret123'
    fill_in 'user[password_confirmation]', with: 'secret123'
    fill_in 'user[email]', with: 'newuser@example.com'
    fill_in 'user[email_confirmation]', with: 'newuser@example.com'
    click_on 'Sign up'

    assert_current_path articles_myspace_path
  end

  test 'signing up with mismatched passwords shows error' do
    visit articles_uforesearchteam_path

    fill_in 'user[username]', with: 'newuser2'
    fill_in 'user[password]', with: 'secret123'
    fill_in 'user[password_confirmation]', with: 'different'
    fill_in 'user[email]', with: 'new2@example.com'
    fill_in 'user[email_confirmation]', with: 'new2@example.com'
    click_on 'Sign up'

    assert_text(/match/i)
  end

  test 'signing up with duplicate username shows error' do
    visit articles_uforesearchteam_path

    fill_in 'user[username]', with: 'testuser'
    fill_in 'user[password]', with: 'secret123'
    fill_in 'user[password_confirmation]', with: 'secret123'
    fill_in 'user[email]', with: 'dup@example.com'
    fill_in 'user[email_confirmation]', with: 'dup@example.com'
    click_on 'Sign up'

    assert_text(/already exists/i)
  end
end
