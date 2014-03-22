$(document).ready(function() {
  var dataController = $("body").attr("data-controller"),
      dataAction     = $("body").attr("data-action");

  Playetry.currentUserId  = $("body").attr("data-current-user");

  if (Playetry.currentUserId.length > 0 && dataController === "poems") {
    if (dataAction === "show") {
      var audCon = Playetry.audioControl;
      audCon.onLoad();
      // .bind() all these handlers to the namespace to simplify using "this"
      $("#toggle-recording").click(
        audCon.toggleRecording.bind(audCon)
      );
      $("#save-recording").click(
        audCon.saveRecording.bind(audCon)
      );
      Playetry.favoriteControl.onLoad();
    } else if (dataAction === "index") {
      $("#send-search").click(
        Playetry.poemControl.searchPoems
      );
    }
  }
});
