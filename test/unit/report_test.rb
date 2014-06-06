require 'test_helper'

class ArticleTest < ActiveSupport::TestCase

  setup do
    @report = create_dummy_report
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
