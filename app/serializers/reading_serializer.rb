class ReadingSerializer < ActiveModel::Serializer
  attributes :id, :wav_url

  def wav_url
    object.wav.url
  end
end
