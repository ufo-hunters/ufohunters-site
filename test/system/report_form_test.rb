# frozen_string_literal: true

require 'application_system_test_case'

class ReportFormTest < ApplicationSystemTestCase
  test 'submitting a valid report shows confirmation page' do
    visit new_report_path

    page.execute_script("document.getElementById('report_sighted_at').value = '2024-06-15'")
    fill_in 'report[shape]', with: 'Oval'
    fill_in 'report[duration]', with: '3 minutes'
    fill_in 'report[email]', with: 'witness@example.com'
    fill_in 'report[email_confirmation]', with: 'witness@example.com'
    fill_in 'report[location]', with: 'Madrid, Spain'
    fill_in 'report[description]', with: 'A bright oval object hovering over the city.'
    page.execute_script("document.getElementById('report_coord').value = '-3.7038,40.4168'")

    click_on "SEND UFO'S REPORT"

    assert_text 'New ufo reported!'
    assert_text 'Oval'
    assert_text 'Madrid, Spain'
  end

  test 'submitting report without required fields shows validation errors' do
    visit new_report_path

    click_on "SEND UFO'S REPORT"

    assert_selector '#error_explanation'
  end

  test 'submitting report saves with correct data in database' do
    visit new_report_path

    page.execute_script("document.getElementById('report_sighted_at').value = '2024-06-15'")
    fill_in 'report[shape]', with: 'Disc'
    fill_in 'report[duration]', with: '10 seconds'
    fill_in 'report[email]', with: 'db@example.com'
    fill_in 'report[email_confirmation]', with: 'db@example.com'
    fill_in 'report[location]', with: 'London, UK'
    fill_in 'report[description]', with: 'A disc-shaped object.'
    page.execute_script("document.getElementById('report_coord').value = '-0.1278,51.5074'")

    click_on "SEND UFO'S REPORT"

    assert_text 'New ufo reported!'

    report = Report.where(location: 'London, UK').first
    assert_not_nil report
    assert_equal 'Disc', report.shape
    assert_equal '20240615', report.sighted_at
    assert_equal [-0.1278, 51.5074], report.coord
  end
end
