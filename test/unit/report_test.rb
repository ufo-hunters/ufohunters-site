# frozen_string_literal: true

require 'test_helper'

class ReportTest < ActiveSupport::TestCase
  setup do
    @report = create_dummy_report
  end

  test 'should not save report without a location' do
    @report.location = nil

    assert_not @report.save, 'Saved the report without a location'
  end

  test 'should not save report without dates' do
    @report.sighted_at = nil
    @report.reported_at = nil

    assert_not @report.save, 'Saved the report without sighted and reported date'
  end

  test 'should not save report without duration' do
    @report.duration = nil

    assert_not @report.save, 'Saved the report without a duration'
  end

  test 'should not save report without shape' do
    @report.shape = nil

    assert_not @report.save, 'Saved the report without a shape'
  end

  test 'should not save report without description' do
    @report.description = nil

    assert_not @report.save, 'Saved the report without a description'
  end

  test 'should save report with a blank email' do
    @report.email = nil

    assert @report.save, 'Did not save the report with a blank email'
  end

  test 'should not save report with not valid email' do
    @report.email = 'novalidemail'

    assert_not @report.save, 'Saved the report with not valid email'
  end

  test 'should not save report if confirmation email does not match email' do
    @report.email = 'test@email.com'
    @report.email_confirmation = 'doesnotmatch@email.com'

    assert_not @report.save, 'Saved the report with not matching emails'
  end

  test 'should_set_case_number' do
    case_number = 1022
    @report.case_number = case_number
    @report.save
    @report = create_dummy_report
    @report.case_number = nil

    assert @report.save && @report.case_number == case_number + 1,
           'Did not save the report without case number, or the case number is not correct'
  end
end
