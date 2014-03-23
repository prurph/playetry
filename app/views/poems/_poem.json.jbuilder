json.(poem, :title, :author, :id)
json.url url_for(poem)
json.tags poem.tags if poem.tags.present?
