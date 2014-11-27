class ReportsController < ApplicationController

  skip_before_filter :verify_authenticity_token, :only => [:create]

  include SimpleCaptcha::ControllerHelpers

  caches_action :sightings, :expires_in => 1.day
  caches_action :country, :expires_in => 1.day

  # GET /reports.json
  def index
    @reports = Rails.cache.fetch("reports/latest", :expires_in => 8.hours) do
      Report.where(:status => 1).without(:email,:description,:links,:status).desc(:sighted_at).limit(100).entries
    end

    respond_to do |format|
      format.json { render json: @reports }
    end
  end

  # GET /reports/1
  # GET /reports/1.json
  def show
    @report = Rails.cache.fetch("reports/#{params[:id]}", :expires_in => 1.week) do
      Report.without(:email).find(params[:id])
    end

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @report }
    end
  end

  # GET /reports/nearof/1234/5678
  # GET /reports/nearof/1234/5678.json
  def nearof
      @coordenadas = [params[:longitud].to_i,params[:latitud].to_i]
      distance = 100 #km

      if @coordenadas
        @nearest = Rails.cache.fetch("reports/near/#{params[:longitud].to_i},#{params[:latitud].to_i}", :expires_in => 8.hours) do
          Report.where(:coord => { "$nearSphere" => @coordenadas , "$maxDistance" => (distance.fdiv(6371)) }).and(:status => 1).without(:email,:description,:links,:source,:status,:reported_at,:shape,:duration).limit(50).entries
        end
      end

      respond_to do |format|
        format.html # nearof.html.erb
        format.json { render json: @nearest }
      end
  end


  # GET /reports/new
  # GET /reports/new.json
  def new
    @report = Report.new

    @menu = "report"
    @page_title = "Report a UFO"
    @page_description = "Have you seen a UFO? Report your experience filling in the report form"
    @notice = 'Introduce the text of the image'
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @report }
    end

  end


  # POST /reports
  # POST /reports.json

  def create
    @menu = "report"
    @page_title = "Report a UFO"
    @page_description = "Have you seen a UFO? Report your experience filling in the report form"

    @tmp = report_params

    @tmp["links"] = params[:report][:links] unless params[:report][:links].blank?
    @tmp["image_cloudinary"] = params[:report][:image_cloudinary]

    unless @tmp["image_cloudinary"].blank?
        @tmp["image_cloudinary"] = @tmp["image_cloudinary"].values
    end
    @tmp["status"] = 0
    # Remove image_id
    @tmp.except! :image_id

    if @tmp["coord"].blank?
      @tmp["coord"] = [0,0]
    else
      @tmp["coord"] = @tmp["coord"].split(",").map { |s| s.to_f }
    end

    @tmp["source"] = "ufo-hunters.com"
    @tmp["sighted_at"] = Date.strptime(@tmp["sighted_at"], '%m/%d/%Y').strftime('%Y%m%d')
    @tmp["reported_at"] = Date.strptime(@tmp["reported_at"], '%m/%d/%Y').strftime('%Y%m%d')

    @report = Report.new(@tmp)

    if simple_captcha_valid?

        respond_to do |format|
          if @report.save
            format.html { redirect_to @report, notice: 'Ufo model was successfully created.' }
            format.json { render json: @report, status: :created, location: @report }
          else
            format.html { render action: "new" }
            format.json { render json: @report.errors, status: :unprocessable_entity }
          end
        end

    else
        @report["sighted_at"] = ""
        @report["reported_at"] = ""
        @report["links"] = []
        respond_to do |format|
            @notice = 'You must enter the text of the image'
            format.html { render action: "new", notice: 'You must enter the text of the image'}
            format.json { render json: @report.errors, status: :unprocessable_entity, notice: 'You must enter the text of the image' }
        end

    end

    # Invalidate cache for sightings/latest, reports/latest and so on
    Rails.cache.delete_matched /latest/
    Rails.cache.delete "common/num_reports"
    expire_fragment "common/header"

  end


  def sightings
    @reports = Report.where(:status => 1, :source => "ufo-hunters.com", :coord =>  {"$exists" => 1}).without(:email,:links,:source,:status,:shape,:duration).desc(:sighted_at).limit(100)

    respond_to do |format|
      format.xml
    end
  end


  def country
     codeCountry = params[:id]
      listaPais = Countries.where({"cod" => codeCountry}).limit(1)

      listaPais.each do |country|
         @nameCountry = country.name
         @coordCountry = country.center
         @zoom = country.zoom
         @pais = country.geometry
      end

      type = ""
      coordinates = ""
      @pais.each_with_index do |datos, index|
         if index==0
            type = datos[1]
         else
            coordinates =  datos[1]
         end
      end

      if type == 'Polygon'
         @reports = Report.where(:coord => {"$geoWithin" => {"$polygon" => coordinates[0]}}).and(:status => 1).order_by(:sighted_at.desc).limit(100)
      else
         coordinates.each_with_index do |coordinatesdatos,index|
            if index == 0
               @reports = Report.where(:coord => {"$geoWithin" => {"$polygon" => coordinatesdatos[0]}}).and(:status => 1).order_by(:sighted_at.desc).limit(100)
            else
               @reports = @reports + Report.where(:coord => {"$geoWithin" => {"$polygon" => coordinatesdatos[0]}}).and(:status => 1).order_by(:sighted_at.desc).limit(100)
            end
         end
      end

      respond_to do |format|
         format.xml
      end

  end

  private

    def report_params
      params.require(:report).permit(:location, :shape, :duration, :description, :coord, :status, :email, :links, :image_cloudinary, :reported_at, :sighted_at, :source)
    end

end
