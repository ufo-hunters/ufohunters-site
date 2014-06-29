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

  #db.countries.ensureIndex({"cod":1}, {"background":true,"safe":true})
  index({cod:1},{background:true})

  #db.countries.ensureIndex({"continent":1}, {"background":true,"safe":true})
  index({continent:1},{background:true})

end
