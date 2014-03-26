require 'spec_helper'

feature 'returning user views setup page', :js do
  background do
    @user = create(:user)
    sign_in_as(@user)

    @poems = create_list(:poem, 6)
    @poems.first.tag_list = "anger, sorrow, love"
    @poems.first.save!
  end

  scenario 'on fresh reload' do
    visit poems_path
    within('#poems-list') do
      expect(page).to have_content @poems.second.title
      expect(page).to have_content @poems.last.title
      expect(page).to have_content @poems.last.author

      # default is 5 most recent poems
      expect(page).to_not have_content @poems.first.title
    end
    save_and_open_page
    within('#nav-list') do
      expect(page).to have_content "logout", "my playetry", "search", "write"
    end
  end
end
