class AudioController < ApplicationController
  def index
  end

  def save_file
    @reading = Reading.new
    @reading.wav = params[:wav]
    @reading.description = params[:description]
    @reading.save!


    render json: @reading
  end

  def get_file
    @reading = Reading.find(get_params)
    render json: @reading
  end

  private
  def get_params
    params.require(:id)
  end
end
