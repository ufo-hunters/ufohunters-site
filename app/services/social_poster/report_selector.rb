# frozen_string_literal: true

module SocialPoster
  class ReportSelector
    def self.candidate_for(platform)
      new(platform).candidate
    end

    def initialize(platform)
      @platform = platform
    end

    def candidate
      already_posted_ids = SocialPost.where(platform: @platform).pluck(:report_id)

      match = {
        'status' => 1,
        'reported_at' => { '$gte' => 1.month.ago.strftime('%Y%m%d') }
      }

      if already_posted_ids.any?
        bson_ids = already_posted_ids.filter_map do |id|
          BSON::ObjectId.from_string(id)
        rescue BSON::Error::InvalidObjectId
          id
        end
        match['_id'] = { '$nin' => bson_ids }
      end

      doc = Report.collection.aggregate([
                                          { '$match' => match },
                                          { '$sample' => { 'size' => 1 } }
                                        ]).first
      return nil unless doc

      Report.instantiate(doc)
    end
  end
end
