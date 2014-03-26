require 'spec_helper'

feature 'user interacts with poem show page', :js do
  background do
    @poem = create(:poem)
    @poem.tag_list = "life, love"
    @poem.save!
  end

  scenario 'when not logged in' do
    visit poem_path(@poem)

    expect(page).to have_content @poem.title
    expect(page).to have_content "by #{@poem.author}"
    expect(page).to have_content @poem.body
    expect(page).to have_content @poem.tags.first.name
    expect(page).to have_content "Sign in to record"
  end

  scenario 'when logged in' do
    visit poem_path(@poem)

    expect(page).to have_content @poem.title
    expect(page).to have_content "by #{@poem.author}"
    expect(page).to have_content @poem.body
    expect(page).to have_content @poem.tags.first.name
  end
end
