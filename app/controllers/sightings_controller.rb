class SightingsController < ApplicationController
  def index
	@listaUFO = UfoModel.all.desc(:name).limit(2)
	@numUFO = UfoModel.count()
        #http://two.mongoid.org/docs/querying/finders.html#all
	
  end
end
