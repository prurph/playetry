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
    @notfav_poem.save!

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

  scenario 'by clicking on a poem link' do
    page.all("a.poem-link", text: @fav_poem.title).first.trigger('click')

    # should be redirected to that poem show page

    within('.poem-container') do
      expect(page).to have_content @fav_poem.title
      expect(page).to have_content @fav_poem.body

      expect(page).to have_content @fav_poem.tags.first.name
      expect(page).to_not have_content @notfav_poem.tags.first.name
    end

    within('.readings-container') do
      expect(page).to have_content @notfav_reading.description
    end
  end

  scenario 'by clicking on a reading link' do
    page.all("a.player-link", text: @fav_reading.description)
      .first.trigger('click')

    # should be redirected to the poem show page for that reading
    # recall that this poem is @notfav_poem
    within('.poem-container') do
      expect(page).to have_content @notfav_poem.title
      expect(page).to have_content @notfav_poem.body
      expect(page).to_not have_content @fav_poem.body
    end
  end

  scenario 'by unfavoriting a reading and refreshing' do
    within("div[data-reading-id='#{@fav_reading.id}']") do
      page.find('.is-fav').trigger('click')
    end

    expect(page).to have_content @fav_poem.title

    visit(current_path)
    expect(page).not_to have_content @fav_reading.description
    expect(page).to have_content @fav_poem.title
  end
end
