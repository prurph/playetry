class ReadingsController < ApplicationController
  def show
  end

  def create
    reading = Reading.new(wav: params[:wav], description: params[:description],
                          user: current_user)
    reading.save!

    render json: reading
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
