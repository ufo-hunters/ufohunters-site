# frozen_string_literal: true

xml.instruct! :xml, version: '1.0'
xml.rss(:version => '2.0', 'xmlns:georss' => 'http://www.georss.org/georss',
        'xmlns:gml' => 'http://www.opengis.net/gml') do
  xml.channel do
    xml.title('UFO-Hunters.com feed')
    xml.link('http://www.ufo-hunters.com/')
    xml.description("Latest UFO sightings of #{@nameCountry}")
    xml.updated(Time.zone.today)
    xml.language('en-us')
    @reports.each do |ufo_report|
      xml.item do
        xml.title(friendly_title(ufo_report))
        xml.link("http://www.ufo-hunters.com/sightings/search/#{ufo_report.id}/#{friendly_title(ufo_report)}",
                 'href' => "http://www.ufo-hunters.com/sightings/search/#{ufo_report.id}/#{friendly_title(ufo_report)}")
        numDescription = 300
        numDescription = ufo_report.description.length if ufo_report.description.length < 300
        xml.description("#{ufo_report.description.slice(0, numDescription)}...")
        xml.author('ufo-hunters.com')
        xml.pubDate("#{format_date_rss ufo_report.sighted_at.to_s} GMT")

        unless ufo_report.coord.nil?
          xml.georss :point do
            xml.text! "#{ufo_report.coord[1]} #{ufo_report.coord[0]}"
          end
        end
      end
    end
  end
end
