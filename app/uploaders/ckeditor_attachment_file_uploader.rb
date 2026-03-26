# frozen_string_literal: true

class CkeditorAttachmentFileUploader < CarrierWave::Uploader::Base
  storage :file

  def store_dir
    "uploads/ckeditor/attachments/#{model.id}"
  end

  def extension_allowlist
    %w[doc docx xls odt ods pdf rar zip tar swf]
  end
end
