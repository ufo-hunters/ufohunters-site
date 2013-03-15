class SightingsController < ApplicationController
  def index
	    @listaUFO = UfoModel.all.desc(:sighted_at).limit(20)
        @numUFO = UfoModel.count()
        #http://two.mongoid.org/docs/querying/finders.html#all
  end
end
