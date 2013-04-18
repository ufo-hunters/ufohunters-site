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
end
