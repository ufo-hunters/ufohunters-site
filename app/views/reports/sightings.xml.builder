xml.instruct! :xml, :version=>"1.0"
xml.rss(:version => "1.0","xmlns:georss" => "http://www.georss.org/georss") {
xml.channel {
	xml.title("UFO-Hunters.com feed")
	xml.link("http://www.ufo-hunters.com/")
	xml.description("100 latest UFO sightings all over the world, own reports of ufo-hunters.com")
	xml.language("en-us")
	@reports.each do |numUFO|
	    xml.url do
	        xml.loc 
	        xml.changefreq("weekly")        
	      	xml.title(numUFO.location)
			xml.description(format_date numUFO.sighted_at)
			xml.author("ufo-hunters.com")
			xml.link( "http://www.ufo-hunters.com/sightings/search/", numUFO.id, "/", friendly_title(numUFO) )
			xml.georss :point do
              xml.text! numUFO.coord[0].to_s + " " + numUFO.coord[1].to_s 
            end
	    end
	end
	}
}


