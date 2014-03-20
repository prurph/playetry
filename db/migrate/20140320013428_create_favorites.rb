class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.references :user, index: true
      t.belongs_to :favoriteable, polymorphic: true
      t.timestamps
    end
    add_index :favorites, [:favoriteable_id, :favoriteable_type]
  end
end
