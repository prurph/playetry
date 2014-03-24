json.tags @tags.each do |tag|
  json.text tag.name
  json.count tag.count
  json.url tag_path(tag)
end
