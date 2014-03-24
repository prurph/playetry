class TagsController < ApplicationController
  def index
    @tags = Poem.tag_counts
  end
end
