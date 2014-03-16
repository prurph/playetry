class AddAttachmentWavToReadings < ActiveRecord::Migration
  def self.up
    change_table :readings do |t|
      t.attachment :wav
    end
  end

  def self.down
    drop_attached_file :readings, :wav
  end
end
