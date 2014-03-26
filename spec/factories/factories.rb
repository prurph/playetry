include ActionDispatch::TestProcess
FactoryGirl.define do

  sequence(:username) { |n| "user_#{n}" }
  sequence(:email) { |n| "user_#{n}@foobar.com" }
  sequence(:author) { |n| Faker::Name.name }
  sequence(:random_word) { |n| Faker::Lorem.word }


  factory :user do
    email
    username
    password "foobar55"
    password_confirmation "foobar55"
  end

  factory :poem do
    author { generate(:author) }
    title { generate(:random_word) }
    body { generate(:random_word) }
  end

  factory :reading do
    user
    description { generate(:random_word) }
    wav do
      fixture_file_upload(Rails.root.join('spec', 'wav', 'test.wav'), 'audio/wav')
    end
  end
end
