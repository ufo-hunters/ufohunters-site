# frozen_string_literal: true

require 'rgeo/geo_json'

class StatsController < ApplicationController
  def index
    @ufo_list = Rails.cache.fetch('stats/latest', expires_in: 1.day) do
      Report.where(status: 1, :coord.ne => nil).desc(:sighted_at).limit(2500).entries
    end

    @menu = 'statistics'
    @page_title = 'UFO Data Stats'
    @page_description = 'A glance at our UFO Data using Data-Driven Documents'

    @reports = reports_by_year
  end

  def map_json
    @ufo_list = Rails.cache.fetch('stats/latest', expires_in: 1.day) do
      Report.where(status: 1, :coord.ne => nil).desc(:sighted_at).limit(2500).entries
    end
    features = []
    @ufo_list.each do |ufo|
      point = "{\"type\":\"Point\",\"coordinates\": #{ufo.coord}}"
      geom = RGeo::GeoJSON.decode(point)
      factory = RGeo::GeoJSON::EntityFactory.instance
      feature = factory.feature(geom, nil, { id: ufo.id.to_s })
      features << feature
    end
    factory = RGeo::GeoJSON::EntityFactory.instance
    feature_collection = RGeo::GeoJSON.encode factory.feature_collection(features)

    respond_to do |format|
      format.html
      format.json { render json: feature_collection }
    end
  end

  def shape
    @ufos = Rails.cache.fetch('stats/shape', expires_in: 1.week) do
      Report.collection.aggregate([
                                    { '$group' => { '_id' => { 'shape' => '$shape' }, 'count' => { '$sum' => 1 } } }
                                  ]).to_a
    end

    respond_to do |format|
      format.json { render json: @ufos }
    end
  end

  private

  def reports_by_year
    Report.collection.aggregate([
                                  {
                                    '$group' => { '_id' => { '$substr' => ['$sighted_at', 0, 4] },
                                                  'count' => { '$sum' => 1 } }
                                  },
                                  {
                                    '$match' => { '_id' => { '$gte' => '1950' } }
                                  },
                                  {
                                    '$sort' => { '_id' => 1 }
                                  }
                                ])
  end
end
