# frozen_string_literal: true

require 'digest'
require 'json'

module MongoUpgrade
  # Exercises every MongoDB feature the app relies on, through the real controller
  # actions, and fingerprints what each one returned. Run it on the current production
  # version to get a baseline, then on every upgraded version and compare: the app must
  # return the same sightings, in the same order, for the same requests.
  #
  # Development only: it disables caching, CSRF and reCAPTCHA for its own requests and
  # creates (then deletes) a test sighting, article and user.
  class FeatureCheck
    MARKER = 'mongo-upgrade-feature-check'

    # Real places with sightings nearby, used for the proximity searches.
    POINTS = {
      'madrid' => [-3.7038, 40.4168], 'new_york' => [-74.006, 40.7128],
      'phoenix' => [-112.074, 33.4484], 'london' => [-0.1276, 51.5072],
      'sydney' => [151.2093, -33.8688], 'mexico_city' => [-99.1332, 19.4326],
      'toronto' => [-79.3832, 43.6532], 'buenos_aires' => [-58.3816, -34.6037]
    }.freeze
    DATE_RANGES = [%w[2000-01-01 2009-12-31], %w[2010-01-01 2026-12-31]].freeze
    COUNTRIES = %w[ESP USA GBR MEX ARG AUS CAN BRA ITA DEU].freeze
    CONTINENTS = %w[northamerica southamerica europe asia africa oceania].freeze
    SKIPPED_IVARS = /\A@_|\A@(marked_for_same_origin_verification|page_title|page_description|menu|notice)\z/

    def initialize(session)
      @session = session
      @result = { 'reads' => {}, 'explain' => {}, 'writes' => {} }
    end

    def run
      reads
      explains
      writes
      @result
    end

    private

    # --- Reads: every page and endpoint that queries MongoDB ---------------------------

    def reads
      sample_ids = Report.where(status: 1, :coord.ne => nil).asc(:_id).limit(5).pluck(:_id).map(&:to_s)
      article_ids = Article.where(status: 1).asc(:_id).limit(3).pluck(:_id).map(&:to_s)

      paths = ['/', '/?page=2', '/?page=50', '/stats', '/map_json.json', '/stats/shape.json',
               '/sightings/maps', '/sightings/videos', '/sightings/images', '/sightings/countrieslist.json',
               '/reports.json', '/reports/sightings.xml', '/articles', '/articles/uforesearchteam']
      paths += CONTINENTS.map { |continent| "/sightings/#{continent}" }
      paths += COUNTRIES.map { |code| "/sightings/country/#{code}/x" }
      paths += COUNTRIES.first(3).map { |code| "/reports/#{code}/country.xml" }
      paths += sample_ids.flat_map { |id| ["/sightings/search/#{id}/x", "/reports/#{id}.json"] }
      paths += article_ids.map { |id| "/articles/#{id}" }
      paths += POINTS.values.map { |lng, lat| "/reports/nearof/#{lng}/#{lat}/nearest.json" }
      paths.each { |path| request(:get, path) }

      POINTS.each do |name, (lng, lat)|
        DATE_RANGES.each do |from, to|
          request(:post, '/sightings/ufosearchresults', "search #{name} #{from}..#{to}",
                  params: { coord: "#{lng},#{lat}", startdate: from, enddate: to })
        end
      end

      @result['reads']['max case_number'] = Report.where(source: 'ufo-hunters.com').max(:case_number)
      @result['reads']['published count'] = Report.where(status: 1).count
    end

    def request(verb, path, label = nil, params: {})
      label ||= "#{verb.upcase} #{path}"
      started = Process.clock_gettime(Process::CLOCK_MONOTONIC)
      @session.public_send(verb, path, params: params)
      elapsed = Process.clock_gettime(Process::CLOCK_MONOTONIC) - started
      @result['reads'][label] = { 'status' => @session.response.status, 'ms' => (elapsed * 1000).round,
                                  'data' => controller_data }
    end

    # Everything a controller loaded from MongoDB and handed to its view.
    def controller_data
      controller = @session.controller
      return {} unless controller

      controller.instance_variables.each_with_object({}) do |ivar, data|
        next if SKIPPED_IVARS.match?(ivar.to_s)

        print = fingerprint(controller.instance_variable_get(ivar))
        data[ivar.to_s] = print unless print.nil?
      end
    end

    def fingerprint(value)
      case value
      when Mongoid::Document then { 'doc' => value.id.to_s, 'digest' => digest(value.attributes) }
      when Mongoid::Criteria then fingerprint(value.entries)
      when Mongo::Collection::View::Aggregation then { 'rows' => normalize_rows(value.to_a) }
      when Array then fingerprint_array(value)
      when Integer, Float then value
      when Hash then { 'digest' => digest(value) }
      end
    end

    def fingerprint_array(values)
      return { 'docs' => [] } if values.empty?
      return { 'rows' => normalize_rows(values) } if values.all?(Hash)
      return unless values.all?(Mongoid::Document)

      { 'docs' => values.map { |doc| doc.id.to_s },
        'sort_keys' => values.map { |doc| doc.attributes['sighted_at'].to_s },
        'digest' => digest(values.map(&:attributes)) }
    end

    # Group results that tie on count have no defined order: sort them deterministically.
    def normalize_rows(rows)
      rows.map { |row| JSON.parse(row.to_json) }.sort_by(&:to_json)
    end

    def digest(object)
      Digest::SHA256.hexdigest(object.to_json)[0, 16]
    end

    # --- Which index each key query uses (a change is a performance risk) --------------

    def explains
      madrid = POINTS['madrid']
      spain = Countries.where(cod: 'ESP').first&.geometry
      queries = {
        'nearSphere 100 km' => Report.where(coord: { '$nearSphere' => madrid, '$maxDistance' => 100.fdiv(6371) })
                               .and(status: 1).desc(:sighted_at).limit(100),
        'nearSphere + dates' => Report.where(coord: { '$nearSphere' => madrid, '$maxDistance' => 200.fdiv(6371) })
                                .and(status: 1).and(sighted_at: { '$gte' => '20000101' })
                                      .and(sighted_at: { '$lte' => '20261231' }).desc(:sighted_at).limit(200),
        'latest published' => Report.where(status: 1, :coord.ne => nil).desc(:sighted_at).limit(20),
        'links regex' => Report.where(status: 1, :links.in => [/.*youtube.com.*/, /.*youtu.be.*/],
                                      :coord.ne => nil).desc(:sighted_at).limit(20),
        'country by cod' => Countries.where(cod: 'ESP').limit(1)
      }
      if spain && spain['type'] == 'Polygon'
        polygon = { '$geoWithin' => { '$polygon' => spain['coordinates'][0] } }
        queries['geoWithin polygon'] = Report.where(coord: polygon).and(status: 1).desc(:sighted_at).limit(100)
      end
      queries.each do |name, criteria|
        @result['explain'][name] = index_names(criteria.explain.dig('queryPlanner', 'winningPlan')).sort
      end
    end

    def index_names(node)
      case node
      when Hash then node.flat_map { |key, value| key.to_s == 'indexName' ? [value] : index_names(value) }.uniq
      when Array then node.flat_map { |item| index_names(item) }.uniq
      else []
      end
    end

    # --- Writes: create a sighting the way users do, find it, delete it ----------------

    def writes
      social_posts_existed = Mongoid.default_client.database.collection_names.include?('social_posts')
      write_web_report
      write_user_and_article
      write_social_post
    ensure
      Report.where(description: MARKER).delete
      User.where(username: 'mongoupgradecheck').delete
      Article.where(title: MARKER).delete
      SocialPost.where(external_id: MARKER).delete
      SocialPost.collection.drop unless social_posts_existed # leave the schema as it was
    end

    def write_web_report
      before_max = Report.where(source: 'ufo-hunters.com').max(:case_number) || 0
      @session.post '/reports', params: { report: {
        location: 'Mongo upgrade check, Madrid', shape: 'Light', duration: '1 min', description: MARKER,
        coord: '-3.7038,40.4168', email: 'check@example.com', sighted_at: '2024-06-21', reported_at: '2024-06-22'
      } }
      report = Report.where(description: MARKER).first
      check('web form creates the sighting', report.present?, "HTTP #{@session.response.status}")
      return unless report

      check('case_number is previous max + 1', report.case_number == before_max + 1,
            "#{report.case_number} vs #{before_max + 1}")
      check('coord stored as [lng, lat]', report.coord == [-3.7038, 40.4168], report.coord.inspect)
      check('dates stored as YYYYMMDD', [report.sighted_at, report.reported_at] == %w[20240621 20240622],
            [report.sighted_at, report.reported_at].inspect)
      check('new sighting is unpublished', report.status.to_i.zero?, report.status.inspect)

      report.set(status: 1) # what moderation does when publishing
      search_published_report(report)

      report.destroy
      check('sighting deleted', Report.where(_id: report.id).none?)
    end

    def search_published_report(report)
      near = Report.where(coord: { '$nearSphere' => [-3.7, 40.42], '$maxDistance' => 1.fdiv(6371) }).and(status: 1)
      check('published sighting found by proximity (1 km)', near.pluck(:_id).include?(report.id))

      @session.post '/sightings/ufosearchresults', params: { coord: '-3.70,40.42', startdate: '2024-06-01',
                                                             enddate: '2024-06-30' }
      found = Array(@session.controller.instance_variable_get(:@ufo_list)).map(&:id)
      check('published sighting found by date + proximity search', found.include?(report.id))

      @session.post '/sightings/ufosearchresults', params: { coord: '-3.70,40.42', startdate: '2024-07-01',
                                                             enddate: '2024-07-31' }
      found = Array(@session.controller.instance_variable_get(:@ufo_list)).map(&:id)
      check('sighting excluded outside its dates', found.exclude?(report.id))

      @session.get "/sightings/search/#{report.id}/x"
      check('sighting page renders', @session.response.status == 200, "HTTP #{@session.response.status}")
    end

    def write_user_and_article
      user = User.create!(username: 'mongoupgradecheck', email: 'mongoupgradecheck@example.com',
                          password: 'upgrade-check-pw', password_confirmation: 'upgrade-check-pw')
      @session.post '/sessions', params: { username: user.username, password: 'upgrade-check-pw' }
      check('login with bcrypt password', @session.response.redirect_url.to_s.include?('myspace'),
            @session.response.redirect_url.inspect)

      article = Article.create!(title: MARKER, teaser: MARKER, body: MARKER, user: user, status: 0,
                                published_date: Time.zone.today.strftime('%Y%m%d'))
      article.update!(status: 1)
      check('article create + update', Article.where(title: MARKER, status: 1).one?)
      article.destroy
      check('article deleted', Article.where(title: MARKER).none?)

      user.destroy
      check('user deleted', User.where(username: 'mongoupgradecheck').none?)
    end

    def write_social_post
      report = Report.where(status: 1).desc(:sighted_at).first
      SocialPost.create!(platform: SocialPost::PLATFORMS.first, report_id: report.id.to_s,
                         external_id: MARKER, posted_at: Time.current)
      ids = SocialPost.where(external_id: MARKER).pluck(:report_id)
      check('social post create + pluck', ids == [report.id.to_s], ids.inspect)
      sample = Report.collection.aggregate([{ '$match' => { 'status' => 1, '_id' => { '$nin' => [report.id] } } },
                                            { '$sample' => { 'size' => 1 } }]).first
      check('$sample aggregation with $nin', sample.present? && sample['_id'] != report.id)
    end

    def check(name, passed, detail = nil)
      @result['writes'][name] = passed ? 'PASS' : "FAIL #{detail}"
    end
  end
end
