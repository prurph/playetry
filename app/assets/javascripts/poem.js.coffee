class Playetry.Poem
  constructor: (railsPoem) ->
    for own key, value of railsReading
      this[key] = value

  renderSelf: ($parentNode) ->
    $selfNode = $(HandlebarsTemplates["poem"](this))
    $selfNode.appendTo($parentNode)
    this.attachHandlers()
    return $selfNode
