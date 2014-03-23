class PoemsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]
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
    @poem = Poem.includes(:favorites).includes(:tags).find(params[:id])
    if current_user.present?
      @user_fav = @poem.favorites.where(user: current_user).present?
    end
  end

  def index
    respond_to do |format|
      format.html
      format.json do
        if params[:tag]
          @poems = Poem.includes(:tags).tagged_with(params[:tag])
        elsif search_params.empty?
          @poems = Poem.includes(:tags).order(added_at: :desc).limit(5)
        else
          @poems = Poem.includes(:tags).find_fuzzy(search_params)
        end
      end
    end
  end

  private
  def poem_params
    params.require(:poem).permit(:title, :author, :body, :tag_list)
  end
  def search_params
    params.require(:fuzzies).permit(:title, :author, :body)
      .reject! {|k,v| v.empty? }
  end
end
