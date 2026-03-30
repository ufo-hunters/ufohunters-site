# frozen_string_literal: true

class ImagekitUploadService
  MAX_WIDTH = 600
  JPEG_QUALITY = 75

  def upload(uploaded_file)
    return nil if uploaded_file.blank? || IMAGEKIT_CLIENT.nil?

    resized_path = resize_image(uploaded_file.tempfile.path)

    response = IMAGEKIT_CLIENT.upload_file(
      file: File.open(resized_path, 'rb'),
      file_name: sanitize_filename(uploaded_file.original_filename),
      folder: "sightings/#{Time.zone.today.strftime('%Y%m')}"
    )

    response[:response]['url']
  rescue StandardError => e
    Rails.logger.error "ImageKit upload failed: #{e.class}: #{e.message}"
    nil
  ensure
    clean_tempfile(resized_path) if defined?(resized_path) && resized_path != uploaded_file&.tempfile&.path
  end

  private

  def resize_image(path)
    image = MiniMagick::Image.open(path)
    image.resize "#{MAX_WIDTH}>"
    image.quality JPEG_QUALITY.to_s

    tempfile = Tempfile.new(['ik_upload', '.jpg'])
    image.write(tempfile.path)
    tempfile.path
  end

  def sanitize_filename(filename)
    File.basename(filename).gsub(/[^a-zA-Z0-9._-]/, '_')
  end

  def clean_tempfile(path)
    File.delete(path) if path && File.exist?(path)
  rescue StandardError
    nil
  end
end
