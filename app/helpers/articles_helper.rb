module ArticlesHelper

  def self.get_articles_by_date(article)
  	Report.where(:sighted_at => article.date_filter)
  end

end
