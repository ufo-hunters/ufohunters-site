class ReportsController < ApplicationController
  
  include SimpleCaptcha::ControllerHelpers
  # GET /reports
  # GET /reports.json
  def index
    #@reports = Report.all.desc(:sighted_at).limit(10)

    #respond_to do |format|
    #  format.html # index.html.erb
    #  format.json { render json: @reports }
    #end
  end

  # GET /reports/1
  # GET /reports/1.json
  def show
    @report = Report.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @report }
    end
  end

  # GET /reports/new
  # GET /reports/new.json
  def new
    
    @numUFO = Report.where(:status => 1).count()
    
    @report = Report.new

    @menu = "report"
    @page_title = "Report a UFO"
    @notice = 'Introduce the text of image' 
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
    @tmp["status"] = "0"
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
            @notice = 'You must enter the text from the image'         
            format.html { render action: "new", notice: 'You must enter the text from the image'}
            format.json { render json: @report.errors, status: :unprocessable_entity, notice: 'You must enter the text from the image' }
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
