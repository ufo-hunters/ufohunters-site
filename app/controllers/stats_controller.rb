class StatsController < ApplicationController

	caches_action :shape

   def shape
      @ufos = Report.collection.aggregate({
         "$group" => { "_id" => {"shape" => "$shape"}, 
                       "count" => { "$sum" => 1 }} })
      respond_to do |format|
         format.json { render json: @ufos }
      end

   end

end
