ENV["RAILS_ENV"] = "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.(yml|csv) for all tests in alphabetical order.
  #
  # Note: You'll currently still have to declare fixtures explicitly in integration tests
  # -- they do not yet inherit this setting
  #fixtures :all

  # Looks like fixtures do not work with mongoid
  def create_dummy_report
    Report.new(:sighted_at => "20120101",
               :reported_at => "20120102",
               :location => "My Location",
               :shape => "My Shape",
               :duration => "1 min.",
               :description => "My description",
               :coord => [-0.29393, 40.87880],
               :links => ["http://www.youtube.com", "http://www.google.com"],
               :source => "My Source",
               :email => "email@email.com",
               :case_number => 1041)
  end

  def create_country
    Countries.new(:center => [-4, 40],
                  :cod => "ESP",
                  :geometry => {
                    :type => "Polygon",
                    :coordinates => [[
                                   [-9.034818, 41.880571],
                                   [-8.984433, 42.592775],
                                   [-9.392884, 43.026625],
                                   [-7.97819, 43.748338],
                                   [-6.754492, 43.567909],
                                   [-5.411886, 43.57424],
                                   [-4.347843, 43.403449],
                                   [-3.517532, 43.455901],
                                   [-1.901351, 43.422802],
                                   [-1.502771, 43.034014],
                                   [0.338047, 42.579546],
                                   [0.701591, 42.795734],
                                   [1.826793, 42.343385],
                                   [2.985999, 42.473015],
                                   [3.039484, 41.89212],
                                   [2.091842, 41.226089],
                                   [0.810525, 41.014732],
                                   [0.721331, 40.678318],
                                   [0.106692, 40.123934],
                                   [-0.278711, 39.309978],
                                   [0.111291, 38.738514],
                                   [-0.467124, 38.292366],
                                   [-0.683389, 37.642354],
                                   [-1.438382, 37.443064],
                                   [-2.146453, 36.674144],
                                   [-3.415781, 36.6589],
                                   [-4.368901, 36.677839],
                                   [-4.995219, 36.324708],
                                   [-5.37716, 35.94685],
                                   [-5.866432, 36.029817],
                                   [-6.236694, 36.367677],
                                   [-6.520191, 36.942913],
                                   [-7.453726, 37.097788],
                                   [-7.537105, 37.428904],
                                   [-7.166508, 37.803894],
                                   [-7.029281, 38.075764],
                                   [-7.374092, 38.373059],
                                   [-7.098037, 39.030073],
                                   [-7.498632, 39.629571],
                                   [-7.066592, 39.711892],
                                   [-7.026413, 40.184524],
                                   [-6.86402, 40.330872],
                                   [-6.851127, 41.111083],
                                   [-6.389088, 41.381815],
                                   [-6.668606, 41.883387],
                                   [-7.251309, 41.918346],
                                   [-7.422513, 41.792075],
                                   [-8.013175, 41.790886],
                                   [-8.263857, 42.280469],
                                   [-8.671946, 42.134689],
                                   [-9.034818, 41.880571]
                                 ]]
                  },
                  :name => "Spain",
                  :continent => "Europe",
                  :visible => "1",
                  :zoom => "6"
                )
  end

  def create_dummy_user

    User.new(:username => "user1",
             :password => "secret"
             )

  end

  def create_dummy_article

    Article.new(:title => "Article title",
                :user_id => "user1",
                :published_date => "20120102",
                :teaser => "Article teaser",
                :body => "Article body",
                :article_helper_method => "none"
                )
  end

  # Add more helper methods to be used by all tests here...
  teardown :clean_mongodb

  def clean_mongodb
    Mongoid.default_session['ufo'].drop
    Mongoid.default_session['user'].drop
    Mongoid.default_session['articles'].drop
    Mongoid.default_session['countries'].drop
  end

end
