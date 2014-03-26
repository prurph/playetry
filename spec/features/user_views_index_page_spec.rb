require 'spec_helper'

feature 'logged out user views setup page', :js do
  background do
    @poems = create_list(:poem, 6)
    @poems.first.tag_list = "anger, sorrow, love"
    @poems.first.save!
  end

  scenario 'on fresh reload' do
    visit poems_path
    within('#poems-list') do
      expect(page).to have_content @poems.second.title
      expect(page).to have_content @poems.last.title
      expect(page).to have_content @poems.last.author.downcase

      # default is 5 most recent poems
      expect(page).to_not have_content @poems.first.title
    end

    within('#nav-list') do
      expect(page).to have_content "login", "my playetry", "search", "write"
    end

    expect(page).to have_css('svg')
  end
end

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
      expect(page).to have_content @poems.last.author.downcase

      # default is 5 most recent poems
      expect(page).to_not have_content @poems.first.title
    end
    within('#nav-list') do
      expect(page).to have_content "logout", "my playetry", "search", "write"
    end

    expect(page).to have_css('svg')
  end

  scenario 'user searches for a single parameter' do
    visit poems_path
    fill_in 'Title Search', with: @poems.first.title
    click_link 'Search'

    within('#poems-list') do
      expect(page).to have_content @poems.first.title
      expect(page).to have_content @poems.first.author.downcase
    end
  end

  scenario 'user searches for multiple parameters that should match a poem' do
    visit poems_path
    fill_in 'Title Search', with: @poems.first.title.slice(0,3)
    fill_in 'Author Search', with: @poems.first.author.downcase.slice(0,3)
    click_link 'Search'

    within('#poems-list') do
      expect(page).to have_content @poems.first.title
      expect(page).to have_content @poems.first.author.downcase

      expect(page).to_not have_content @poems.second.title
    end
  end

  scenario 'user searches for multiple parameters that should not match a poem' do
    visit poems_path
    fill_in 'Title Search', with: 'asdf'
    fill_in 'Author Search', with: 'asdf'
    fill_in 'Body Search', with: 'asdf'
    click_link 'Search'

    within('#search-by') do
      expect(page).to have_content "0 results"
    end
  end

end
