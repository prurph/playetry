AudioRecordRails::Application.routes.draw do
  post 'audio/save_file'
  get  'audio/get_file/:id', to: 'audio#get_file'
  get  'audio/index'
end
