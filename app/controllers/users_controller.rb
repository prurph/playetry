class UsersController < ApplicationController
  before_action :authenticate_user!
  def user_page
    @user = current_user
    @favorites = @user.favorites.includes(:favoriteable)
    @poems = @favorites.poems.map(&:favoriteable)
    @readings = @favorites.readings.map(&:favoriteable)
  end
end
