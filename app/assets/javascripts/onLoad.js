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
    } else if (this.dataController === "static_pages") {
      Playetry.onLoad.main();
    }
  },
  poemsIndex: function() {
    $("#send-search").click(Playetry.poemControl.searchPoems);
    Playetry.d3Tags("#tags-list", $(".tags-index").width()*1.5);
  },
  poemsShow: function() {
    if (Playetry.currentUserId > 0) {
      var audCon = Playetry.audioControl;
      audCon.onLoad();
      // .bind() all these handlers to the namespace to simplify using "this"
      $("#toggle-recording").click(audCon.toggleRecording.bind(audCon));
      $("#save-recording").click(audCon.saveRecording.bind(audCon));
      Playetry.favoriteControl.onLoad($("#reading-list"), $(".fav-poem"));
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
      var pendingSearch = window.sessionStorage.playetryPoemsByTag;
      if (pendingSearch) {
        Playetry.poemControl.poemsByTag.bind({textContent: pendingSearch})();
        window.sessionStorage.removeItem("playetryPoemsByTag");
      }
    } else if (this.dataAction === "new") {
      this.poemsNew();
    } else if (this.dataAction === "show") {
      this.poemsShow();
    }
  },
  users: function() {
    Playetry.userControl.renderUser();
    Playetry.favoriteControl.onLoad($("#fav-readings"), undefined);
    Playetry.favoriteControl.onLoad($("#user-readings"), undefined);
  },
  main: function() {
    Playetry.d3Tags("#big-tag-cloud", $("#big-tag-cloud").width());
  }
};

$(document).ready(Playetry.onLoad.ready.bind(Playetry.onLoad));
$(document).on("page:load", Playetry.onLoad.ready.bind(Playetry.onLoad));
