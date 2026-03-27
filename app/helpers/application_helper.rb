# frozen_string_literal: true

require 'cgi'

module ApplicationHelper
  include Pagy::Frontend

  def format_date(date)
    return if date.blank?

    begin
      date.to_date.strftime('%A %d. %B %Y')
    rescue StandardError => e
      Rails.logger.info "Invalid date - #{e.class}: #{e.message}"
      ''
    end
  end

  def format_date_rss(date)
    return if date.blank?

    begin
      date.to_date.strftime('%a, %d %B %Y %T')
    rescue StandardError => e
      Rails.logger.info "Invalid date - #{e.class}: #{e.message}"
      ''
    end
  end

  def format_date_microdata(date)
    return if date.blank?

    begin
      date.to_date.strftime('%Y-%m-%d')
    rescue StandardError => e
      Rails.logger.info "Invalid date - #{e.class}: #{e.message}"
      ''
    end
  end

  def youtube_link?(link)
    link =~ /(youtube|youtu.be)/
  end

  def youtube_video(url)
    video_id = youtube_video_id(url)

    render partial: 'common/video', locals: { video_id: video_id } if video_id.present?
  end

  def youtube_video_id(url)
    uri = URI.parse(url)
    if uri.query.blank?
      # when the host is youtu.be the video id is the path without the starting slash
      video_id = uri.path
      video_id[1..]
    else
      query_string = CGI.parse(uri.query)
      # v is the param in the query string having the video id when the host is youtube.com
      v = query_string['v']
      v[0] if v.present?
    end
  rescue StandardError => e
    Rails.logger.info "Invalid uri - #{e.class}: #{e.message}"
    nil
  end

  def imagekit_url?(url)
    url.to_s.include?('ik.imagekit.io')
  end

  def imagekit_thumb(url, width: 140, height: 105)
    return url unless imagekit_url?(url)

    "#{url}?tr=w-#{width},h-#{height},c-at_max"
  end

  def friendly_title(ufo_report)
    title = 'UFO Sighting'
    return if ufo_report.blank?

    title += " in #{ufo_report.location}" if ufo_report.location.present?
    title += " on #{format_date(ufo_report.sighted_at)}" if ufo_report.sighted_at.present?
    title.delete("'").tr('/', '-').tr('&', '-').tr('?', '-').delete('.')
  end
end
