class StatsController < ApplicationController

  caches_action :shape, :expires_in => 1.week

  def index
    @ufo_list = Rails.cache.fetch("stats/latest", :expires_in => 1.day) do
      Report.where(:status => 1, :coord.ne => nil).desc(:sighted_at).limit(2500).entries
    end

    @menu = "statistics"
    @page_title = "UFO Data Stats"
    @page_description = "A glance at our UFO Data using Data-Driven Documents"

    @reports = reports_by_year

  end

  def shape
    @ufos = Report.collection.aggregate({
       "$group" => { "_id" => {"shape" => "$shape"},
                     "count" => { "$sum" => 1 }}
    })
    respond_to do |format|
       format.json { render json: @ufos }
    end
  end

  private
    def reports_by_year
      #Rails.cache.fetch("stats/reports_by_year", :expires_in => 1.day) do
        Report.collection.aggregate(
           [{
            "$group" => {"_id" => {"$substr" => ["$sighted_at", 0, 4]},
                         "count" => {"$sum" => 1}}
           },
           {
            "$match" => {"_id" => {"$gte" => "1950"}}
           },
           {
            "$sort" => {"_id" => 1}
           }]
        )
      #end
    end

end
