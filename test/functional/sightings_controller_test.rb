require 'test_helper'


class SightingsControllerTest < ActionController::TestCase

  setup do
  	Mongoid.default_session['ufo'].indexes.create(coord:'2d')
  	Mongoid.default_session['ufo'].indexes.create(status:1,links:1)
  	Mongoid.default_session['ufo'].indexes.create(status:1,location:1)
  	Mongoid.default_session['ufo'].indexes.create(status:1,sighted_at:-1)
  	Mongoid.default_session['ufo'].indexes.create(location:1)
  	Mongoid.default_session['ufo'].indexes.create(sighted_at:-1)
  end


  test "should get index" do
  	get :index
    assert_response :success
  end

  test "should get search" do
  	@ufo_list = create_dummy_report
    @ufo_list.save
    get :search, id: Report.first.id
    assert_response :success
  end

  test "should get statistics" do
  	get :statistics
    assert_response :success
  end

  test "should maps statistics" do
  	  get :maps
  	  assert_response :success
  end

  test "should maps countrieslist" do
  	  get :countrieslist, {:format => :json}
  	  assert_response :success
  end

  test "should maps northamerica" do
  	  get :northamerica
  	  assert_response :success
  end

  test "should maps northamerica json" do
  	  get :northamerica, {:format => :json}
  	  assert_response :success
  end

  test "should maps oceania" do
  	  get :oceania
  	  assert_response :success
  end

  test "should maps oceania json" do
  	  get :oceania, {:format => :json}
  	  assert_response :success
  end

  test "should maps southamerica" do
  	  get :southamerica
  	  assert_response :success
  end

  test "should maps southamerica json" do
  	  get :southamerica, {:format => :json}
  	  assert_response :success
  end

  test "should maps africa" do
  	  get :africa
  	  assert_response :success
  end

  test "should maps africa json" do
  	  get :africa, {:format => :json}
  	  assert_response :success
  end

  test "should maps europe" do
  	  get :europe
  	  assert_response :success
  end

  test "should maps europe json" do
  	  get :europe, {:format => :json}
  	  assert_response :success
  end

  test "should maps asia" do
  	  get :asia
  	  assert_response :success
  end

  test "should maps asia json" do
  	  get :asia, {:format => :json}
  	  assert_response :success
  end

  test "should maps videos" do
  	  get :videos
  	  assert_response :success
  end

  test "should maps images" do
  	  get :images
  	  assert_response :success
  end

  test "should maps about" do
  	  get :about
  	  assert_response :success
  end

  test "should maps country (HONDURAS)" do
  	  get :country, id: 'HND'
  	  assert_response :success
  end

  test "should maps country (ESP)" do
  	  get :country, id: 'ESP'
  	  assert_response :success
  end

   

end
 