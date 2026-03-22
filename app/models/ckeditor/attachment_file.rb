class Ckeditor::AttachmentFile < Ckeditor::Asset
  mount_uploader :data, CkeditorAttachmentFileUploader, mount_on: :data_file_name

  def url_thumb
    @url_thumb ||= "/images/ckeditor/filebrowser/thumbs/#{filename.split('.').last}.gif"
  end
end
