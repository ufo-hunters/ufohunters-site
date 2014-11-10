class SightingsController < ApplicationController

   include ApplicationHelper

   caches_action :countriesList, :expires_in => 1.month

   def index
      @ufo_list = Rails.cache.fetch("sightings/latest", :expires_in => 3.hours) do
         Report.where(:status => 1, :coord.ne => nil).desc(:sighted_at).limit(100).entries
      end
      @menu = "index"
      @page_title = "Recent UFO Activity"
      @page_description = "Latest UFO Sightings all over the world"
   end

   def search
      id_ufo = params[:id]
      @ufo_list = Rails.cache.fetch("sightings/#{id_ufo}", :expires_in => 12.hours) do
         Report.find id_ufo
      end
      @coords = @ufo_list.coord
      distance = 100 #km

      if @ufo_list.coord
         @nearest_sightings = Rails.cache.fetch("sightings/nearest", :expires_in => 12.hours) do
            Report.where(:coord => { "$nearSphere" => @coords , "$maxDistance" => (distance.fdiv(6371)) }).and(:status => 1).desc(:sighted_at).limit(100).entries
         end
      end

      @menu = "index"
      @page_title = friendly_title(@ufo_list)
      @page_description = "UFO Report: " + @ufo_list.description[0..200] + "..."
   end


   def statistics
      @menu = "statistics"
      @listaUFO = Rails.cache.fetch("sightings/stats", :expires_in => 1.week) do
         Report.collection.aggregate({ "$group" =>
            {
               "_id" => {"shape" => "$shape"},
               "count" => { "$sum" => 1 }}
            },
            "$sort" => { "count" => -1 })
      end
      @page_title = "UFO Data Stats"
      @page_description = "A glance at our UFO Data using Data-Driven Documents"
   end

   def maps
      @listaMapEurope = Rails.cache.fetch("sightings/countries/europe", :expires_in => 1.month) do
         Countries.where(:continent => "Europe").order_by(:name.asc).entries
      end
      @listaMapAsia = Rails.cache.fetch("sightings/countries/asia", :expires_in => 1.month) do
         Countries.where(:continent => "Asia").order_by(:name.asc).entries
      end
      @listaMapNorthAmerica = Rails.cache.fetch("sightings/countries/northamerica", :expires_in => 1.month) do
         Countries.where(:continent => "North America").order_by(:name.asc).entries
      end
      @listaMapSouthAmerica = Rails.cache.fetch("sightings/countries/southamerica", :expires_in => 1.month) do
         Countries.where(:continent => "South America").order_by(:name.asc).entries
      end
      @listaMapAfrica = Rails.cache.fetch("sightings/countries/africa", :expires_in => 1.month) do
         Countries.where(:continent => "Africa").order_by(:name.asc).entries
      end
      @listaMapOceania = Rails.cache.fetch("sightings/countries/oceania", :expires_in => 1.month) do
         Countries.where(:continent => "Oceania").order_by(:name.asc).entries
      end
      @listaMap = Rails.cache.fetch("sightings/countries/all", :expires_in => 1.month) do
         Countries.all.order_by(:name.asc).entries
      end

      @menu = "maps"
      @page_title = "UFO Sightings Maps"
      @page_description = "Latest UFO Sightings Maps: Africa, Asia, Europe, North America, Oceania, South America"
   end

   # GET sightings/countrieslist.json
   def countrieslist
      @countries_list = Countries.all.order_by(:name.asc)

      respond_to do |format|
        format.json { render json: @countries_list }
      end
   end

   def northamerica
      @ufo_list = Rails.cache.fetch("sightings/maps/northamerica", :expires_in => 6.hours) do
         Report.where(:coord => {"$geoWithin" =>
            {"$polygon" => [[-169.45, 71.41],
               [-177.54, 51.40 ],
               [-123.04, 30.75 ],
               [-80.85, 24.20 ],
               [-42.18, 47.28 ],
               [-42.18, 47.28 ],
               [-94.57, 72.18 ],
               [-169.45, 71.41]]
            }}).and(:status => 1).without(:email,:description).order_by(:sighted_at.desc).limit(100).entries
      end

      @menu = "northamerica"
      @page_title = "UFO Sightings in North America"
      @page_description = "Latest UFO Sightings Maps: North America - UFO Reports in North America"

      respond_to do |format|
        format.html # index.html.erb
        format.json { render json: @ufo_list }
      end

   end

   def oceania
      @ufo_list = Rails.cache.fetch("sightings/maps/oceania", :expires_in => 12.hours) do
         Report.where(:coord => {"$geoWithin" =>
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
         }}).and(:status => 1).without(:email,:description).order_by(:sighted_at.desc).limit(100).entries
      end

      @menu = "maps"
      @page_title = "UFO Sightings in Oceania"
      @page_description = "Latest UFO Sightings Maps: Oceania - UFO Reports in Oceania"

      respond_to do |format|
        format.html # index.html.erb
        format.json { render json: @ufo_list }
      end

   end

   def southamerica
      @ufo_list = Rails.cache.fetch("sightings/maps/southamerica", :expires_in => 12.hours) do
         Report.where(:coord => {"$geoWithin" =>
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
            }}).and(:status => 1).without(:email,:description).order_by(:sighted_at.desc).limit(100).entries
      end

      @menu = "maps"
      @page_title = "UFO Sightings in South America"
      @page_description = "Latest UFO Sightings Maps: South America - UFO Reports in South America"

      respond_to do |format|
        format.html # index.html.erb
        format.json { render json: @ufo_list }
      end

   end

   def africa
      @ufo_list = Rails.cache.fetch("sightings/maps/africa", :expires_in => 12.hours) do
         Report.where(:coord => {"$geoWithin" =>
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
            }}).and(:status => 1).without(:email,:description).order_by(:sighted_at.desc).limit(100).entries
      end

      @menu = "maps"
      @page_title = "UFO Sightings in Africa"
      @page_description = "Latest UFO Sightings Maps: Africa - UFO Reports in Africa"

      respond_to do |format|
        format.html # index.html.erb
        format.json { render json: @ufo_list }
      end

   end

   def europe
      @ufo_list = Rails.cache.fetch("sightings/maps/europe", :expires_in => 12.hours) do
         Report.where(:coord => {"$geoWithin" =>
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
            }}).and(:status => 1).without(:email,:description).order_by(:sighted_at.desc).limit(100).entries
      end

      @menu = "maps"
      @page_title = "UFO Sightings in Europe"
      @page_description = "Latest UFO Sightings Maps: Europe - UFO Reports in Europe"

      respond_to do |format|
        format.html # index.html.erb
        format.json { render json: @ufo_list }
      end

   end

   def asia
      @ufo_list = Rails.cache.fetch("sightings/maps/asia", :expires_in => 12.hours) do
         Report.where(:coord => {"$geoWithin" =>
            {"$polygon" => [[30.93,74.68],
               [32.34,30.14],
               [41.13,12.55],
               [116.71,-10.83],
               [140.97,17.64],
               [164.53,50.29],
               [178.60,65.51],
               [91.75,79.43],
               [30.93,74.68]]
            }}).and(:status => 1).without(:email,:description).order_by(:sighted_at.desc).limit(100).entries
      end

      @menu = "maps"
      @page_title = "UFO Sightings in Asia"
      @page_description = "Latest UFO Sightings Maps: Asia - UFO Reports in Asia"

      respond_to do |format|
        format.html # index.html.erb
        format.json { render json: @ufo_list }
      end
   end

   def country
      country_code = params[:id]
      country_list = Rails.cache.fetch("sightings/country/#{country_code}", :expires_in => 1.month) do
         Countries.where({"cod" => country_code}).limit(1).entries
      end

      country_list.each do |country|
         @country_name = country.name
         @country_coord = country.center
         @zoom = country.zoom
         @the_country = country.geometry
      end

      type = ""
      coordinates = ""
      @the_country.each_with_index do |data, index|
         if index==0
            type = data[1]
         else
            coordinates =  data[1]
         end
      end

      if type == 'Polygon'
         @ufo_list = Rails.cache.fetch("sightings/country/#{country_code}/polygon", :expires_in => 1.day) do
            Report.where(:coord => {"$geoWithin" => {"$polygon" => coordinates[0]}}).and(:status => 1).without(:email).order_by(:sighted_at.desc).limit(100).entries
         end
      else
         coordinates.each_with_index do |data, index|
            if index == 0
               @ufo_list = Rails.cache.fetch("sightings/country/#{country_code}/polygon/#{index}", :expires_in => 1.day) do
                  Report.where(:coord => {"$geoWithin" => {"$polygon" => data[0]}}).and(:status => 1).without(:email).order_by(:sighted_at.desc).limit(100).entries
               end
            else
               @ufo_list = @ufo_list + Rails.cache.fetch("sightings/country/#{country_code}/polygon/#{index}", :expires_in => 1.day) do
                  Report.where(:coord => {"$geoWithin" => {"$polygon" => data[0]}}).and(:status => 1).without(:email).order_by(:sighted_at.desc).limit(100).entries
               end
            end
         end
      end
      @page_title = "UFO Sightings in " + @country_name
      @page_description = "Latest UFO Sightings Maps: " + @country_name + " - UFO Reports in " + @country_name

      @menu = "maps"
   end

   def videos
      @ufo_list = Rails.cache.fetch("sightings/video_gallery", :expires_in => 12.hours) do
         Report.where(:status => 1, :links.in => [/.*youtube.com.*/, /.*youtu.be.*/], :coord.ne => nil).desc(:sighted_at).limit(100).entries
      end

      @menu = "videos"
      @page_title = "Recent UFO Sighting Videos"
      @page_description = "Latest UFO Sighting Reports and Videos as witnesses reported them"

   end

   def images
      @ufo_list = Rails.cache.fetch("sightings/image_gallery", :expires_in => 12.hours) do
         Report.where(:status => 1 , :$or => [{:links => /(.jpg|.jpeg|.bmp|.gif|.png)$/i}, {:image_cloudinary.ne => nil}], :coord.ne => nil).desc(:sighted_at).limit(100).entries
      end

      @menu = "images"
      @page_title = "Recent UFO Sighting Images"
      @page_description = "Latest UFO Sighting Reports and Images as witnesses reported them"
   end

   def about
      @menu = "about"
      @page_title = "About"
      @page_description = "About ufo-hunters.com and who is behind this site"
   end


end
