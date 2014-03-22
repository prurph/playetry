window.Playetry.favoriteControl = {
  onLoad: function() {
    if (Playetry.currentUserId) {
      this.bindHeartClicks($("#reading-list"), "reading");
      this.bindHeartClicks($(".fav-poem"), "poem");
    }
  },
  bindHeartClicks: function($parent, type) {
    $parent.click(function(event) {
      // this itemId assignment looks janky but is better performance than doing
      // regex matches on the class names like [class$='container'] or something
      var $heart   = $(event.target),
          action   = ($heart.hasClass("is-fav")) ? "DELETE" : "POST",
          dataAttr = "data-" + type + "-id",
          itemId    = $heart.parents("[" + dataAttr + "]").attr(dataAttr);
      Playetry.favoriteControl.railsFav(type + "s", itemId, action,
        Playetry.favoriteControl.toggleHeart.bind($heart));
    });
  },
  railsFav: function(favoriteable, id, action, callback) {
    $.ajax({
      url: "../favorites/" + favoriteable + "/" + id,
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
