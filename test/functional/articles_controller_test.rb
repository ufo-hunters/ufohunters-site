# frozen_string_literal: true

require 'test_helper'

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = create_dummy_user
    @article = create_dummy_article
  end

  test 'should get index' do
    get articles_path

    assert_response :success
  end

  test 'should show article' do
    @user.save!
    @article.save!
    get article_path(id: @article.id)

    assert_response :success
  end
end
