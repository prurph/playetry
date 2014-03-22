window.Playetry.favoriteControl = {
  onLoad: function() {
    this.poemFavClick();
  },
  poemFavClick: function() {
    var $favPoem = $(".fav-poem");
    $favPoem.click(function(event) {
      var $heart = $(event.target),
          action = ($heart.hasClass("is-fav")) ? "DELETE" : "POST",
          poemId = $heart.parents(".poem-container").attr("data-poem-id");
      // send ajax request with callback as fourth argument
      Playetry.favoriteControl.railsFav("poems", poemId, action,
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
