class CreateReadings < ActiveRecord::Migration
  def change
    create_table :readings do |t|
      t.text :name

      t.timestamps
    end
  end
end
