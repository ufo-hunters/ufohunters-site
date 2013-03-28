class SightingsController < ApplicationController
  def index  	
	   	  @listaUFO = UfoModel.all.desc(:sighted_at).limit(100)
        	  @numUFO = UfoModel.count()
        	  
  end
  def search
  		  		idUfo = params[:id]
  		  		@listaUFO = UfoModel.find idUfo
  		  		@numUFO = UfoModel.count()
  end
  def spain  	
	   	  #@listaUFO = UfoModel.where(:coord => { "$center" => [ [ -3.688810, 40.420088 ], 7 ] }) 
        	  #@listaUFO = UfoModel.where(:coord.within => { "$center" => [ [ -3.688810, 40.420088 ], 1 ] })
        	  #location = [-3.688810, 40.420088]
			  distance = 700 #km        
			  location = [-3.688810, 40.420088]	  
        	  @listaUFO = UfoModel.where(:coord => {"$geoWithin" => {"$centerSphere" => [location, (distance.fdiv(6371) )]}})  	  
		     #@listaUFO = UfoModel.where(:coord => {"$near" => location , '$maxDistance' => distance.fdiv(111.12)}) 
			  @numUFO = UfoModel.count()
        	  
  end
end
