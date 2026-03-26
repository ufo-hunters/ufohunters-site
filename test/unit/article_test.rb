# frozen_string_literal: true

require 'test_helper'

class ArticleTest < ActiveSupport::TestCase
  setup do
    @user = create_dummy_user
    @user.save!
    @article = create_dummy_article
  end

  test 'should save valid article' do
    assert @article.save, 'Did not save a valid article'
  end

  test 'should not save article without title' do
    @article.title = nil

    assert_not @article.save, 'Saved article without title'
  end

  test 'should not save article without teaser' do
    @article.teaser = nil

    assert_not @article.save, 'Saved article without teaser'
  end

  test 'should not save article without body' do
    @article.body = nil

    assert_not @article.save, 'Saved article without body'
  end

  test 'should belong to user' do
    @article.save!

    assert_equal 'user1', @article.user_id
  end

  test 'should default status to 0' do
    article = Article.new(title: 'T', teaser: 'Te', body: 'B', user_id: 'user1')

    assert_equal 0, article.status
  end
end
