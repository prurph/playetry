class ReadingsController < ApplicationController
  def create
    reading = Reading.new(wav: params[:wav], description: params[:description],
                          user: current_user, poem_id: params[:poem_id])
    reading.save!
    render reading
  end

  def index
    @readings = Reading.includes(:user).where(poem_id: params[:poem_id])
    # Construct an array of the user's favorite readings
    if current_user.present?
      @user_favs = current_user.favorites.readings.pluck(:favoriteable_id)
    end
  end

  def show
    reading = Reading.find(params[:id])
    render reading
  end
end
