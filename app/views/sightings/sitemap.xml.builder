xml.instruct!
xml.urlset "xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9" do

  xml.url do
    xml.loc "http://www.ufo-hunters.com"
    xml.priority 1.0
  end
  xml.url do
    xml.loc "http://www.ufo-hunters.com/"
    xml.priority 1.0
  end
  xml.url do
    xml.loc "http://www.ufo-hunters.com/sightings/about"
    xml.changefreq("weekly")
    xml.priority 0.85
  end
  xml.url do
    xml.loc "http://www.ufo-hunters.com/sightings/africa"
    xml.changefreq("weekly")
    xml.priority 0.85
  end
  xml.url do
    xml.loc "http://www.ufo-hunters.com/sightings/asia"
    xml.changefreq("weekly")
    xml.priority 0.85
  end
  xml.url do
    xml.loc "http://www.ufo-hunters.com/sightings/europe"
    xml.changefreq("weekly")
    xml.priority 0.85
  end
  xml.url do
    xml.loc "http://www.ufo-hunters.com/sightings/maps"
    xml.changefreq("weekly")
    xml.priority 0.85
  end
  xml.url do
    xml.loc "http://www.ufo-hunters.com/sightings/northamerica"
    xml.changefreq("weekly")
    xml.priority 0.85
  end
  xml.url do
    xml.loc "http://www.ufo-hunters.com/sightings/oceania"
    xml.changefreq("weekly")
    xml.priority 0.85
  end
  xml.url do
    xml.loc "http://www.ufo-hunters.com/sightings/southamerica"
    xml.changefreq("weekly")
    xml.priority 0.85
  end
  xml.url do
    xml.loc "http://www.ufo-hunters.com/sightings/spain"
    xml.changefreq("weekly")
    xml.priority 0.85
  end
  xml.url do
    xml.loc "http://www.ufo-hunters.com/sightings/statistics"
    xml.changefreq("weekly")
    xml.priority 0.85
  end

  @numUFO.each do |numUFO|
    xml.url do
      xml.loc "http://www.ufo-hunters.com/sightings/search/", numUFO.id, "/", friendly_title(numUFO)
      xml.changefreq("weekly")
      xml.priority 0.75
    end
  end

end