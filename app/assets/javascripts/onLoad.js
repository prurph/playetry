Playetry.ready = function() {
  var dataController = $("body").attr("data-controller"),
      dataAction     = $("body").attr("data-action");

  Playetry.currentUserId  = $("body").attr("data-current-user");

  if (dataController === "poems") {
    if (dataAction === "show" && Playetry.currentUserId.length > 0) {
      var audCon = Playetry.audioControl;
      audCon.onLoad();
      // .bind() all these handlers to the namespace to simplify using "this"
      $("#toggle-recording").click(audCon.toggleRecording.bind(audCon));
      $("#save-recording").click(audCon.saveRecording.bind(audCon)
      );
      Playetry.favoriteControl.onLoad($("#reading-list"), $(".fav-poem"));
    } else if (dataAction === "index") {
      $("#send-search").click(Playetry.poemControl.searchPoems);
    } else if (dataAction === "new" && Playetry.currentUserId.length > 0) {
      $("#new-tags").autocomplete({
        minLength: 2,
        source: $("#new-tags").data("autocomplete-source"),
        focus: function() { return false; },
        select: Playetry.tagControl.onTagGenerated
      });
      $("#new-tags").keyup(Playetry.tagControl.lookForComma);
      $("#submit-poem").click(Playetry.tagControl.fillHidden);
    }
  } else if (dataController === "users") {
    Playetry.userControl.renderUser();
    Playetry.favoriteControl.onLoad($("#fav-readings"), undefined);
  }
};

$(document).ready(Playetry.ready);
$(document).on('page:load', Playetry.ready);
