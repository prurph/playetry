json.readings @readings.each do |reading|
  json.(reading, :description, :id, :wav_url)
  json.user_fav true if @user_favs.include?(reading.id)
end
