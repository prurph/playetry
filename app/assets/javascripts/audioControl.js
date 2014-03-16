window.Playetry.audioControl = {
  onLoad: function() {
    this.recordedBlob = {};
    this.audioNode = document.querySelector("audio");
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
    this.recorder = new Recorder(mediaStreamSource,
      {workerPath: "../assets/recorderWorker.js"});
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
    clearTimeout(this.trackMaxTime.timeoutId);
    this.recorder.stop();
    console.log("Recording stopped");
    this.recorder.exportWAV(function(s) {
      // "this" is window here, so explicitly specify the namespace
      window.Playetry.audioControl.recordedBlob = s;
    });
  },

  playback: function() {
    this.audioNode.src = window.URL.createObjectURL(this.recordedBlob);
    this.ajaxPost(this.recordedBlob);
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
      var $playstuff = $("#playstuff"),
          $newTrack  = $("<audio/>", { src: response.reading.wav_url }).
            prop("controls", true);

      $playstuff.append($newTrack)
    })
  }
}

