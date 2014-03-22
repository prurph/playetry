class PoemsController < ApplicationController
  def new
    @poem = Poem.new
  end

  def create
    @poem = Poem.new(poem_params)

    if @poem.save
      redirect_to @poem, notice: 'Poem successfully created'
    else
      flash.now[:alert] = @poem.errors.full_messages.join(', ')
      render action: 'new'
    end
  end

  def show
    @poem = Poem.includes(:favorites).find(params[:id])
    @user_fav = @poem.favorites.where(user: current_user).present?
  end

  private
  def poem_params
    params.require(:poem).permit(:title, :author, :body)
  end
end
