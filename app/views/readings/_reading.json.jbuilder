json.(reading, :description, :id, :wav_url)
json.username reading.username if reading.user.present?
json.user_fav true if @user_favs.try(:include?, reading.id)
json.poem_url "#{url_for(poems_path)}/#{reading.poem_id}" if @link_poem
json.is_users true if reading.user == current_user
