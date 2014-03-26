class Playetry.Poem
  constructor: (railsPoem) ->
    for own key, value of railsPoem
      this[key] = value

  renderSelf: ($parentNode) ->
    $selfNode = $(HandlebarsTemplates["poem"](this))
    $selfNode.appendTo($parentNode)
    return $selfNode
