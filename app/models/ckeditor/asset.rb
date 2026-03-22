class Ckeditor::Asset
  include Mongoid::Document
  include Mongoid::Timestamps

  field :data_file_name, type: String
  field :data_content_type, type: String
  field :data_file_size, type: Integer

  validates_presence_of :data
end
