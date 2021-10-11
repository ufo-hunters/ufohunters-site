module ApplicationHelper

  def format_date date
    unless date.blank?
      begin
        date.to_date.strftime("%A %d. %B %Y")
      rescue => ex
        Rails.logger.info "Invalid date - #{ex.class}: #{ex.message}"
        return ""
      end
    end
  end

  def format_date_rss date
    unless date.blank?
      begin
        date.to_date.strftime("%a, %d %B %Y %T")
      rescue => ex
        Rails.logger.info "Invalid date - #{ex.class}: #{ex.message}"
        return ""
      end
    end
  end

  def format_date_microdata date
    unless date.blank?
      begin
        date.to_date.strftime("%Y-%m-%d")
      rescue => ex
        Rails.logger.info "Invalid date - #{ex.class}: #{ex.message}"
        return ""
      end
    end
  end

  def youtube_link?(link)
    link =~ /(youtube|youtu.be)/
  end

  def youtube_video(url)
    video_id = youtube_video_id(url)

    render :partial => 'common/video', :locals => {:video_id => video_id} unless video_id.blank?
  end

  def youtube_video_id(url)
    begin
      uri = URI.parse(url)
      video_id = nil
      unless uri.query.blank?
        query_string = CGI.parse(uri.query)
        # v is the param in the query string having the video id when the host is youtube.com
        v = query_string['v']
        video_id = v[0] unless v.blank?
      else
        # when the host is youtu.be the video id is the path without the starting slash
        video_id = uri.path
        video_id = video_id[1..-1]
      end
    rescue => ex
        Rails.logger.info "Invalid uri - #{ex.class}: #{ex.message}"
        return nil
    end
  end

  def image_hosting_link?(link)
    link =~ /cloudinary.com/
  end

  def image_id(url)
    begin
        uri = URI.parse(url)
        path = uri.path.split('/')
        path[-2] << '/' << path[-1]

    rescue => ex
        Rails.logger.info "Invalid uri - #{ex.class}: #{ex.message}"
        return nil
    end
  end

  def friendly_title(ufo_report)
    title = "UFO Sighting"
    unless ufo_report.blank?
        title += " in " + ufo_report.location unless ufo_report.location.blank?
        title += " on " + format_date(ufo_report.sighted_at) unless ufo_report.sighted_at.blank?
        title.gsub("'","").gsub("/","-").gsub("&", "-").gsub("?","-").gsub(".","")
    end
  end

  def randow_image
    images = Dir.glob('public/5*/*.jpg')
    images_url = images.map do |s|
      s.gsub(/public/, 'https://www.ufo-hunters.com')
    end
    URI.escape(images_url.sample)
  end
end
