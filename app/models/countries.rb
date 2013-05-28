class Countries
  include Mongoid::Document  

  store_in collection: "countries"  
  
  field :id, type: String
  field :cod, type: String
  field :name, type: String
  field :geometry, type: Hash
  field :type, type: String
  field :coordinates, type: String
  field :zoom, type: String
  field :continent, type: String
  field :center, type: Array
end
