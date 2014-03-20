class Poem < ActiveRecord::Base
  has_many :readings, dependent: :destroy
  has_many :favorites, as: :favoriteable, dependent: :destroy
end
