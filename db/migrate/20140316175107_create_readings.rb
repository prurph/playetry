class CreateReadings < ActiveRecord::Migration
  def change
    create_table :readings do |t|
      t.text :description
      t.timestamps
    end
  end
end
