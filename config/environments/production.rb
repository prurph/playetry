AudioRecordRails::Application.configure do
  config.cache_classes = true
  config.eager_load = true

  # Full error reports are disabled and caching is turned on.
  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  # Disable Rails's static asset server (Apache or nginx will already do this).
  config.serve_static_assets = false

  # Compress JavaScripts and CSS.
  config.assets.js_compressor = :uglifier
  # config.assets.css_compressor = :sass

  # Do not fallback to assets pipeline if a precompiled asset is missed.
  config.assets.compile = false

  # Generate digests for assets URLs.
  config.assets.digest = true

  # Version of your assets, change this if you want to expire all your assets.
  config.assets.version = '1.0'

  config.log_level = :info
  config.i18n.fallbacks = true
  config.assets.precompile += %w( recorderWorker.js )

  # Send deprecation notices to registered listeners.
  config.active_support.deprecation = :notify
  config.log_formatter = ::Logger::Formatter.new

  config.action_controller.asset_host = ENV['CLOUDFRONT_ASSETS']

  config.paperclip_defaults = {
    :storage => :s3,
    :s3_credentials => {
      :bucket => ENV['S3_BUCKET_NAME'],
      :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
      :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
    },
    :s3_host_alias => ENV['CLOUDFRONT_DOMAIN']
  }
end
