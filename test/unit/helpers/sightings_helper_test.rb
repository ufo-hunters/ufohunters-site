require 'test_helper'

class SightingsHelperTest < ActionView::TestCase
  include SightingsHelper

  setup do
    @urls = ["img1.jpg", "img.PNG", "http://www.unveiledfuture.com", "img.JPEG",
             "http://www.jpg.com", "img.bMp", "img.Gif", "http://youtu.be/xjFHveMSoYQ",
             "png.gif.com", "https://www.youtube.com/watch?v=rhKgzczo8UM&feature=player_embedded"]
  end

  test "should select image urls and other resources in two separate arrays" do

    expected_images = ["img1.jpg", "img.PNG", "img.JPEG", "img.bMp", "img.Gif"]
    expected_other_resources = ["http://www.unveiledfuture.com", "http://www.jpg.com", "http://youtu.be/xjFHveMSoYQ",
                                "png.gif.com", "https://www.youtube.com/watch?v=rhKgzczo8UM&feature=player_embedded"]

    image_resources, other_resources = select_url_images(@urls)

    assert_equal image_resources, expected_images , "Should contain only image resources"
    assert_equal other_resources, expected_other_resources , "Should not contain image resources"

  end

  test "should select youtube videos and other resources in two separate arrays" do

    expected_videos = ["http://youtu.be/xjFHveMSoYQ", "https://www.youtube.com/watch?v=rhKgzczo8UM&feature=player_embedded"]
    expected_other_resources = ["img1.jpg", "img.PNG", "http://www.unveiledfuture.com", "img.JPEG",
                                "http://www.jpg.com", "img.bMp", "img.Gif", "png.gif.com"]

    video_resources, other_resources = select_youtube_videos(@urls)

    assert_equal video_resources, expected_videos , "Should contain only image resources"
    assert_equal other_resources, expected_other_resources , "Should not contain image resources"

  end

end
