$(document).ready(function() {
  var dataController = $("body").attr("data-controller"),
      dataAction     = $("body").attr("data-action");

  if (dataController === "audio" || dataController === "poems") {
    var audCon = Playetry.audioControl;
    audCon.onLoad();
    // .bind() all these handlers to the namespace to simplify using "this"
    $("#toggle-recording").click(
      audCon.toggleRecording.bind(audCon)
    );
    $("#save-recording").click(
      audCon.saveRecording.bind(audCon)
    );
  }
});
