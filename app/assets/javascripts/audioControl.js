window.Playetry.audioControl = {
  onLoad: function() {
    this.recordedBlob = {};
    this.trackMaxTime = { maxTime: 360000, timeoutId: null }
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = (navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia);
  },
  onFail: function(error) {
    console.log("Error: ", error)
  },
  onSuccess: function(source) {
    var context, mediaStreamSource, recorder;
    // FF and Chrome use different constructors; ensure correct one is used
    context = (typeof AudioContext !== "undefined") ?
      new AudioContext() : new webkitAudioContext();
    mediaStreamSource = context.createMediaStreamSource(source);
    this.recorder = new Recorder(mediaStreamSource)
    this.recorder.record();
    this.trackMaxTime.timeoutId = setTimeout(this.stopRecording,
      this.trackMaxTime.maxTime);
  },

  startRecording: function(event) {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({audio: true},
        this.onSuccess.bind(this),
        this.onFail.bind(this));
    } else {
      console.log("navigator.getUserMedia not present");
    }
  },

  stopRecording: function(event) {
    if (typeof this.recorder !== "undefined") {
      clearTimeout(this.trackMaxTime.timeoutId);
      this.recorder.stop();
      this.recorder.exportWAV(function(s) {
        // "this" is window here, so explicitly specify the namespace
        window.Playetry.audioControl.recordedBlob = s;
        window.Playetry.audioControl.playback(s);
      });
      return false;
    }
  },

  playback: function(blob) {
    // User just recorded something but it's not on the server yet, so create a
    // player with data-reading-id="-1" so they can listen to it before saving
    $defaultPlayer = $("#default-player").empty()
    $("#save-recording").removeClass("hidden")
    var newPlayer = new window.Playetry.AudioPlayer({
      id: -1,
      wav_url: window.URL.createObjectURL(blob)
    });
    newPlayer.renderSelf($defaultPlayer);
  },

  saveRecording: function(event) {
    if (this.recordedBlob !== {}) {
      this.ajaxPost(this.recordedBlob);
    }
  },

  ajaxPost: function(blob) {
    var data = new FormData(),
        fileExt = ".wav";

    data.append("audio", blob, new Date().getTime() + fileExt);
    $.ajax({
      url: '/audio/save_file',
      type: 'POST',
      data: data,
      contentType: false,
      processData: false
    })
    .done(function(response) {
      console.log(response);
    })
    .fail(function() {
      console.log("error");
    })
  },

  getReading: function(readingId) {
    $.ajax({
      url: '/audio/get_file/' + readingId,
      type: 'GET',
      dataType: 'json'
    })
    // Rails responds with serialzation of reading {reading: obj}
    .done(function(response) {
      console.log(response);
      var reading = new window.Playetry.AudioPlayer(response.reading);
      reading.renderSelf($("#playstuff"))
    })
  }
}

