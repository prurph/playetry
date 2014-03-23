$(document).ready(function() {
  var dataController = $("body").attr("data-controller"),
      dataAction     = $("body").attr("data-action");

  Playetry.currentUserId  = $("body").attr("data-current-user");

  if (Playetry.currentUserId.length > 0 && dataController === "poems") {
    if (dataAction === "show") {
      var audCon = Playetry.audioControl;
      audCon.onLoad();
      // .bind() all these handlers to the namespace to simplify using "this"
      $("#toggle-recording").click(audCon.toggleRecording.bind(audCon));
      $("#save-recording").click(audCon.saveRecording.bind(audCon)
      );
      Playetry.favoriteControl.onLoad($("#reading-list"), $(".fav-poem"));
    } else if (dataAction === "index") {
      $("#send-search").click(Playetry.poemControl.searchPoems);
    } else if (dataAction === "new") {
      // http://jsfiddle.net/didierg/7aGFq/
      var split = function(val) { return val.split(/,\s*/); },
          extractLast = function(term) { return split(term).pop(); };
      $("#new-tags").autocomplete({
        minLength: 2,
        source: $("#new-tags").data("autocomplete-source"),
        // function(request, response) {
        //   // request is an object passed as {term: "textbox value"}
        //   var tag = extractLast(request.term);
        //   response($.ui.autocomplete.filter(
        //     $("#new-tags").data("autocomplete-source"), tag));
        // },
        focus: function() { return false; },
        select: Playetry.tagControl.onTagGenerated,
        // function(event, ui) {
        //   console.log(this);
        //   // ui is {item: {label: "selectboxval", value: "selectboxval"}}
        //   var terms = split(this.value);
        //   terms.pop();
        //   terms.push(ui.item.value);
        //   terms.push("");
        //   this.value = terms.join(", ");
        //   return false;
        // }
      });
      $("#new-tags").keyup(Playetry.tagControl.lookForComma);
    }
  } else if (dataController === "users") {
    Playetry.userControl.renderUser();
    Playetry.favoriteControl.onLoad($("#fav-readings"), undefined);
  }
});
