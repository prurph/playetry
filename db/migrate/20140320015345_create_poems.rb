class CreatePoems < ActiveRecord::Migration
  def change
    create_table :poems do |t|
      t.text :title, index: true
      t.text :author, index: true
    end
  end
end
