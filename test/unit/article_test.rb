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

  test 'featured defaults to false' do
    assert_not Article.new.featured
  end

  test 'Article.featured returns the featured published article' do
    article = create_featured_article

    assert_equal article, Article.featured
  end

  test 'Article.featured ignores unpublished articles' do
    create_featured_article(status: 0)

    assert_nil Article.featured
  end

  test 'Article.featured ignores articles that are not featured' do
    create_featured_article(featured: false)

    assert_nil Article.featured
  end

  test 'Article.featured picks the most recent published_date' do
    create_featured_article(title: 'Old', published_date: '20120102')
    newest = create_featured_article(title: 'New', published_date: '20240102')

    assert_equal newest, Article.featured
  end

  test 'Article.featured is nil when there are none' do
    assert_nil Article.featured
  end

  test 'related_article_ids defaults to an empty list' do
    assert_empty Article.new.related_article_ids
  end

  test 'related_articles does not touch the related articles' do
    other = create_featured_article(title: 'Other', featured: false)
    hub = create_featured_article(title: 'Hub', related_article_ids: [other.id])

    assert_equal [other.id], hub.reload.related_article_ids
    assert_empty other.reload.related_article_ids
  end

  test 'published_related_articles keeps the stored order' do
    first = create_featured_article(title: 'First', featured: false, published_date: '20100101')
    second = create_featured_article(title: 'Second', featured: false, published_date: '20240101')
    third = create_featured_article(title: 'Third', featured: false, published_date: '20150101')
    hub = create_featured_article(title: 'Hub', related_article_ids: [third.id, first.id, second.id])

    assert_equal %w[Third First Second], hub.published_related_articles.map(&:title)
  end

  test 'published_related_articles skips unpublished articles' do
    draft = create_featured_article(title: 'Draft', featured: false, status: 0)
    live = create_featured_article(title: 'Live', featured: false)
    hub = create_featured_article(title: 'Hub', related_article_ids: [draft.id, live.id])

    assert_equal [live], hub.published_related_articles
  end

  test 'published_related_articles skips the body field' do
    other = create_featured_article(title: 'Other', featured: false)
    hub = create_featured_article(title: 'Hub', related_article_ids: [other.id])

    assert_raises(Mongoid::Errors::AttributeNotLoaded) { hub.published_related_articles.first.body }
  end

  test 'published_related_articles is empty without related ids' do
    assert_empty create_featured_article.published_related_articles
  end

  private

  def create_featured_article(attrs = {})
    article = create_dummy_article
    article.assign_attributes({ status: 1, featured: true }.merge(attrs))
    article.save!
    article
  end
end
