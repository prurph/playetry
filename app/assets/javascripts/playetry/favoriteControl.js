window.Playetry.favoriteControl = {
  onLoad: function($readingNode, $poemNode) {
    if (Playetry.currentUserId) {
      if ($readingNode) { this.bindGlyphClicks($readingNode, "reading"); }
      if ($poemNode)    { this.bindGlyphClicks($poemNode, "poem"); }
    }
  },
  bindGlyphClicks: function($parent, type) {
    $parent.click(function(event) {
      var $glyph = $(event.target),
          dataAttr;
      // since just one handler for the whole list, must verify they clicked the
      // actual favorite glyph
      if ($glyph.hasClass("glyphicon-heart-empty")) {
      // this itemId assignment looks janky but is better performance than doing
      // regex matches on the class names like [class$='container'] or something
        var action   = ($glyph.hasClass("is-fav")) ? "DELETE" : "POST",
            itemId;
        dataAttr = "data-" + type + "-id";
        itemId    = $glyph.parents("[" + dataAttr + "]").attr(dataAttr);
        Playetry.favoriteControl.railsFav(type + "s", itemId, action,
          Playetry.favoriteControl.toggleHeart.bind($glyph));
      } else if ($glyph.hasClass("glyphicon-remove")) {
        dataAttr = $glyph.parents("[data-reading-id]")
          .attr("data-reading-id");
        if (confirm("Permanently delete this recording?")) {
          Playetry.favoriteControl.delReading(dataAttr, $glyph);
        }
      }
    });
  },
  railsFav: function(favoriteable, id, action, callback) {
    $.ajax({
      url: "/favorites/" + favoriteable + "/" + id,
      type: action,
      dataType: "json",
      data: null,
    })
    .done(function(response) {
      callback();
    })
    .fail(function() {
      console.log("error");
    });
  },
  toggleHeart: function() {
    this.toggleClass("is-fav");
  },
  delReading: function(readingId, $glyph) {
    $.ajax({
      url: "/readings/" + readingId,
      type: "DELETE",
      dataType: "json",
    })
    .done(function(response) {
      console.log(response);
      $glyph.parents("li").remove();
    })
    .fail(function(response) {
      console.log(response);
    });
  }
};
