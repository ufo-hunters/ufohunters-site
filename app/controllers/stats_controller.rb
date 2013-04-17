class StatsController < ApplicationController

   def shape
      @ufos = UfoModel.collection.aggregate({
         "$group" => { "_id" => {"shape" => "$shape"}, 
                       "count" => { "$sum" => 1 }} })
      respond_to do |format|
         format.json { render json: @ufos }
      end

   end

end
