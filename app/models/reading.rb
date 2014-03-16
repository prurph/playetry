class Reading < ActiveRecord::Base
  has_attached_file :wav
  validates_attachment :wav,
    content_type: { content_type: "audio/wav" },
    size: { in: 0..100.megabytes }
end
