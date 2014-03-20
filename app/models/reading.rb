class Reading < ActiveRecord::Base
  belongs_to :poem
  belongs_to :user
  delegates :username, to: :user
  has_many :favorites, as: :favoriteable, dependent: :destroy

  has_attached_file :wav
  validates_attachment :wav,
    content_type: { content_type: "audio/wav" },
    size: { in: 0..100.megabytes }
end
