require 'spec_helper'

feature 'user visits new poems page', :js do
  scenario 'when not logged in' do
    visit new_poem_path
    expect(page).to have_content "Please sign in or sign up."
  end

  scenario 'when logged in to submit a poem' do
    @user = create(:user)
    sign_in_as(@user)

    visit new_poem_path
    expect(page).to have_content "write"

    fill_in 'Click to enter title', with: 'Awesome new title'
    fill_in 'Click to enter author', with: 'Stellar new author'
    fill_in 'new-body', with: 'What a body'
    click_button 'Submit'

    expect(page).to have_content 'Awesome new title'
    expect(page).to have_content ' Stellar new author'
    expect(page).to have_content 'What a body'
  end
end
