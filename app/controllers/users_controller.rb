class UsersController < ApplicationController
  before_action :authenticate_user!
  def user_page
    respond_to do |format|
      @user = current_user
      format.html
      format.json do
        favorites = @user.favorites.includes(:favoriteable)
        @poems = favorites.poems.map(&:favoriteable)
        @readings = favorites.readings.map(&:favoriteable)
        # set user_favs as the ids of favorite readings so the partial can
        # attach the required user_fav: true attribute
        @user_favs = @readings.map(&:id)
      end
    end
  end
end
