AudioRecordRails::Application.routes.draw do
  devise_for :users

  resources :readings, only: [:create, :show]

  # post 'audio/save_file'
  # get  'audio/get_file/:id', to: 'audio#get_file'
  # get  'audio/index'

  root 'static_pages#home'
end
