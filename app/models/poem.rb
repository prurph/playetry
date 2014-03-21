class Poem < ActiveRecord::Base
  has_many :readings, dependent: :destroy
  has_many :favorites, as: :favoriteable, dependent: :destroy
  before_create :added_at

  validates :title,
    uniqueness: { scope: :author, message: "Poem already exists"},
    presence: true
  validates :author, presence: true
  validates :body, presence: true

  def added_at
    added_at = Time.now()
  end
end
