class Playetry.AudioPlayer
  constructor: (railsReading) ->
    for own key, value of railsReading
      this[key] = value

  renderSelf: ($parentNode) ->
    $selfNode = $(HandlebarsTemplates["audio_player"](this))
    $selfNode.appendTo($parentNode)
    this.attachHandlers()
    return $selfNode

  attachHandlers: ->
    $playerNode = $("[data-reading-id='#{this.id}']")
    $audioNode  = $playerNode.children("audio")
    $playerNode.click (event) ->
      clicked = $(event.target).attr("data-player-action")
      # get the DOM node of the player to call functions on
      if clicked?
        Playetry.AudioPlayer[clicked].call($audioNode[0], event)
        return false
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

  @setVolume: (audioNode, percentage, $volStatus) ->
    $playerContainer = $(audioNode).parent()
    $volIcon = $playerContainer.find(".volume-glyph")
    audioNode.volume = percentage
    $volStatus.width("#{percentage*100}%")

    if percentage != 0
      $volIcon.addClass("glyphicon-volume-up")
        .removeClass("glyphicon-volume-off")
      $volStatus.attr("data-player-vol", percentage)
    else
      $volIcon.addClass("glyphicon-volume-off")
        .removeClass("glyphicon-volume-up")

  @clickVolumeSlider: (event) ->
    $volSlider     = $(event.currentTarget).find(".volume-meter")
    volSliderWidth = $volSlider.outerWidth()
    $volStatus     = $(event.currentTarget).find(".volume-status")
    clickLocation  = event.originalEvent.layerX

    percentage = clickLocation / volSliderWidth
    # aesthetically cleaner to assume user wants max volume if click near end
    if percentage > 0.95 then percentage = 1.0

    Playetry.AudioPlayer.setVolume(this, percentage, $volStatus)

  @setTrackPosition: (event) ->
    $trackSlider     = $(event.currentTarget).find(".track-slider")
    trackSliderWidth = $trackSlider.outerWidth()
    $trackStatus     = $(event.currentTarget).find(".track-progress")
    clickLocation    = event.originalEvent.layerX

    percentage = clickLocation / trackSliderWidth
    this.currentTime = this.duration * percentage

  @toggleVolume: (event) ->
    $volStatus = $(event.currentTarget).find(".volume-status")
    if this.volume != 0
      Playetry.AudioPlayer.setVolume(this, 0, $volStatus)
    else
      Playetry.AudioPlayer.setVolume(this,
        $volStatus.attr("data-player-vol"), $volStatus)

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

