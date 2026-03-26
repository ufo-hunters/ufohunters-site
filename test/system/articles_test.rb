# frozen_string_literal: true

require 'application_system_test_case'

class ArticlesSystemTest < ApplicationSystemTestCase
  setup do
    @user = User.create!(username: 'author', password: 'secret123', email: 'author@example.com')
    @user.confirm!
    @article = Article.create!(
      title: 'The Phoenix Lights',
      teaser: 'A massive V-shaped formation was spotted over Phoenix.',
      body: '<p>On March 13, 1997, thousands of witnesses reported seeing lights.</p>',
      user_id: @user.id,
      published_date: '19970313',
      status: 1
    )
  end

  test 'viewing article list' do
    visit articles_path

    assert_text(/phoenix lights/i)
  end

  test 'viewing article detail' do
    visit article_path(@article)

    assert_text(/phoenix/i)
    assert_text(/1997/i)
  end

  test 'logged in user sees myspace' do
    visit articles_uforesearchteam_path
    fill_in 'username', with: 'author'
    fill_in 'password', with: 'secret123'
    click_on 'Log in', match: :first

    assert_current_path articles_myspace_path
    assert_text(/phoenix lights/i)
  end
end
