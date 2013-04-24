module SightingsHelper

   def format_date(date)
      unless date.blank?
         date.to_date.strftime("%A %d. %B %Y")
      end
   end

   def youtube_link?(link)
   	link =~ /(youtube|youtu.be)/
   end

   def youtube_video(url)
   	render :partial => 'common/video', :locals => {:url => url}
   end

end
