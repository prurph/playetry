Playetry.onLoad = {
  ready: function() {
    // this is bound to Playetry.onLoad
    this.dataController = $("body").attr("data-controller");
    this.dataAction     = $("body").attr("data-action");
    Playetry.currentUserId  = $("body").attr("data-current-user");

    if (this.dataController === "poems") {
      Playetry.onLoad.poems();
    } else if (this.dataController === "users") {
      Playetry.onLoad.users();
    }
  },
  poemsIndex: function() {
    $("#send-search").click(Playetry.poemControl.searchPoems);
    Playetry.d3Tags();
  },
  poemsShow: function() {
    if (Playetry.currentUserId > 0) {
      var audCon = Playetry.audioControl;
      audCon.onLoad();
      // .bind() all these handlers to the namespace to simplify using "this"
      $("#toggle-recording").click(audCon.toggleRecording.bind(audCon));
      $("#save-recording").click(audCon.saveRecording.bind(audCon));
    }
  },
  poemsNew: function() {
    if (Playetry.currentUserId > 0) {
      $("#new-tags").autocomplete({
        minLength: 2,
        source: $("#new-tags").data("autocomplete-source"),
        focus: function() { return false; },
        select: Playetry.tagControl.onTagGenerated
      });
      $("#new-tags").keyup(Playetry.tagControl.lookForComma);
      $("#submit-poem").click(Playetry.tagControl.fillHidden);
    }
  },
  poems: function() {
    if (this.dataAction === "index") {
      this.poemsIndex();
    } else if (this.dataAction === "new") {
      this.poemsNew();
    } else if (this.dataAction === "show") {
      this.poemsShow();
    }
  },
    // if (this.dataAction === "index") {
    //   $("#send-search").click(Playetry.poemControl.searchPoems);
    //   Playetry.d3Tags();
    // } else if (Playetry.currentUserId.length > 0) {
    //   if (this.dataAction === "new") {
    //       $("#new-tags").autocomplete({
    //       minLength: 2,
    //       source: $("#new-tags").data("autocomplete-source"),
    //       focus: function() { return false; },
    //       select: Playetry.tagControl.onTagGenerated
    //     });
    //     $("#new-tags").keyup(Playetry.tagControl.lookForComma);
    //     $("#submit-poem").click(Playetry.tagControl.fillHidden);
    //   } else if (this.dataAction === "show") {
    //     var audCon = Playetry.audioControl;
    //     audCon.onLoad();
    //     // .bind() all these handlers to the namespace to simplify using "this"
    //     $("#toggle-recording").click(audCon.toggleRecording.bind(audCon));
    //     $("#save-recording").click(audCon.saveRecording.bind(audCon));
    //   }
    // }
  // },
  users: function() {
    Playetry.userControl.renderUser();
    Playetry.favoriteControl.onLoad($("#fav-readings"), undefined);
  }
};

// Playetry.onLoad.poems = function() {
//   if (dataAction === "show" && Playetry.)
// }

$(document).ready(Playetry.onLoad.ready.bind(Playetry.onLoad));
$(document).on("page:load", Playetry.onLoad.ready.bind(Playetry.onLoad));
