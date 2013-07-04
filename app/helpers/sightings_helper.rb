module SightingsHelper

  include ApplicationHelper

  def select_url_images (urls)
    
    url_images = urls.select do |url|
      url =~ /(.jpg|.jpeg|.bmp|.gif|.png)$/i
    end

    return url_images, urls - url_images
  end

  def select_youtube_videos (urls)
 
    url_videos = urls.select do |url|
      youtube_link? url
    end

    return url_videos, urls - url_videos

  end

end
