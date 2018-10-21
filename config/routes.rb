Ufo::Application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'


  get "/404", :to => "errors#not_found"
  get "/422", :to => "errors#unacceptable"
  get "/500", :to => "errors#internal_error"


  #get "users/new"
  resources :users

  get 'sessions/destroy' => 'sessions#destroy'
  resources :sessions


  get 'articles/myspace' => 'articles#myspace'
  get 'articles/uforesearchteam' => 'articles#uforesearchteam'

  resources :articles
  get 'articles/:id(/:title)' => 'articles#show'
  get 'articles/:id' => 'articles#show'

  get "sightings/index"
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products 
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => 'sightings#index'
  get 'reports/sightings', :to  => 'reports#sightings'
  get 'reports/:id/country(.:format)' => 'reports#country'
  get 'reports/nearof/:longitud/:latitud/nearest(.:format)' => 'reports#nearof', :constraints => { :longitud => /[^\/]+/, :latitud => /[^\/]+/}
  resources :reports

  # root search and spain, same controller
  get 'sitemap', :to => 'sightings#sitemap'
  get 'sightings/country/:id(/:title)' => 'sightings#country'
  get 'sightings/search/:id(/:title)' => 'sightings#search'
  get 'sightings/search/:id' => 'sightings#search'
  get 'sightings/spain' => 'sightings#spain'
  post 'sightings/ufosearchresults' => 'sightings#ufosearchresults'   
  get 'stats' => 'stats#index'
  get 'map_json' => 'stats#map_json'
  # See how all your routes lay out with "rake routes"
  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  get ':controller(/:action(/:id))(.:format)'

 

end
