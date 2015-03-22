class ArticlesController < ApplicationController

  before_filter :check_user, only: [:edit, :update, :create, :destroy, :myspace ]

  include ArticlesHelper

  # GET /articles
  # GET /articles.json
  #Article.all.without(:article_helper_method, :article_type, :date_filter, :email, :partial_1).desc(:published_date).entries
  def index
    @menu = "articles"
    @num_articles = num_articles
    @page_number = 1
    begin
      @page_number = params[:page].to_i unless params[:page].blank?
      last_page = (@num_articles / Ufo::MAX_PAGE_ITEMS) + 1
      if @page_number <= 0
        @page_number = 1
      elsif @page_number > last_page
        @page_number = last_page
      end
    rescue
      logger.error "Page number not valid!"
    end
    @articles = Rails.cache.fetch("articles/index/#{@page_number}", :expires_in => 1.week) do
      Article.where(:status => 1).without(:article_helper_method, :article_type, :date_filter, :email, :partial_1).desc(:published_date).skip((@page_number-1) * Ufo::MAX_PAGE_ITEMS).limit(Ufo::MAX_PAGE_ITEMS).entries
    end
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
    @menu = "articles"
    @article = Rails.cache.fetch("articles/#{params[:id]}", :expires_in => 1.month) do
      Article.without(:email).find(params[:id])
    end
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
  def new
    @article = Article.new

    respond_to do |format|
      format.html # new.html.erb
    end
  end

  # GET /articles/1/edit
  def edit
    @article = Article.find(params[:id])
  end

  # POST /articles
  # POST /articles.json
  def create
    @article = Article.new(article_params)

    respond_to do |format|
      if @article.save
        format.html { redirect_to action: 'myspace', notice: 'Article was successfully created.' }
        format.json { render json: @article, status: :created, location: @article }
      else
        format.html { render action: "new" }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end

    Rails.cache.delete_matched /articles\/index/
    Rails.cache.delete_matched /articles\/content/

  end

  # PUT /articles/1
  # PUT /articles/1.json
  def update
    @article = Article.find(params[:id])

    respond_to do |format|
      if @article.update_attributes(article_params)
        format.html { redirect_to action: 'myspace', notice: 'Article was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end

    Rails.cache.delete_matched /articles\/index/
    Rails.cache.delete_matched Regexp.new("#{@article.id}")
    Rails.cache.delete_matched /articles\/content/

  end

  # DELETE /articles/1
  # DELETE /articles/1.json
  def destroy
    @article = Article.find(params[:id])
    @article.destroy

    respond_to do |format|
      format.html { redirect_to action: 'myspace' }
      format.json { head :no_content }
    end

    Rails.cache.delete_matched /articles\/index/
    Rails.cache.delete_matched Regexp.new("#{@article.id}")
    Rails.cache.delete_matched /articles\/content/

  end

  # GET /articles/myspace
  def myspace
    @menu = "myspace"
    @articles = Article.where(:user => session[:user_id]).desc(:published_date)

    @page_title = "Articles"
    @page_description = "My Latest Articles"

    respond_to do |format|
      format.html # index.html.erb
    end
  end

  # GET /articles/myspace
  def uforesearchteam
    @menu = "uforesearchteam"
    @user = User.new

    @page_title = "UFO Research Team - Articles"
    @page_description = "Do you want to join our research team?"

    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def num_articles
    Rails.cache.fetch("articles/num_articles", :expires_in => 8.hours) do
      Article.where(:status => 1).count()
    end
  end

  private

    def article_params
      params.require(:article).permit(:title, :status, :teaser, :body, :published_date, :user_id)
    end

end
