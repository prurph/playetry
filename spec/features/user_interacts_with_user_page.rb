require 'spec_helper'

feature 'user interacts with user page', :js do
  background do
    @user = create(:user)
    sign_in_as(@user)

    @poems = create_list(:poem, 2)
    @fav_poem = @poems.first
    @fav_poem.tag_list = "love, happiness"
    @fav_poem.save!
    @notfav_poem = @poems.second
    @notfav_poem.tag_list = "anger, sorrow"
    @favorite = @fav_poem.favorites.new(user: @user)
    @favorite.save!

    @readings = create_list(:reading, 2)
    @fav_reading = @readings.first
    @notfav_reading = @readings.second

    # mix and match poems/favorites
    @fav_reading.poem = @notfav_poem
    @notfav_reading.poem = @fav_poem

    @favorite2 = @fav_reading.favorites.new(user: @user)
    @favorite2.save!
    @fav_reading.save!
    @notfav_reading.save!

    @user_reading = create(:reading, user: @user)
    click_link 'my playetry'
  end

  sceanario 'by clicking on a poem link' do
    click_link @fav_poem.title

    # should be redirected to that poem show page
    within('#read') do
      expect(page).to have_content @fav_poem.title
    end

    within('.poem-container') do
      expect(page).to have_content @fav_poem.title
      expect(page).to have_content @fav_poem.body

      expect(page).to have_content @fav_poem.tags.first.name
      expect(page).to_not have_content @notfav_poem.tags.first.name
    end

    within('readings-container') do
      expect(page).to have_content @notfav_reading.description
    end
  end

end
