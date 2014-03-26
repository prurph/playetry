Handlebars.registerHelper("playerGlyph", function(){
  var glyphClass = "";
  if (this.is_users) {
    glyphClass = "glyphicon-remove is-users";
    return new Handlebars.SafeString(
      "<span class='glyphicon glyphicon-remove is-users'></span>"
    );
  } else if (this.user_fav) {
    glyphClass = "glyphicon-heart-empty is-fav";
    return new Handlebars.SafeString(
      "<span class='glyphicon glyphicon-heart-empty is-fav'></span>"
    );
  }

  return new Handlebars.SafeString(
    "<span class='glyphicon " + glyphClass + "'></span>"
  );
});
