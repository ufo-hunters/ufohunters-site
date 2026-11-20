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

  test 'show lists the published related articles in their stored order' do
    first = create_published_article(title: 'First Related')
    second = create_published_article(title: 'Second Related')
    draft = create_published_article(title: 'Draft Related', status: 0)
    @article.assign_attributes(status: 1, related_article_ids: [second.id, draft.id, first.id])
    @article.save!

    get article_path(id: @article.id)

    assert_select '#related-articles li', count: 2
    assert_select '#related-articles li:first-child a', text: /Second Related/
    assert_select '#related-articles', text: /Draft Related/, count: 0
  end

  test 'show related cards link to the article with its teaser' do
    related = create_published_article(title: 'First Related', teaser: 'First teaser')
    @article.assign_attributes(status: 1, related_article_ids: [related.id])
    @article.save!

    get article_path(id: @article.id)

    assert_response :success
    assert_select "#related-articles a[href^='/articles/#{related.id}/']", text: /First teaser/
  end

  test 'show has no related block when the article has no related articles' do
    @article.status = 1
    @article.save!

    get article_path(id: @article.id)

    assert_response :success
    assert_select '#related-articles', count: 0
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

  test 'should get new when logged in' do
    login_as(@user)
    get new_article_path

    assert_response :success
  end

  test 'should create article when logged in' do
    login_as(@user)
    assert_difference('Article.count') do
      post articles_path, params: {
        article: { title: 'New Article', teaser: 'Teaser', body: 'Body',
                   published_date: '20240101' }
      }
    end

    assert_response :redirect
  end

  # Regression: authorship must be bound server-side, not from params (mass assignment).
  test 'should bind a created article to the current user' do
    login_as(@user)
    post articles_path, params: {
      article: { title: 'Owned By Me', teaser: 'Teaser', body: 'Body', published_date: '20240101' }
    }

    assert_equal @user.id, Article.where(title: 'Owned By Me').first.user_id
  end

  # Regression (IDOR): a logged-in user must not be able to edit someone else's article.
  test 'should not let a user update another users article' do
    owner = User.create!(username: 'owner', password: 'secret', email: 'owner@example.com')
    victim = owner.articles.create!(title: 'Owned', teaser: 'T', body: 'B', published_date: '20240101')
    login_as(@user)

    patch article_path(id: victim.id), params: { article: { title: 'HACKED' } }

    assert_redirected_to articles_myspace_path
    assert_equal 'Owned', victim.reload.title
  end

  # Regression (IDOR): a logged-in user must not be able to delete someone else's article.
  test 'should not let a user destroy another users article' do
    owner = User.create!(username: 'owner', password: 'secret', email: 'owner@example.com')
    victim = owner.articles.create!(title: 'Owned', teaser: 'T', body: 'B', published_date: '20240101')
    login_as(@user)

    assert_no_difference('Article.count') do
      delete article_path(id: victim.id)
    end
    assert_redirected_to articles_myspace_path
  end

  test 'should let an owner update their own article' do
    login_as(@user)
    mine = @user.articles.create!(title: 'Mine', teaser: 'T', body: 'B', published_date: '20240101')

    patch article_path(id: mine.id), params: { article: { title: 'Updated' } }

    assert_equal 'Updated', mine.reload.title
  end

  private

  def create_published_article(attrs = {})
    article = create_dummy_article
    article.assign_attributes({ status: 1 }.merge(attrs))
    article.save!
    article
  end
end
