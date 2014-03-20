class CreateReadings < ActiveRecord::Migration
  def change
    create_table :readings do |t|
      t.text :description
      t.references :user, index: true
      t.references :poem, index: true
      t.timestamps
    end
  end
end
