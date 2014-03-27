require 'spec_helper'

feature 'user submits a reading', :js do
  scenario 'a new reading is created' do
    pending "Capybara support for clicking 'allow' for HTML5 Audio"
    @user = create(:user)
    sign_in_as(@user)
    @poem = create(:poem)

    visit poem_path(@poem)
    save_and_open_page
    click_button 'REC'
    click_button 'STOP'
    fill_in 'recording-desc', with: 'New reading'
    click_button 'Save!'

    within('#reading-list') do
      expect(page).to_have content('New reading')
    end
  end
end
