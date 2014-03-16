class AudioController < ApplicationController
  def index
  end

  def save_file
    audio = params[:audio]
    # save_path = Rails.root.join("public/audios/#{audio.original_filename}")
    # audio.rewind
    # File.open(save_path, 'wb') do |f|
    #   f.write audio.read
    # end

    @reading = Reading.new
    @reading.wav  = params[:audio]
    @reading.name = params[:name]
    @reading.save!


    render json: @reading
  end

  def get_file
    @reading = Reading.find(get_params)
    render json: {url: @reading.wav.url }
  end

  private
  def get_params
    params.require(:id)
  end
end
