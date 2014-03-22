json.readings @readings.each do |reading|
  json.partial! reading
end
