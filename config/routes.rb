AudioRecordRails::Application.routes.draw do
  devise_for :users

  resources :readings, only: :show
  resources :poems, except: [:destroy, :update] do
    resources :readings, only: [:index, :create]
  end
  # post 'audio/save_file'
  # get  'audio/get_file/:id', to: 'audio#get_file'
  # get  'audio/index'

  post   'favorites/:type/:id', to: 'favorites#create', as: 'new_favorite'
  delete 'favorites/:type/:id', to: 'favorites#destroy', as: 'destroy_favorite'

  root 'static_pages#home'
end
