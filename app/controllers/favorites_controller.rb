class FavoritesController < ApplicationController
  before_action :load_favoriteable

  def create
    @favorite = @favoriteable.favorites.new(user: current_user)
  end


  private
  def load_favoriteable
    resource, id = request.path.split('/')[1,2]
    @favoriteable = resource.singularize.classify.constantize.find(id)
  end
end
