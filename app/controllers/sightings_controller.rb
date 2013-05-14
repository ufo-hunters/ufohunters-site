class SightingsController < ApplicationController

   include ApplicationHelper
   
   caches_page :index, :expires_in => 4.hour
   caches_page :spain, :expires_in => 12.hour
   caches_page :maps, :expires_in => 24.hour
   caches_page :northamerica, :expires_in => 12.hour
   caches_page :oceania, :expires_in => 12.hour
   caches_page :southamerica, :expires_in => 12.hour
   caches_page :africa, :expires_in => 12.hour
   caches_page :europe, :expires_in => 12.hour
   caches_page :asia, :expires_in => 12.hour
   caches_page :videos, :expires_in => 12.hour
   caches_page :about, :expires_in => 24.hour
   caches_action :search, :layout => false
   caches_action :country, :layout => false
   caches_page :sitemap, :expires_in => 96.hour

   def index  	
      @listaUFO = Report.where(:status => 1, :coord.ne => nil).desc(:sighted_at).limit(100)
      @numUFO = Report.where(:status => 1).count()
      @menu = "index"
      @page_title = "Recent UFO Activity"
      @page_description = "Latest UFO Sightings all over the world"
   end

   def search
      @numUFO = Report.where(:status => 1).count()
      idUfo = params[:id]
      @listaUFO = Report.find idUfo
      @coordenadas = @listaUFO.coord
      distance = 100 #km 
      @listaUFOlist = Report.where(:coord => { "$nearSphere" => @coordenadas , "$maxDistance" => (distance.fdiv(6371)) }).and(:status => 1).limit(50)  
      @menu = "index" # se podr�a crear una pesta�a search para b�squedas por fecha y por continente
      @page_title = friendly_title(@listaUFO)
      @page_description = "UFO Report: " + @page_title
   end

   def spain
      @listaUFO = Report.where(:coord => {"$geoWithin" => 
		{"$polygon" => [[ -9.26 , 43.64 ],
				[ -1.9, 43.42 ],
				[ 3.24,42.73 ],
				[ 4.77, 39.43 ],
				[-1.35,36.22],
				[ -7.26 , 36.02 ],
				[ -7.19 , 41.70 ],
				[ -9.15 , 42.02 ],
				[ -9.26 , 43.64 ]]
		}}).and(:status => 1).order_by(:location.asc)

      @numUFO = Report.where(:status => 1).count()
      @menu = "spain"
      @page_title = "UFO Sightings in Spain"
      @page_description = "UFO Sighting Reports in Spain"
   end

   def statistics 
      @numUFO = Report.where(:status => 1).count()
      @menu = "statistics"  
      @listaUFO = Report.collection.aggregate({ "$group" => 
		{ "_id" => {"shape" => "$shape"}, 
		  "count" => { "$sum" => 1 }} },
        "$sort" => { "count" => -1 },
        "$limit" => 25)
      @page_title = "UFO Data Stats"
      @page_description = "A glance at our UFO Data using Data-Driven Documents"
   end

   def maps 
      @listaMap = Countries.all.order_by(:name.asc)
      @numUFO = Report.where(:status => 1).count()
      @menu = "maps"
      @page_title = "UFO Sightings Maps" 
      @page_description = "Latest UFO Sightings Maps: Africa, Asia, Europe, North America, Oceania, South America"
   end
  
   def northamerica 
      @listaUFO = Report.where(:coord => {"$geoWithin" => 
		{"$polygon" => [[-169.45, 71.41],
				[-177.54, 51.40 ],
				[-123.04, 30.75 ],
				[-80.85, 24.20 ],
				[-42.18, 47.28 ],
				[-42.18, 47.28 ],
				[-94.57, 72.18 ],
				[-169.45, 71.41]]
		}}).and(:status => 1).order_by(:sighted_at.desc).limit(100)
      @numUFO = Report.where(:status => 1).count()
      @menu = "maps"
      @page_title = "UFO Sightings in North America"
      @page_description = "Latest UFO Sightings Maps: North America - UFO Reports in North America"
   end

   def oceania
      @listaUFO = Report.where(:coord => {"$geoWithin" => 
		{"$polygon" => [[138.69141, 1.40611],
        			[175.42969, -14.09396],
        			[177.18750, -52.69636],
				[103.18359, -42.42346],
				[110.03906, -25.00597],
				[124.10156, -14.09396],
				[129.28711, -9.70906],
				[132.45117, -6.14055],
				[130.69336, -2.46018],
				[129.19922, -0.35156],
				[133.33008, 4.21494]]
		}}).and(:status => 1).order_by(:sighted_at.desc).limit(100)

      @numUFO = Report.where(:status => 1).count()
      @menu = "maps"
      @page_title = "UFO Sightings in Oceania"
      @page_description = "Latest UFO Sightings Maps: Oceania - UFO Reports in Oceania"
   end

   def southamerica 
      @listaUFO = Report.where(:coord => {"$geoWithin" => 
		{"$polygon" => [[-77.87, 11.00], 
				[-68.20, 14.26 ], 
				[-47.46, 4.39 ],
				[-30.05, -5.61 ],
				[-36.73, -19.97 ],
				[-45.70, -31.20 ],
				[-52.91, -37.71 ],
				[-61.87, -45.82],
				[-55.37, -51.61],
				[-61.17, -55.17],
				[-70.13, -57.42],
				[-78.22, -50.06],
				[-73.12, -20.79],
				[-84.19, -5.09],
				[-77.87, 11.00]]
		}}).and(:status => 1).order_by(:sighted_at.desc).limit(100)
      @numUFO = Report.where(:status => 1).count()
      @menu = "maps"
      @page_title = "UFO Sightings in South America"
      @page_description = "Latest UFO Sightings Maps: South America - UFO Reports in South America"
   end

   def africa 
      @listaUFO = Report.where(:coord => {"$geoWithin" => 
		{"$polygon" => [[5.09,38.41],
				[-8.08,35.17],
				[-20.39,28.14],
				[-26.19,17.81],
				[-15.64,4.04],
				[3.51,0.87],
				[14.76,-36.03],
				[32.69,-34.30],
				[55.89,22.26],
				[53.08,12.04],
				[5.09,38.41],
				[23.40,37.44],
				[5.09,38.41]]
		}}).and(:status => 1).order_by(:sighted_at.desc).limit(100)

      @numUFO = Report.where(:status => 1).count()
      @menu = "maps"
      @page_title = "UFO Sightings in Africa"
      @page_description = "Latest UFO Sightings Maps: Africa - UFO Reports in Africa"
   end

   def europe 
      @listaUFO = Report.where(:coord => {"$geoWithin" => 
		{"$polygon" => [[-10.41,36.73],
				[-6.37,35.99],
				[-2.27,36.16],
				[10.76,38.82],
				[12.83,36.45],
				[17.13,36.13],
				[22.14,34.88],
				[27.50,34.37],
				[29.97,44.02],
				[39.02,47.69],
				[32.87,56.75],
				[32.60,70.08],
				[18.80,70.98],
				[10.10,66.33],
				[-17.05,67.74],
				[-30.23,66.01],
				[-10.41,36.73]]
		}}).and(:status => 1).order_by(:sighted_at.desc).limit(100)

      @numUFO = Report.where(:status => 1).count()
      @menu = "maps"
      @page_title = "UFO Sightings in Europe"
      @page_description = "Latest UFO Sightings Maps: Europe - UFO Reports in Europe"
   end

   def asia 
      @listaUFO = Report.where(:coord => {"$geoWithin" => 
		{"$polygon" => [[30.93,74.68],
				[32.34,30.14],
				[41.13,12.55],
				[116.71,-10.83],
				[140.97,17.64],
				[164.53,50.29],
				[178.60,65.51],
				[91.75,79.43],
				[30.93,74.68]]
		}}).and(:status => 1).order_by(:sighted_at.desc).limit(100)

      @numUFO = Report.where(:status => 1).count()
      @menu = "maps"
      @page_title = "UFO Sightings in Asia"
      @page_description = "Latest UFO Sightings Maps: Asia - UFO Reports in Asia"
   end

   def country 
      nameCountry = params[:id]
      listaCiudad = Countries.where({"cod" => nameCountry}).limit(1)
      
      listaCiudad.each do |country| 
         @namecity = country.name
	      @ciudad = country.geometry
      end
      
      type = ""
      coordinates = ""
      @ciudad.each_with_index do |datos, index| 
         if index==0
            type = datos[1]			  			
         else
            coordinates =  datos[1]
         end
      end

      if type == 'Polygon'
         @listaUFO = Report.where(:coord => {"$geoWithin" => {"$polygon" => coordinates[0]}}).and(:status => 1).order_by(:sighted_at.desc).limit(100)
      else
         coordinates.each_with_index do |coordinatesdatos,index| 	
            if index == 0
               @listaUFO = Report.where(:coord => {"$geoWithin" => {"$polygon" => coordinatesdatos[0]}}).and(:status => 1).order_by(:sighted_at.desc).limit(100)
            else
               @listaUFO = @listaUFO + Report.where(:coord => {"$geoWithin" => {"$polygon" => coordinatesdatos[0]}}).and(:status => 1).order_by(:sighted_at.desc).limit(100)
            end			
         end
      end			  

      @numUFO = Report.where(:status => 1).count()
      @menu = "maps"
   end

   def videos   
      @listaUFO = Report.where(:status => 1, :links.in => [/.*youtube.com.*/, /.*youtu.be.*/], :coord.ne => nil).desc(:sighted_at).limit(100)
      @numUFO = Report.where(:status => 1).count()
      @menu = "videos"
      @page_title = "Recent UFO Sighting Videos"
      @page_description = "Latest UFO Sighting Reports and Videos as witnesses reported them"

   end

   def about
   	@numUFO = Report.where(:status => 1).count()
      @menu = "about"
   	@page_title = "About"
      @page_description = "About ufo-hunters.com and who's behind this site"
   end

   def sitemap
      @numUFO = Report.where(:status => 1)
   end

end
