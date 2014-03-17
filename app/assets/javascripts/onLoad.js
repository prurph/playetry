$(document).ready(function() {
  var dataController = $("body").attr("data-controller"),
      dataAction     = $("body").attr("data-action");

  if (dataController === "audio") {
    Playetry.audioControl.onLoad();
    // .bind() all these handlers to the namespace to simplify using "this"
    $("#start-recording").click(
      Playetry.audioControl.startRecording.bind(Playetry.audioControl)
    );
    $("#stop-recording").click(
      Playetry.audioControl.stopRecording.bind(Playetry.audioControl)
    );
    $("#save-recording").click(
      Playetry.audioControl.saveRecording.bind(Playetry.audioControl)
    );
  }
});
