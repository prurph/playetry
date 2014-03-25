include ActionDispatch::TestProcess
FactoryGirl.define do

  sequence(:username) { |n| "user_#{n}" }
  sequence(:email) { |n| "user_#{n}@foobar.com" }
  sequence(:random_words) { |n| Faker::Lorem.words(5).join }

  factory :user do
    email
    username
    password "foobar55"
    password_confirmation "foobar55"
  end

  factory :poem do
    title { generate(:random_words) }
    author { generate(:random_words) }
    body { generate(:random_words) }
  end

  factory :reading do
    user
    description { generate(:random_words) }
    wav do
      fixture_file_upload(Rails.root.join('spec', 'wav', 'test.wav'), 'audio/wav')
    end
  end
end
