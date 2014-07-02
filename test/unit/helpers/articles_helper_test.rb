require 'test_helper'

class ArticlesHelperTest < ActionView::TestCase
  include ArticlesHelper

  setup do
    @articles = [
      Article.new(:title => "Title of 'article' one", :published_date => "20130101"),
      Article.new(:title => "Title&of&article&two", :published_date => "20130212"),
      Article.new(:title => "/Title/of/article/three/", :published_date => "20131106"),
      Article.new(:title => ".Title.of.article.four", :published_date => "20130721"),
      Article.new(:title => "Title? of article five?", :published_date => "20131209"),
      Article.new(:title => ".Title?of?'article' with lots of 'chars'&to&remove/replace.", :published_date => "20130329")
    ]

    @dates_to_format = ["20011201", "20140930", "19000221"]

  end

  test "should generate an article friendly title" do

    expected_responses = ["Title of article one-2013-01-01",
                          "Title-of-article-two-2013-02-12",
                          "-Title-of-article-three--2013-11-06",
                          "Titleofarticlefour-2013-07-21",
                          "Title- of article five--2013-12-09",
                          "Title-of-article with lots of chars-to-remove-replace-2013-03-29"]

    actual_responses = []

    @articles.each do |article|
      actual_responses << ArticlesHelper.friendly_title(article)
    end

    assert_equal actual_responses, expected_responses, "Something went wrong generating the friendly titles"

  end

  test "should format string date" do
    actual_responses = []
    expected_responses = ["2001-12-01", "2014-09-30", "1900-02-21"]

    @dates_to_format.each do |date_to_format|
      actual_responses << ArticlesHelper.format_date(date_to_format)
    end

    assert_equal actual_responses, expected_responses, "The formatted dates should match the specified format"

  end


end
