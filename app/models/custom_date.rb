# frozen_string_literal: true

class CustomDate
  class << self
    def mongoize(object)
      return if object.blank?

      date = Date.parse(object.to_s)
      date.strftime('%A %d. %B %Y')
    end

    def demongoize(object)
      object.to_s
    end

    def evolve(object)
      mongoize(object)
    end
  end
end
