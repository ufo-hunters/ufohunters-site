# frozen_string_literal: true

class ReportsController < ApplicationController
  # GET /reports.json
  def index
    @reports = Rails.cache.fetch('reports/latest', expires_in: 8.hours) do
      Report.where(status: 1).without(:email, :description, :links, :status).desc(:sighted_at).limit(100).entries
    end

    respond_to do |format|
      format.json { render json: @reports }
    end
  end

  # GET /reports/1
  def show
    # mongoid.yml sets raise_not_found_error: false, so an unknown id returns
    # nil. skip_nil prevents caching that miss for a week (bots probing random
    # ids would otherwise fill Redis and get repeated 500s); a nil report is a 404.
    @report = Rails.cache.fetch("reports/#{params[:id]}", expires_in: 1.week, skip_nil: true) do
      Report.without(:email).where(_id: params[:id]).first
    end

    if @report.nil?
      @page_title = 'Not Found'
      return render 'errors/not_found', status: :not_found
    end

    respond_to do |format|
      format.html
      format.json { render json: @report }
    end
  end

  # GET /reports/nearof/1234/5678
  def nearof
    # to_f, not to_i: coordinates carry decimals; truncating to integers moves
    # the search origin by up to ~111 km before a 100 km radius query.
    @coordenadas = [params[:longitud].to_f, params[:latitud].to_f]
    distance = 100 # km

    if @coordenadas.any?(&:nonzero?)
      @nearest = Rails.cache.fetch("reports/near/#{@coordenadas.join(',')}",
                                   expires_in: 8.hours) do
        Report.where(coord: { '$nearSphere' => @coordenadas, '$maxDistance' => distance.fdiv(6371) })
              .and(status: 1)
              .without(:email, :description, :links, :source, :status, :reported_at, :shape, :duration)
              .limit(50).entries
      end
    end

    respond_to do |format|
      format.html
      format.json { render json: @nearest }
    end
  end

  # GET /reports/new
  def new
    @report = Report.new
    @menu = 'report'
    @page_title = 'Report a UFO'
    @page_description = 'Have you seen a UFO? Report your experience filling in the report form'
    @notice = 'Introduce the text of the image'

    respond_to do |format|
      format.html
      format.json { render json: @report }
    end
  end

  # POST /reports
  def create
    @menu = 'report'
    @page_title = 'Report a UFO'
    @page_description = 'Have you seen a UFO? Report your experience filling in the report form'

    @report = Report.new(build_report_attributes)

    if verify_recaptcha(model: @report)
      respond_to do |format|
        if @report.save
          format.html { redirect_to @report, notice: 'Ufo model was successfully created.' }
          format.json { render json: @report, status: :created, location: @report }
        else
          format.html { render action: 'new' }
          format.json { render json: @report.errors, status: :unprocessable_content }
        end
      end
    else
      @report['sighted_at'] = ''
      @report['reported_at'] = ''
      @report['links'] = []
      respond_to do |format|
        @notice = 'You must enter the text of the image'
        format.html { render action: 'new', notice: 'You must enter the text of the image' }
        format.json { render json: @report.errors, status: :unprocessable_content }
      end
    end
  end

  def sightings
    @reports = Report.where(status: 1, source: 'ufo-hunters.com', coord: { '$exists' => 1 })
                     .without(:email, :links, :source, :status, :shape, :duration)
                     .desc(:sighted_at).limit(100)

    respond_to do |format|
      format.xml
    end
  end

  def country
    codeCountry = params[:id]
    listaPais = Countries.where('cod' => codeCountry).limit(1)

    listaPais.each do |country|
      @nameCountry = country.name
      @coordCountry = country.center
      @zoom = country.zoom
      @pais = country.geometry
    end

    # Access the GeoJSON keys explicitly. The previous positional each_with_index
    # assumed 'type' was the first key and 'coordinates' the second; any document
    # with a different key order silently swapped them and returned no sightings.
    if @pais.blank?
      head :not_found
      return
    end

    type = @pais['type']
    coordinates = @pais['coordinates']

    if type == 'Polygon'
      @reports = Report.where(coord: { '$geoWithin' => { '$polygon' => coordinates[0] } })
                       .and(status: 1).order_by(sighted_at: :desc).limit(100)
    else
      coordinates.each_with_index do |coordinatesdatos, index|
        @reports = if index.zero?
                     Report.where(coord: { '$geoWithin' => { '$polygon' => coordinatesdatos[0] } })
                           .and(status: 1).order_by(sighted_at: :desc).limit(100)
                   else
                     @reports + Report.where(coord: { '$geoWithin' => { '$polygon' => coordinatesdatos[0] } })
                                      .and(status: 1).order_by(sighted_at: :desc).limit(100)
                   end
      end
    end

    respond_to do |format|
      format.xml
    end
  end

  private

  def build_report_attributes
    attrs = report_params.to_h
    attrs['status'] = 0

    if params[:report][:images].present?
      service = ImagekitUploadService.new
      imagekit_urls = params[:report][:images].filter_map { |img| service.upload(img) }
      attrs['image_imagekit'] = imagekit_urls if imagekit_urls.any?
    end

    attrs['coord'] = parse_coord(attrs['coord'])
    attrs['source'] = 'ufo-hunters.com'

    %w[sighted_at reported_at].each do |field|
      next if attrs[field].blank?

      attrs[field] = Date.strptime(attrs[field], '%Y-%m-%d').strftime('%Y%m%d')
    rescue Date::Error
      attrs[field] = nil
    end

    attrs
  end

  def report_params
    params.expect(report: [:location, :shape, :duration, :description, :coord, :status, :email,
                           :reported_at, :sighted_at, :source, { links: [] }])
  end

  # Parses the "lng,lat" form field into a numeric pair. Anything malformed
  # (non-numeric, wrong arity) becomes the [0, 0] "no coordinates" sentinel,
  # which keeps the report unpublished rather than storing a bad geo point.
  def parse_coord(raw)
    return [0, 0] if raw.blank?

    parts = raw.to_s.split(',').map do |value|
      Float(value.strip)
    rescue ArgumentError, TypeError
      nil
    end

    parts.size == 2 && parts.none?(&:nil?) ? parts : [0, 0]
  end
end
