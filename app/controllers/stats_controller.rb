class StatsController < ApplicationController

  caches_action :index, :expires_in => 24.hour
  caches_action :shape, :expires_in => 1.month
  caches_action :reports_by_year, :expires_in => 24.hour

  def index
    @ufo_list = Report.where(:status => 1, :coord.ne => nil).desc(:sighted_at).limit(2500)
    @numUFO = Report.where(:status => 1).count()
    @menu = "statistics"
    @page_title = "UFO Data Stats"
    @page_description = "A glance at our UFO Data using Data-Driven Documents"

    @reports = reports_by_year

  end

  def shape
    @ufos = Report.collection.aggregate({
       "$group" => { "_id" => {"shape" => "$shape"},
                     "count" => { "$sum" => 1 }} })
    respond_to do |format|
       format.json { render json: @ufos }
    end
  end

  private
    def reports_by_year
      Report.collection.aggregate(
         {
          "$group" => {"_id" => {"$substr" => ["$sighted_at", 0, 4]},
                       "count" => {"$sum" => 1}}
         },
         {
          "$match" => {"_id" => {"$gte" => "1850"}}
         },
         {
          "$sort" => {"_id" => 1}
         }
      )
    end

end
