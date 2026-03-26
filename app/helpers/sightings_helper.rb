# frozen_string_literal: true

module SightingsHelper
  include ApplicationHelper

  def select_url_images(urls)
    url_images = urls.grep(/(.jpg|.jpeg|.bmp|.gif|.png)$/i)

    [url_images, urls - url_images]
  end

  def select_youtube_videos(urls)
    url_videos = urls.select do |url|
      youtube_link? url
    end

    [url_videos, urls - url_videos]
  end
end
