# http://serversideup.net/style-the-html-5-audio-element/
class Playetry.AudioPlayer
  constructor: (railsReading) ->
    for own key, value of railsReading
      this[key] = value

  renderSelf: ($parentNode) ->
    $parentNode.append(HandlebarsTemplates["audio_player"](this))
    this.attachHandlers()

  attachHandlers: ->
    $playerNode = $("[data-reading-id='#{this.id}']")
    $audioNode  = $playerNode.children("audio")
    $playerNode.click (event) ->
      event.preventDefault()
      clicked = $(event.target).attr("data-player-action")
      # get the DOM node of the player to call functions on
      # audioTag = $(this).children(".audio-player")[0]
      Playetry.AudioPlayer[clicked].call($audioNode[0], event);
      return false;
    # timeupdate is the event an active <audio> tag fires every second
    $audioNode.on("timeupdate",
      Playetry.AudioPlayer.updateTime.bind($audioNode[0]))

  @playSong: (event) ->
    this.play();

  @pauseSong: (event) ->
    this.pause();

  @playPause: (event) ->
    if this.paused
      this.play()
      $(event.currentTarget).addClass("playing")
    else
      this.pause()
      $(event.currentTarget).removeClass("playing")

  @setVolume: (event) ->
    # use .find() to search through all descendants
    $volSlider     = $(event.currentTarget).find(".volume-meter")
    volSliderWidth = $volSlider.outerWidth()
    $volStatus     = $(event.currentTarget).find(".volume-status")
    clickLocation  = event.originalEvent.layerX

    percentage  = clickLocation / volSliderWidth
    this.volume = percentage
    $volStatus.width("#{percentage*100}%")

  @setTrackPosition: (event) ->
    $trackSlider     = $(event.currentTarget).find(".track-slider")
    trackSliderWidth = $trackSlider.outerWidth()
    $trackStatus     = $(event.currentTarget).find(".track-progress")
    clickLocation    = event.originalEvent.layerX

    percentage = clickLocation / trackSliderWidth
    this.currentTime = this.duration * percentage
    # $trackStatus.width("#{percentage*100}%")

  @updateTime: ->
    currSeconds = (if Math.floor(this.currentTime % 60) < 10 then "0" else "") +
      Math.floor(this.currentTime % 60)
    currMinutes = Math.floor(this.currentTime / 60)

    $(this).siblings(".song-time").text("#{currMinutes}:#{currSeconds}")

    percentage = this.currentTime / this.duration
    $(this).parent().find(".track-progress").width("#{percentage*100}%")
