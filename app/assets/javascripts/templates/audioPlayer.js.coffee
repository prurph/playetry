# http://serversideup.net/style-the-html-5-audio-element/
class Playetry.AudioPlayer
  constructor: (railsReading) ->
    for own key, value of railsReading
      this[key] = value

  renderSelf: ($parentNode) ->
    # bind to self so we can access all the properties
    $parentNode.append(HandlebarsTemplates["audio_player"].bind(this))
