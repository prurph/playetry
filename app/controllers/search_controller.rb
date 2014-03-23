class SearchController < ApplicationController

  def fuzzy_search
    formatted_params = fuzzy_params.reject {|k,v| v.empty? }
    if formatted_params.empty?
      @poems = Poem.order(added_at: :desc).limit(5)
    else
      @poems = Poem.find_fuzzy(formatted_params)
    end
    render poems: @poems
  end

  def tag
    @poems = Poem.tagged_with(tag_params)
    render json: { poems: @poems}
  end

  private
  def fuzzy_params
    params.require(:fuzzies).permit(:title, :author, :body)
  end

  def tag_params
    params.require(:tag)
  end
end
