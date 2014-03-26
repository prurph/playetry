require 'spec_helper'

feature 'user views user page', :js do
  scenario 'when not logged in' do
    visit user_path
    expect(page).to have_content "Please sign in or sign up."
  end

  scenario 'when logged in with fav poem/reading and a submitted reading' do
    @user = create(:user)
    sign_in_as(@user)

    @poems = create_list(:poem, 2)
    @fav_poem = @poems.first
    @notfav_poem = @poems.second
    @favorite = @fav_poem.favorites.new(user: @user)
    @favorite.save!

    @readings = create_list(:reading, 2)
    @fav_reading = @readings.first
    @notfav_reading = @readings.second
    # Mix/match poem and favorite
    @fav_reading.poem = @poems.second
    @favorite2 = @fav_reading.favorites.new(user: @user)
    @favorite2.save!
    @fav_reading.save!

    @user_reading = create(:reading, user: @user)

    click_link 'my playetry'

    expect(page).to have_content @user.username.downcase

    within('.poems-index') do
      expect(page).to have_content "your favorite poems"
      expect(page).to have_content @fav_poem.title
      expect(page).to have_content @fav_poem.author.downcase

      expect(page).to_not have_content @notfav_poem.title
    end

    expect(page).to have_content 'your favorite readings'

    within('#fav-readings') do
      expect(page).to have_content @fav_reading.description
      expect(page).to_not have_content @notfav_reading.description
    end

    within('#user-readings') do
      expect(page).to have_content @user_reading.description
    end
  end
end
