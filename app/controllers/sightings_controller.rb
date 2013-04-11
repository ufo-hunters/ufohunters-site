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
			  
			  @menu = "index" # se podr�a crear una pesta�a search para b�squedas por fecha y por continente
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
																					[ -9.26 , 43.64 ]]}})
			  @numUFO = UfoModel.count()
			  @menu = "spain"        	  
  end
end
