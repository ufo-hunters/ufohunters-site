class UfoModel
  include Mongoid::Document  
  store_in collection: "ufo"  
  field :sighted_at, type: String
  field :reported_at, type: String
  field :location, type: String
  field :shape, type: String
  field :duration, type: String
  field :description, type: String
  field :coord, type:Hash
end
