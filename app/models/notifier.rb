 class Notifier < ActionMailer::Base

    include SendGrid 

    default from: "info@ufo-hunters.com" 
    #sendgrid_category :use_subject_lines 
    #sengrid_enable :ganalytics, :opentrack

    def test_notification 
      mail(:to => "fjfdepedro@gmail.com", :subject => "mail from heroku") 
      puts("Sent mail from notifier") 
   end 

  end 