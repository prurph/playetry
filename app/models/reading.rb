class Reading < ActiveRecord::Base
  belongs_to :poem
  belongs_to :user
  has_many :favorites, as: :favoriteable, dependent: :destroy

  delegate :username, to: :user
  delegate :url, to: :wav, prefix: true # reading.wav_url

  has_attached_file :wav
  validates_attachment :wav,
    content_type: { content_type: "audio/wav" },
    size: { in: 0..100.megabytes }
end
