window.Playetry.audioControl = {
  onLoad: function() {
    this.recordedBlob = {};
    this.trackMaxTime = { maxTime: 360000, timeoutId: null };
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = (navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia);
  },
  onFail: function(error) {
    console.log("Error: ", error);
    Playetry.audioControl.toggleRecording();
  },

  onSuccess: function(source) {
    var context, mediaStreamSource, recorder;
    // FF and Chrome use different constructors; ensure correct one is used
    context = (typeof AudioContext !== "undefined") ?
      new AudioContext() : new webkitAudioContext();
    mediaStreamSource = context.createMediaStreamSource(source);
    this.recorder = new Recorder(mediaStreamSource);
    this.recorder.record();
    this.trackMaxTime.timeoutId = setTimeout(this.stopRecording,
      this.trackMaxTime.maxTime);
    $("#toggle-recording").text("STOP").toggleClass("btn-success btn-danger");
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
        // this is window in .exportWAV() so explicitly specify the namespace
        Playetry.audioControl.recordedBlob = s;
        Playetry.audioControl.playback(s);
      });
      $("#toggle-recording").text("REC").toggleClass("btn-success btn-danger");
      return false;
    }
  },

  toggleRecording: function(event) {
    var $button = $("#toggle-recording");
    // this is Playetry.audioControl here because of .bind() in onLoad.js
    if ($button.text().match(/stop/i)) {
      this.stopRecording.bind(this)();
    } else {
      this.startRecording.bind(this)();
    }
  },

  playback: function(blob) {
    // User just recorded something but it's not on the server yet, so create a
    // player with data-reading-id="undefined" so they can listen to it before
    // saving. Handlebars uses this undefined to not render a favorite option

    var $newReadingInner = $("#new-reading-inner");
    $newReadingInner.find(".player-container").remove();
    $("#save-recording").removeClass("hidden");
    $("#recording-desc").removeClass("hidden");
    var newPlayer = new window.Playetry.AudioPlayer({
      id: "undefined",
      wav_url: window.URL.createObjectURL(blob)
    });
    newPlayer.renderSelf($newReadingInner).addClass("new-reading");
  },

  saveRecording: function(event) {
    if (this.recordedBlob !== {}) {
      this.createReading(this.recordedBlob);
    }
  },

  createReading: function(blob) {
    var data = new FormData(),
        fileExt = ".wav",
        $description = $("#recording-desc"),
        descriptionText = $description.val();

    if (descriptionText.length > 30 || descriptionText.length <= 3) {
      // ADD ERROR HANDLING HERE
      alert("Descriptions should be 3-30 characters.");
    } else {
      data.append("wav", blob, new Date().getTime() + fileExt);
      data.append("description", descriptionText);
      $.ajax({
        // current URL is /poems/:poem_id, tacking on readings and making a POST
        // gives readings#create controller as a resourceful nested route
        url: window.location.pathname + '/readings',
        type: 'POST',
        data: data,
        contentType: false,
        processData: false
      })
      .done(function(response) {
        $description.val("");
        console.log(response);
        Playetry.audioControl.animateToList(response);
      })
      .fail(function() {
        console.log("error");
      });
    }
  },

  getReadings: function(poemId) {
    $.ajax({
      url: '/poems/' + poemId + '/readings',
      type: 'GET',
      dataType: 'json'
    })
    .done(function(response) {
      console.log(response);
      Playetry.audioControl.makePlayers(response.readings, $("#reading-list"));
    });
  },

  makePlayers: function(readings, $attachNode) {
    $.each(readings, function(index, reading) {
      var readingInstance = new Playetry.AudioPlayer(reading);
      readingInstance.renderSelf($attachNode);
    });
  },

  animateToList: function(response) {
    var $newReading  = $(".new-reading"),
        $readCont    = $(".readings-container"),
        $readingList = $("#reading-list"),
        $lis         = $readingList.children(),
        $lisHeight   = $lis.outerHeight() * $lis.length,
        scrollDist;

    $newReading.find(".player-description").text(response.description);
    $newReading.find(".player-username").text("by " + response.username)
      .show();

    scrollDist = function() {
      // If there is overflow on the list it must be scrolled
      return ($lisHeight > $readCont.height()) ? 9000 : -9000;
    };

    // scroll the list to the bottom then...
    $readCont.animate({scrollTop: scrollDist()}, "slow", function() {
      // shrink the new reading so it's the same width as the list of existing
      $newReading.animate({ width: $readCont.width() + "px" }, 500, function() {
        var topOffset = Math.min($lisHeight, $readCont.height());
        var offsets = {
            top: $readCont.offset().top + topOffset - $newReading.offset().top,
            left: $readCont.offset().left - $newReading.offset().left
          };
        // move the new reading over to the existing list
        $newReading.animate({
          top: offsets.top + "px",
          left: offsets.left + "px",
        }, 750, function() {
          // fade out the new reading and stick the actual recording on the list
          $newReading.fadeOut(500);
          $("#save-recording").fadeOut(500, function() {

            $(this).addClass("hidden").fadeIn();
            $("#recording-desc").addClass("hidden");
            Playetry.audioControl.makePlayers([response], $readingList);
            $readCont.scrollTop(scrollDist());
            $newReading.remove();
          });
        });
      });
    });
  }
};

