class SightingsController < ApplicationController
  def index  	
			  @listaUFO = UfoModel.all.desc(:sighted_at).limit(100)
			  @numUFO = UfoModel.count()
			  @menu = "index"        	  
  end
  def search
  		  	  @numUFO = UfoModel.count()
			  
			  idUfo = params[:id]
  		  	  @listaUFO = UfoModel.find idUfo
			  @coordenadas = @listaUFO.coord
			  distance = 100 #km 
			  @listaUFOlist = UfoModel.where(:coord => { "$nearSphere" => @coordenadas , "$maxDistance" => (distance.fdiv(6371)) }).limit(50)  
  		  	  #@listaUFOlist = UfoModel.where(:coord => { "$near" => { "$geometry"  => [ "coordinates" => @coordenadas, "$maxDistance" => (distance.fdiv(6371)) ]} })
			  
			  @menu = "index" # se podría crear una pestaña search para búsquedas por fecha y por continente
  end
  def spain  	
	   	      #@listaUFO = UfoModel.where(:coord => { "$center" => [ [ -3.688810, 40.420088 ], 7 ] }) 
        	  #@listaUFO = UfoModel.where(:coord.within => { "$center" => [ [ -3.688810, 40.420088 ], 1 ] })
        	  #location = [-3.688810, 40.420088]
        	  #@listaUFO = UfoModel.where(:coord => {"$near" => location , '$maxDistance' => distance.fdiv(111.12)}) 
			  #distance = 700 #km        
			  #location = [-3.688810, 40.420088]	  
        	  #@listaUFO = UfoModel.where(:coord => {"$geoWithin" => {"$centerSphere" => [location, (distance.fdiv(6371) )]}})  	  
		     @listaUFO = UfoModel.where(:coord => {"$geoWithin" => {"$polygon" => [[ -9.26 , 43.64 ] , 
																					[ -1.9, 43.42 ] , 
																					[ 3.24,42.73 ], 
																					[ 4.77, 39.43 ],
																					[-1.35,36.22],
																					[ -7.26 , 36.02 ],
																					[ -7.19 , 41.70 ],
																					[ -9.15 , 42.02 ],
																					[ -9.26 , 43.64 ]]}}).order_by(:location.asc)
			  @numUFO = UfoModel.count()
			  @menu = "spain"        	  
  end
  def statistics 
			  @numUFO = UfoModel.count()
			  @menu = "statistics"  
			  @listaUFO = UfoModel.collection.aggregate({ "$group" =>
												  { "_id" => {"shape" => "$shape"}, "count" => { "$sum" => 1 } } 
											   })
  end
  def maps 
  			  @listaMap = Countries.all.order_by(:name.asc)
			  @numUFO = UfoModel.count()
			  @menu = "maps"  
  end
  def northamerica 
			  @listaUFO = UfoModel.where(:coord => {"$geoWithin" => {"$polygon" => [[-169.45, 71.41] , 
																					[-177.54, 51.40 ] , 
																					[-123.04, 30.75 ] ,
																					[-80.85, 24.20 ] ,
																					[-42.18, 47.28 ] ,
																					[-42.18, 47.28 ] ,
																					[-94.57, 72.18 ] ,
																					[-169.45, 71.41]
																					]}}).order_by(:sighted_at.desc).limit(100)
			  @numUFO = UfoModel.count()
			  @menu = "maps"
  end

  def oceania

     @listaUFO = UfoModel.where(:coord => {
			"$geoWithin" => {
				"$polygon" => [
					[138.69141, 1.40611],
        				[175.42969, -14.09396],
        				[177.18750, -52.69636],
					[103.18359, -42.42346],
					[110.03906, -25.00597],
					[124.10156, -14.09396],
					[129.28711, -9.70906],
					[132.45117, -6.14055],
					[130.69336, -2.46018],
					[129.19922, -0.35156],
					[133.33008, 4.21494]
				]}
			}).order_by(:sighted_at.desc).limit(100)

      @numUFO = UfoModel.count()
      @menu = "maps"
  end
  def southamerica 
			  @listaUFO = UfoModel.where(:coord => {"$geoWithin" => {"$polygon" => [[-77.87, 11.00] , 
																					[-68.20, 14.26 ] , 
																					[-47.46, 4.39 ] ,
																					[-30.05, -5.61 ] ,
																					[-36.73, -19.97 ] ,
																					[-45.70, -31.20 ] ,
																					[-52.91, -37.71 ] ,
																					[-61.87, -45.82] ,
																					[-55.37, -51.61] ,
																					[-61.17, -55.17] ,
																					[-70.13, -57.42],
																					[-78.22, -50.06],
																					[-73.12, -20.79],
																					[-84.19, -5.09],
																					[-77.87, 11.00]
																					]}}).order_by(:sighted_at.desc).limit(100)
			  @numUFO = UfoModel.count()
			  @menu = "maps"

  end
  def africa 
			  @listaUFO = UfoModel.where(:coord => {"$geoWithin" => {"$polygon" => [[5.09,38.41], 
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
																					[5.09,38.41]
																					]}}).order_by(:sighted_at.desc).limit(100)

			  @numUFO = UfoModel.count()
			  @menu = "maps"
  end
  def europe 
			  @listaUFO = UfoModel.where(:coord => {"$geoWithin" => {"$polygon" => [[-10.41,36.73], 
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
																					[-10.41,36.73]
																					]}}).order_by(:sighted_at.desc).limit(100)

			  @numUFO = UfoModel.count()
			  @menu = "maps"
  end
  def asia 
			  @listaUFO = UfoModel.where(:coord => {"$geoWithin" => {"$polygon" => [[30.93,74.68], 
																					[32.34,30.14], 
																					[41.13,12.55],
																					[116.71,-10.83],
																					[140.97,17.64], 
																					[164.53,50.29], 
																					[178.60,65.51], 
																					[91.75,79.43],
																					[30.93,74.68]
																					]}}).order_by(:sighted_at.desc).limit(100)

			  @numUFO = UfoModel.count()
			  @menu = "maps"
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
			  			@listaUFO = UfoModel.where(:coord => {"$geoWithin" => {"$polygon" => coordinates[0]}}).order_by(:sighted_at.desc).limit(100)
			  else
			  		coordinates.each_with_index do |coordinatesdatos,index| 	
			  					if index == 0
			  						@listaUFO = UfoModel.where(:coord => {"$geoWithin" => {"$polygon" => coordinatesdatos[0]}}).order_by(:sighted_at.desc).limit(100)
			  					else
			  						@listaUFO = @listaUFO + UfoModel.where(:coord => {"$geoWithin" => {"$polygon" => coordinatesdatos[0]}}).order_by(:sighted_at.desc).limit(100)
			  					end			
			  		end
			  end			  

			  @numUFO = UfoModel.count()
			  @menu = "maps"
  end
end
