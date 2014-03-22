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
    if current_user.present?
      @user_fav = @poem.favorites.where(user: current_user).present?
    end
  end

  def index
    respond_to do |format|
      format.html { @poems = Poem.order(added_at: :desc).limit(5) }
      format.json do
        @poems = Poem.find_fuzzy(search_params.delete_if {|k,v| v.length == 0})
      end
    end
  end


  private
  def poem_params
    params.require(:poem).permit(:title, :author, :body)
  end
  def search_params
    params.require(:fuzzies).permit(:title, :author, :body)
  end
end
