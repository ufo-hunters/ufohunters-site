require 'test_helper'

class ArticlesControllerTest < ActionController::TestCase
  setup do
    @article = create_dummy_article
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:articles)
  end

  test "should show article" do
    @article.save
    get :show, id: Article.first.id
    assert_response :success
  end

end
