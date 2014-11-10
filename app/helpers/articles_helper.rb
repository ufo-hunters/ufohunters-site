module ArticlesHelper

  def self.get_articles_by_date(article)
    Rails.cache.fetch("articles/#{article.id}/#{article.date_filter}", :expires_in => 1.month) do
      Report.where(:sighted_at => article.date_filter).entries
    end
  end

  def self.friendly_title(article)
    unless article.blank?
      title = article.title
      title += "-" + self.format_date(article.published_date) unless article.published_date.blank?
      title.gsub("'","").gsub("/","-").gsub("&", "-").gsub("?","-").gsub(".","")
    end
  end

  def self.format_date date
    unless date.blank?
      begin
        date.to_date.strftime("%Y-%m-%d")
      rescue => ex
        logger.info "Invalid date - #{ex.class}: #{ex.message}"
        return ""
      end
    end
  end

end
