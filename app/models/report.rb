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
  field :email, type: String
  field :image_cloudinary, type: Array
  field :image, type: String
  field :status, type: Integer

  

  validates_presence_of :sighted_at, :message => "Sighted date is mandatory"
  validates_presence_of :reported_at, :message => "Reported date is mandatory"
  validates_presence_of :location, :message => "Location is mandatory"
  validates_presence_of :duration, :message => "Duration is mandatory"
  validates_presence_of :shape, :message => "Shape is mandatory"
  validates_presence_of :description, :message => "Description is mandatory"

  #db.ufo.ensureIndex({"coord":"2d"}, {"background":true,"safe":true})
  index({coord:'2d'},{background:true})

  #db.ufo.ensureIndex({"status":1,"links":1}, {"background":true,"safe":true})
  index({status:1,links:1},{background:true})

  #db.ufo.ensureIndex({"status":1,"location":1}, {"background":true,"safe":true})
  index({status:1,location:1},{background:true})

  #db.ufo.ensureIndex({"status":1,"sighted_at":-1}, {"background":true,"safe":true})
  index({status:1,sighted_at:-1},{background:true})

  #db.ufo.ensureIndex({"location":1}, {"background":true,"safe":true})
  index({location:1},{background:true})

  #db.ufo.ensureIndex({"sighted_at":-1}, {"background":true,"safe":true})
  index({sighted_at:-1},{background:true})

end
