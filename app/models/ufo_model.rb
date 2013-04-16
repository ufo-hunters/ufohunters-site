class UfoModel
  include Mongoid::Document  

  store_in collection: "ufo"  
  
  field :id, type: String
  field :sighted_at, type: String
  field :reported_at, type: String
  field :location, type: String
  field :shape, type: String
  field :duration, type: String
  field :description, type: String
  field :coord, type: Array
  field :forma, type: Hash
  field :suma, type: Hash
  
end
