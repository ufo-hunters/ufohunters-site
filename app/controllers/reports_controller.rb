class ReportsController < ApplicationController
  
  include SimpleCaptcha::ControllerHelpers

  caches_action :index, :expires_in => 24.hour
  caches_page :show, :expires_in => 24.hour
  # GET /reports
  # GET /reports.json

  def index
    @reports = Report.where(:status => 1).without(:email,:description,:links,:source,:status,:reported_at,:shape,:duration).desc(:sighted_at).limit(20)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @reports }
    end
  end

  # GET /reports/1
  # GET /reports/1.json
  def show
    @report = Report.without(:email).find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @report }
    end
  end

  # GET /reports/nearof/1234/5678
  # GET /reports/nearof/1234/5678.json
  def nearof
      @coordenadas = [params[:longitud].to_i,params[:latitud].to_i]
      #@coordenadas = [-84.799473,35.250002]
      distance = 100 #km 

      if @coordenadas
         @nearest = Report.where(:coord => { "$nearSphere" => @coordenadas , "$maxDistance" => (distance.fdiv(6371)) }).and(:status => 1).without(:email,:description,:links,:source,:status,:reported_at,:shape,:duration).limit(50)  
      end
      
      respond_to do |format|
	      format.html # nearof.html.erb
	      format.json { render json: @nearest }
      end
  end   


  # GET /reports/new
  # GET /reports/new.json
  def new
    
    @numUFO = Report.where(:status => 1).count()
    
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
    
  # GET /reports/1/edit
  def edit
    #@report = Report.find(params[:id])
  end

  # POST /reports
  # POST /reports.json

  def create
    @numUFO = Report.count()

    @tmp = params[:report]
    @tmp["links"] = @tmp["links"].values
    @tmp["status"] = 0
    #@tmp["coord"] = []
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
        @report["links"] = ""
        respond_to do |format| 
            @notice = 'You must enter the text of the image'         
            format.html { render action: "new", notice: 'You must enter the text of the image'}
            format.json { render json: @report.errors, status: :unprocessable_entity, notice: 'You must enter the text of the image' }
        end

    end

    
  end

  # PUT /reports/1
  # PUT /reports/1.json
  def update
    #@report = Report.find(params[:id])

    #respond_to do |format|
     # if @report.update_attributes(params[:report])
       # format.html { redirect_to @report, notice: 'Ufo model was successfully updated.' }
       # format.json { head :no_content }
      #else
      #  format.html { render action: "edit" }
      #  format.json { render json: @report.errors, status: :unprocessable_entity }
      #end
    #end
  end

  # DELETE /reports/1
  # DELETE /reports/1.json
  def destroy
   # @report = Report.find(params[:id])
    #@report.destroy

    #respond_to do |format|
    #  format.html { redirect_to reports_url }
    #  format.json { head :no_content }
    #end
  end
end
