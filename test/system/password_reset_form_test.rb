# frozen_string_literal: true

require 'application_system_test_case'

class PasswordResetFormTest < ApplicationSystemTestCase
  setup do
    @user = User.create!(username: 'resetuser', password: 'secret123', email: 'reset@example.com')
  end

  test 'requesting a password reset redirects to login page' do
    visit new_password_reset_path

    fill_in 'email', with: 'reset@example.com'
    click_on 'Send Reset Link'

    assert_current_path articles_uforesearchteam_path
  end

  test 'requesting reset with unknown email shows same response' do
    visit new_password_reset_path

    fill_in 'email', with: 'nobody@example.com'
    click_on 'Send Reset Link'

    assert_current_path articles_uforesearchteam_path
  end

  test 'completing password reset via edit form' do
    @user.generate_reset_token!
    token = @user.reset_token

    visit edit_password_reset_path(token)

    fill_in 'password', with: 'newsecret456'
    fill_in 'password_confirmation', with: 'newsecret456'
    click_on 'Reset Password'

    assert_current_path articles_uforesearchteam_path
  end
end
