# frozen_string_literal: true

xml.instruct! :xml, version: '1.0'
xml.rss(:version => '2.0', 'xmlns:georss' => 'http://www.georss.org/georss',
        'xmlns:gml' => 'http://www.opengis.net/gml') do
  xml.channel do
    xml.title('UFO-Hunters.com feed')
    xml.link('http://www.ufo-hunters.com/')
    xml.description('100 latest UFO sightings all over the world, own reports of ufo-hunters.com')
    xml.updated(Time.zone.today)
    xml.language('en-us')
    @reports.each do |numUFO|
      xml.item do
        xml.title(friendly_title(numUFO))
        xml.link("http://www.ufo-hunters.com/sightings/search/#{numUFO.id}/#{friendly_title(numUFO)}",
                 'href' => "http://www.ufo-hunters.com/sightings/search/#{numUFO.id}/#{friendly_title(numUFO)}")
        numDescription = 300
        numDescription = numUFO.description.length if numUFO.description.length < 300
        xml.description("#{numUFO.description.slice(0, numDescription)}...")
        xml.author('ufo-hunters.com')
        xml.pubDate("#{format_date_rss numUFO.sighted_at.to_s} GMT")

        unless numUFO.coord.nil?
          xml.georss :point do
            xml.text! "#{numUFO.coord[1]} #{numUFO.coord[0]}"
          end
        end
      end
    end
  end
end
