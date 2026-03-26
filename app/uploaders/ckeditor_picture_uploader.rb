# frozen_string_literal: true

class CkeditorPictureUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave
  include CarrierWave::MiniMagick

  process :extract_dimensions

  version :thumb do
    process resize_to_fill: [118, 100]
  end

  version :content do
    process resize_to_limit: [800, 800]
  end

  def extension_allowlist
    %w[jpg jpeg png gif tiff]
  end
end
