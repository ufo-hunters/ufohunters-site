class Report
  
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
  field :links, type: Array
  field :source, type: String
  field :forma, type: Hash
  field :suma, type: Hash

  validates_presence_of :sighted_at, :message => "Sighted date is mandatory"
  validates_presence_of :reported_at, :message => "Reported date is mandatory"
  validates_presence_of :location, :message => "Location date is mandatory"
  validates_presence_of :shape, :message => "Shape date is mandatory"
  validates_presence_of :description, :message => "Description date is mandatory"
  
end
