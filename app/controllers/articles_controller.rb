class ArticlesController < ApplicationController

  before_filter :check_user, only: [:edit, :update, :create, :destroy, :new]

  include ArticlesHelper

  caches_page :index, :expires_in => 3.hour
  caches_page :show, :expires_in => 24.hour

  # GET /articles
  # GET /articles.json
  def index
    @numUFO = Report.where(:status => 1).count()
    @menu = "articles"
    @articles = Article.all.desc(:published_date)
    @page_title = "Articles"
    @page_description = "Latest Articles"

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @articles }
    end
  end

  # GET /articles/1
  # GET /articles/1.json
  def show
    @numUFO = Report.where(:status => 1).count()
    @menu = "articles"
    @article = Article.find(params[:id])
    @page_title = ArticlesHelper.friendly_title(@article)
    @page_description = @article.teaser[0..200] + "..."

    unless @article.article_helper_method.blank?
      if ArticlesHelper.respond_to? @article.article_helper_method.to_sym
        @ufo_list = ArticlesHelper.send @article.article_helper_method.to_sym, @article
      end
    end

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @article }
    end

  end

  # GET /articles/new
  # GET /articles/new.json
  def new
    @article = Article.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @article }
    end
  end

  # GET /articles/1/edit
  def edit
    @article = Article.find(params[:id])
  end

  # POST /articles
  # POST /articles.json
  def create
    @article = Article.new(params[:article])

    respond_to do |format|
      if @article.save
        format.html { redirect_to @article, notice: 'Article was successfully created.' }
        format.json { render json: @article, status: :created, location: @article }
      else
        format.html { render action: "new" }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /articles/1
  # PUT /articles/1.json
  def update
    @article = Article.find(params[:id])

    respond_to do |format|
      if @article.update_attributes(params[:article])
        format.html { redirect_to @article, notice: 'Article was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /articles/1
  # DELETE /articles/1.json
  def destroy
    @article = Article.find(params[:id])
    @article.destroy

    respond_to do |format|
      format.html { redirect_to articles_url }
      format.json { head :no_content }
    end
  end


end
