SitemapGenerator::Sitemap.default_host = "https://www.ufo-hunters.com"

SitemapGenerator::Sitemap.create do
  # Static pages
  add root_path, changefreq: 'daily', priority: 1.0
  add sightings_maps_path, changefreq: 'weekly', priority: 0.9
  add sightings_about_path, changefreq: 'monthly', priority: 0.5
  add articles_path, changefreq: 'weekly', priority: 0.8
  add new_report_path, changefreq: 'monthly', priority: 0.6
  add sightings_videos_path, changefreq: 'weekly', priority: 0.7
  add sightings_images_path, changefreq: 'weekly', priority: 0.7
  add stats_path, changefreq: 'weekly', priority: 0.6

  # Articles
  Article.where(status: 1).each do |article|
    add article_path(article), lastmod: article.updated_at, changefreq: 'monthly', priority: 0.7
  end

  # Sightings (latest 10,000 for manageable sitemap size)
  Report.where(status: 1, :coord.ne => nil).desc(:sighted_at).limit(10_000).each do |report|
    add sightings_search_path(id: report.id, title: report.location&.parameterize),
        lastmod: report.reported_at&.to_date,
        changefreq: 'never',
        priority: 0.5
  end
end
