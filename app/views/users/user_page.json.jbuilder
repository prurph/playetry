json.poems @poems.each do |poem|
  json.partial! poem
end

json.readings @readings.each do |reading|
  json.partial! reading
end

json.user_readings @user_readings.each do |reading|
  json.partial! reading
end
