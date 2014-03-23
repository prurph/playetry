window.Playetry.favoriteControl = {
  onLoad: function($readingNode, $poemNode) {
    if (Playetry.currentUserId) {
      if ($readingNode) { this.bindHeartClicks($readingNode, "reading"); }
      if ($poemNode)    { this.bindHeartClicks($poemNode, "poem"); }
    }
  },
  bindHeartClicks: function($parent, type) {
    $parent.click(function(event) {
      var $heart = $(event.target);
      // since just one handler for the whole list, must verify they clicked the
      // actual favorite glyph
      if ($heart.hasClass("glyphicon")) {
      // this itemId assignment looks janky but is better performance than doing
      // regex matches on the class names like [class$='container'] or something
        var action   = ($heart.hasClass("is-fav")) ? "DELETE" : "POST",
            dataAttr = "data-" + type + "-id",
            itemId    = $heart.parents("[" + dataAttr + "]").attr(dataAttr);
        Playetry.favoriteControl.railsFav(type + "s", itemId, action,
          Playetry.favoriteControl.toggleHeart.bind($heart));
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
    .done(function() {
      console.log("success");
      callback();
    })
    .fail(function() {
      console.log("error");
    });
  },
  toggleHeart: function() {
    this.toggleClass("is-fav glyphicon-heart glyphicon-heart-empty");
  }
};
