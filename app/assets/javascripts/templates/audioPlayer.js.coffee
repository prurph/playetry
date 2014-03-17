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
      if clicked?
        Playetry.AudioPlayer[clicked].call($audioNode[0], event);
        return false;
    # timeupdate is the event an active <audio> tag fires every second
    $audioNode.on("timeupdate",
      Playetry.AudioPlayer.updateTime.bind($audioNode[0]))

  @playPause: (event) ->
    if this.paused
      this.play()
      $(event.currentTarget).addClass("playing")
    else
      this.pause()
      $(event.currentTarget).removeClass("playing")
    Playetry.AudioPlayer.playPauseBtnState($(event.target))

  @playPauseBtnState: ($playPauseButton) ->
    $playPauseButton.toggleClass("glyphicon-play glyphicon-pause")

  @setVolume: (audioNode, percentage) ->
    # use .find() to search through all descendants
    $volStatus = $(audioNode).parent().find(".volume-status")
    audioNode.volume = percentage
    $volStatus.width("#{percentage*100}%")

  @clickVolumeSlider: (event) ->
    $volSlider     = $(event.currentTarget).find(".volume-meter")
    volSliderWidth = $volSlider.outerWidth()
    $volStatus     = $(event.currentTarget).find(".volume-status")
    clickLocation  = event.originalEvent.layerX

    percentage = clickLocation / volSliderWidth
    # aesthetically cleaner to assume user wants max volume if click near end
    if percentage > 0.95 then percentage = 1.0

    Playetry.AudioPlayer.setVolume(this, percentage)

  @setTrackPosition: (event) ->
    $trackSlider     = $(event.currentTarget).find(".track-slider")
    trackSliderWidth = $trackSlider.outerWidth()
    $trackStatus     = $(event.currentTarget).find(".track-progress")
    clickLocation    = event.originalEvent.layerX

    percentage = clickLocation / trackSliderWidth
    this.currentTime = this.duration * percentage

  @toggleVolume: (event) ->
    if this.volume != 0
      $(event.target).attr("data-player-vol", this.volume)
      Playetry.AudioPlayer.setVolume(this, 0)
    else
      Playetry.AudioPlayer.setVolume(this,
        $(event.target).attr("data-player-vol"))
    $(event.target).toggleClass("glyphicon-volume-up glyphicon-volume-off")

  @updateTime: ->
    currSeconds = (if Math.floor(this.currentTime % 60) < 10 then "0" else "") +
      Math.floor(this.currentTime % 60)
    currMinutes = Math.floor(this.currentTime / 60)

    $playerContainer = $(this).parent()

    $playerContainer.find(".track-time").text("#{currMinutes}:#{currSeconds}")

    percentage = this.currentTime / this.duration
    $playerContainer.find(".track-progress").width("#{percentage*100}%")

    if percentage == 1
      $playerContainer.removeClass("playing")

      Playetry.AudioPlayer.playPauseBtnState(
        $playerContainer.find(".play-pause-glyph")
      )

