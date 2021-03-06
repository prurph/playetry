class Poem < ActiveRecord::Base
  fuzzily_searchable :title, :author, :body
  acts_as_taggable

  has_many :readings, dependent: :destroy
  has_many :favorites, as: :favoriteable, dependent: :destroy
  before_create :added_at

  validates :title,
    uniqueness: { scope: :author, message: "already exists"},
    presence: true
  validates :author, presence: true
  validates :body, presence: true

  def added_at
    self.added_at = Time.now()
  end

  def self.find_fuzzy(params)
    first_search = true
    poems = []
    params.each do |term, input|
      results = Poem.send("find_by_fuzzy_#{term}", input, {limit: 25})
      poems = (first_search && results) || poems & results
      first_search = false
    end
    return (poems || [])
  end
end
