# frozen_string_literal: true

require 'test_helper'

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = create_dummy_user
    @user.save!
    @article = create_dummy_article
  end

  test 'should get index' do
    get articles_path

    assert_response :success
  end

  test 'should get index as json' do
    get articles_path(format: :json)

    assert_response :success
  end

  test 'should show article' do
    @article.status = 1
    @article.save!
    get article_path(id: @article.id)

    assert_response :success
  end

  test 'should get uforesearchteam' do
    get articles_uforesearchteam_path

    assert_response :success
  end

  test 'should redirect myspace without login' do
    get articles_myspace_path

    assert_response :redirect
  end

  test 'should get myspace when logged in' do
    login_as(@user)
    get articles_myspace_path

    assert_response :success
  end

  test 'should create article when logged in' do
    login_as(@user)
    assert_difference('Article.count') do
      post articles_path, params: {
        article: { title: 'New Article', teaser: 'Teaser', body: 'Body',
                   published_date: '20240101', user_id: 'user1' }
      }
    end

    assert_response :redirect
  end
end
