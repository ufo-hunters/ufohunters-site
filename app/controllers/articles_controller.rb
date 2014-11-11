class ArticlesController < ApplicationController

  before_filter :check_user, only: [:edit, :update, :create, :destroy, :myspace ]

  include ArticlesHelper

  # GET /articles
  # GET /articles.json
  def index
    @menu = "articles"
    @articles = Rails.cache.fetch("articles/index", :expires_in => 1.week) do
      Article.all.without(:article_helper_method, :article_type, :date_filter, :email, :partial_1).desc(:published_date).entries
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
        format.html { redirect_to @article, notice: 'Article was successfully created.' }
        format.json { render json: @article, status: :created, location: @article }
      else
        format.html { render action: "new" }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end

    Rails.cache.delete "articles/index"
    expire_fragment "articles/content"

  end

  # PUT /articles/1
  # PUT /articles/1.json
  def update
    @article = Article.find(params[:id])

    respond_to do |format|
      if @article.update_attributes(article_params)
        format.html { redirect_to @article, notice: 'Article was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end

    Rails.cache.delete "articles/index"
    Rails.cache.delete_matched Regexp.new("#{@article.id}")
    expire_fragment "articles/content"

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

    Rails.cache.delete "articles/index"
    Rails.cache.delete_matched Regexp.new("#{@article.id}")
    expire_fragment "articles/content"

  end

  # GET /articles/myspace
  def myspace
    @menu = "myspace"
    @articles = Article.where(:user => session[:user_id])

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

  private

    def article_params
      params.require(:article).permit(:title, :teaser, :body, :published_date, :user_id)
    end

end
