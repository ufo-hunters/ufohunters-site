class SightingsController < ApplicationController
  def index
	@listaUFO = UfoModel.all.desc(:sighted_at).limit(20)
        @numUFO = UfoModel.count()
  end
end
