# frozen_string_literal: true

Rails.application.routes.draw do
  get '/404', to: 'errors#not_found'
  get '/422', to: 'errors#unacceptable'
  get '/500', to: 'errors#internal_error'

  resources :users

  get 'sessions/destroy' => 'sessions#destroy'
  resources :sessions
  resources :password_resets, only: %i[new create edit update]

  get 'articles/myspace' => 'articles#myspace'
  get 'articles/uforesearchteam' => 'articles#uforesearchteam'
  resources :articles
  get 'articles/:id/:title' => 'articles#show'

  root to: 'sightings#index'

  get 'reports/sightings', to: 'reports#sightings'
  get 'reports/:id/country(.:format)' => 'reports#country'
  get 'reports/nearof/:longitud/:latitud/nearest(.:format)' => 'reports#nearof',
      constraints: { longitud: %r{[^/]+}, latitud: %r{[^/]+} }
  resources :reports

  get 'sightings/country/:id(/:title)' => 'sightings#country', as: :sightings_country
  get 'sightings/search/:id(/:title)' => 'sightings#search', as: :sightings_search
  post 'sightings/ufosearchresults' => 'sightings#ufosearchresults'

  get 'sightings/maps' => 'sightings#maps'
  get 'sightings/northamerica' => 'sightings#northamerica'
  get 'sightings/southamerica' => 'sightings#southamerica'
  get 'sightings/europe' => 'sightings#europe'
  get 'sightings/asia' => 'sightings#asia'
  get 'sightings/africa' => 'sightings#africa'
  get 'sightings/oceania' => 'sightings#oceania'
  get 'sightings/videos' => 'sightings#videos'
  get 'sightings/images' => 'sightings#images'
  get 'sightings/about' => 'sightings#about'
  get 'sightings/ufosearch' => 'sightings#ufosearch'
  get 'sightings/statistics' => 'sightings#statistics'
  get 'sightings/countrieslist' => 'sightings#countrieslist'

  get 'stats' => 'stats#index'
  get 'map_json' => 'stats#map_json'
  get 'stats/shape' => 'stats#shape'

  get 'up' => 'rails/health#show', as: :rails_health_check
end
