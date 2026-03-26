# frozen_string_literal: true

module ArticlesHelper
  ALLOWED_TAGS = %w[p br b i em strong a ul ol li h2 h3 h4 h5 blockquote img
                    table tr td th thead tbody div span hr pre code].freeze
  ALLOWED_ATTRIBUTES = %w[href src alt class rel width height id].freeze

  def sanitize_article(html)
    sanitize(html, tags: ALLOWED_TAGS, attributes: ALLOWED_ATTRIBUTES)
  end

  def self.get_articles_by_date(article)
    Rails.cache.fetch("articles/#{article.id}/#{article.date_filter}", expires_in: 1.month) do
      Report.where(sighted_at: article.date_filter).entries
    end
  end

  def self.friendly_title(article)
    return if article.blank?

    title = article.title
    title += "-#{format_date(article.published_date)}" if article.published_date.present?
    title.delete("'").tr('/', '-').tr('&', '-').tr('?', '-').delete('.')
  end

  def self.format_date(date)
    return if date.blank?

    begin
      date.to_date.strftime('%Y-%m-%d')
    rescue StandardError => e
      logger.info "Invalid date - #{e.class}: #{e.message}"
      ''
    end
  end
end
