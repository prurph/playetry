class FavoritesController < ApplicationController
  before_action :load_favoriteable

  def create
    @favorite = @favoriteable.favorites.new(user: current_user)
    @favorite.save!
    render json: @favorite
  end

  def destroy
    @favorite = @favoriteable.favorites.where(user: current_user).first
    @favorite.destroy!
    render json: @favorite
  end

  private
  def load_favoriteable
    resource, id = request.path.split('/')[-2,2]
    @favoriteable = resource.singularize.classify.constantize.find(id)
  end
end
