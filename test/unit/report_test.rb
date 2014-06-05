require 'test_helper'

class ArticleTest < ActiveSupport::TestCase

  setup do
    @report = Report.new
    @report.sighted_at = "20120101"
    @report.reported_at = "20120102"
    @report.location = "My Location"
    @report.shape = "My Shape"
    @report.duration = "1 min."
    @report.description = "My description"
    @report.coord = [4.0314, 36.5411]
    @report.links = ["http://www.youtube.com", "http://www.google.com"]
    @report.source = "My Source"
    @report.email = "email@email.com"
  end

  test "should not save report without a location" do
    @report.location = nil
    assert !@report.save, "Saved the report without a location"
  end

  test "should not save report without dates" do
    @report.sighted_at = nil
    @report.reported_at = nil
    assert !@report.save, "Saved the report without sighted and reported date"
  end

  test "should not save report without duration" do
    @report.duration = nil
    assert !@report.save, "Saved the report without a duration"
  end

  test "should not save report without shape" do
    @report.shape = nil
    assert !@report.save, "Saved the report without a shape"
  end

  test "should not save report without description" do
    @report.description = nil
    assert !@report.save, "Saved the report without a description"
  end

end
