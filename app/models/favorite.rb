class Favorite < ActiveRecord::Base
  belongs_to :user
  belongs_to :favoriteable, polymorphic: true

  validates :user_id, uniqueness: { scope:
      [:favoriteable_id, :favoriteable_type]
    }
end
