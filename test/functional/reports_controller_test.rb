require 'test_helper'

class ReportsControllerTest < ActionController::TestCase

  setup do
    @report = create_dummy_report
    @report.sighted_at = "01/01/2012"
    @report.reported_at = "02/01/2012"
    @report.coord = "4.0314, 36.5411"
    @report.links = {:link1 => "http://www.youtube.com", :link2 => "http://www.google.com"}
  end

  test "should get index" do
    get :index, {:format => :json}
    assert_response :success
    assert_not_nil assigns(:reports)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create report" do
    assert_difference('Report.count') do
      post :create, report: @report.attributes
    end

    assert_redirected_to report_path(assigns(:report))
  end

  test "should show report" do
    @report = create_dummy_report
    @report.save
    get :show, id: Report.first.id
    assert_response :success
  end

end
