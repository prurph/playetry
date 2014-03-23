class SearchController < ApplicationController

  def tag_search
    @poems = Poem.includes(:tags).tagged_with(params[:tag])
  end

  def fuzzy_search
    @poems = Poem.includes(:tags).find_fuzzy(search_params)
  end

  private
  def search_params
    params.require(:fuzzies).permit(:title, :author, :body)
      .reject! {|k,v| v.empty? }
  end
end
