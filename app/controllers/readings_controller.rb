class ReadingsController < ApplicationController
  def create
    reading = Reading.new(wav: params[:wav], description: params[:description],
                          user: current_user, poem_id: params[:poem_id])
    reading.save!
    render json: reading
  end

  def index
    @readings = Reading.where(poem_id: params[:poem_id])
    # Construct an array of the user's favorite readings
    @user_favs = current_user.favorites.readings.pluck(:favoriteable_id)
    binding.pry
    # render json: @readings
  end

  def show
    reading = Reading.find(params[:id])
    render json: reading
  end
end
