class StatsController < ApplicationController

  caches_action :shape

  def index
    @ufo_list = Report.where(:status => 1, :coord.ne => nil).desc(:sighted_at).limit(2500)
    @numUFO = Report.where(:status => 1).count()
    @menu = "statistics"
    @page_title = "UFO Data Stats"
    @page_description = "A glance at our UFO Data using Data-Driven Documents"
  end

  def shape
    @ufos = Report.collection.aggregate({
       "$group" => { "_id" => {"shape" => "$shape"},
                     "count" => { "$sum" => 1 }} })
    respond_to do |format|
       format.json { render json: @ufos }
    end
  end

end
