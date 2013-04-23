module SightingsHelper

   def format_date(date)
      unless date.blank?
         date.to_date.strftime("%A %d. %B %Y")
      end
   end

end
