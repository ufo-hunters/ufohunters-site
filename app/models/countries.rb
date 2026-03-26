# frozen_string_literal: true

class Countries
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  store_in collection: 'countries'

  field :id, type: String
  field :cod, type: String
  field :name, type: String
  field :geometry, type: Hash
  field :type, type: String
  field :coordinates, type: String
  field :zoom, type: String
  field :continent, type: String
  field :center, type: Array

  index({ cod: 1 }, { background: true })
  index({ continent: 1 }, { background: true })
end
