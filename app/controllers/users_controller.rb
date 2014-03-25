class UsersController < ApplicationController
  before_action :authenticate_user!
  def user_page
    respond_to do |format|
      @user = current_user
      format.html
      format.json do
        @user_readings = Reading.where(user: @user)
        favorites = @user.favorites.includes(:favoriteable).map(&:favoriteable)
        @poems = favorites.select {|favorite| favorite.class == Poem }
        all_readings = favorites - @poems
        # set user_favs as the ids of favorite readings so the partial can
        # attach the required user_fav: true attribute
        @user_favs = all_readings.map(&:id)
        @user_readings = Reading.where(user: @user)
        # remove any overlap if user has favorited her own readings
        @readings = all_readings - @user_readings
        # on users page we want recordings to link to their poem
        @link_poem = true
      end
    end
  end
end
