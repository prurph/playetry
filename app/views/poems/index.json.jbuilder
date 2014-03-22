json.poems @poems.each do |poem|
  json.partial! poem
end
