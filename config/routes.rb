AudioRecordRails::Application.routes.draw do
  devise_for :users
  post 'audio/save_file'
  get  'audio/get_file/:id', to: 'audio#get_file'
  get  'audio/index'
end
