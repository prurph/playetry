AudioRecordRails::Application.routes.draw do
  devise_for :users

  resources :readings, only: :show
  resources :poems, only: :index
  resources :poems, except: [:destroy, :update, :index] do
    resources :readings, only: [:index, :create]
  end

  get    '/tags/:tag', to: 'poems#index', as: 'tag'

  post   'favorites/:type/:id', to: 'favorites#create', as: 'new_favorite'
  delete 'favorites/:type/:id', to: 'favorites#destroy', as: 'destroy_favorite'

  root 'static_pages#home'
end
