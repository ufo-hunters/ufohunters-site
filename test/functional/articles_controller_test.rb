require 'test_helper'

class ArticlesControllerTest < ActionController::TestCase
  setup do
    @user = create_dummy_user
    @article = create_dummy_article
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:articles)
  end

  test "should show article" do
    @user.save
    @article.save
    get :show, id: Article.first.id
    assert_response :success
  end

end
