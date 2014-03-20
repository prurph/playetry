class Favorite < ActiveRecord::Base
  belongs_to :user
  belongs_to :favoriteable, polymorphic: true

  # Allows calling user.favorites.poems, user.readings.poems
  scope :poems, -> { where(favoriteable_type: 'Poem')}
  scope :readings, -> { where(favoriteable_type: 'Reading')}

  validates :user_id, presence: true
  validates :user_id, uniqueness: { scope:
      [:favoriteable_id, :favoriteable_type]
    }
end
