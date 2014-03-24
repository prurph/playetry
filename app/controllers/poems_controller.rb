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
    #@tags = Poem.tag_counts.order(:name)
    if params[:tag]
      @poems = Poem.includes(:tags).tagged_with(params[:tag])
      @search = { tag: params[:tag] }
    elsif params[:fuzzies].present?
      search_params = params[:fuzzies].reject! {|k,v| v.empty? }
      @poems = Poem.includes(:tags).find_fuzzy(search_params)
      @search = search_params
    else
      @poems = Poem.includes(:tags).order(added_at: :desc).limit(5)
    end
    respond_to do |format|
      format.html
      format.json
    end
  end

  private
  def poem_params
    params.require(:poem).permit(:title, :author, :body, :tag_list)
  end
end
