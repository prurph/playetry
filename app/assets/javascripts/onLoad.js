playetry = {};

$(document).ready(function() {
  var dataController = $("body").attr("data-controller"),
      dataAction     = $("body").attr("data-action");

  if (dataController === "audio") {
    playetry.audioControl.onLoad();
    // .bind() all these handlers to the namespace to simplify using "this"
    $("#start-recording").click(
      playetry.audioControl.startRecording.bind(playetry.audioControl)
    );
    $("#stop-recording").click(
      playetry.audioControl.stopRecording.bind(playetry.audioControl)
    );
    $("#play-recording").click(
      playetry.audioControl.playback.bind(playetry.audioControl)
    );
  }
});
