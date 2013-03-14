class UfoModel
  include Mongoid::Document

  store_in collection: "ufo"

  field :name, type: String
  field :tipo_ovni, type: String

end
