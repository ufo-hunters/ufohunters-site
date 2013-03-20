class CustomDate < String
  class << self
    def mongoize(object)
      return if object.blank?
      c = Date.parse(object);
      d = new Date(c);
      ::Date.mongoize(d.strftime("%A %d. %B %Y"))
    end
  end
end
