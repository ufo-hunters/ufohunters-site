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
end
