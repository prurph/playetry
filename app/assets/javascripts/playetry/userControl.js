Playetry.userControl = {
  renderUser: function() {
    $.ajax({
      url: Routes.user_path(),
      type: 'GET',
      dataType: 'json',
    })
    .done(function(response) {
      console.log(response);
      if (response.poems.length > 0) {
        Playetry.poemControl.makePoems(response.poems, $("#fav-poems").empty());
      } else {
        $("#fav-poems-header").text("no favorite poems");
      }
      if (response.readings.length > 0) {
        Playetry.audioControl.makePlayers(response.readings,
          $("#fav-readings").empty());
      } else {
        $("#fav-readings-header").text("no favorite readings");
      }
      if (response.user_readings.length > 0) {
        Playetry.audioControl.makePlayers(response.user_readings,
          $("#user-readings").empty());
      }else {
        $("#user-readings-header").text("you have no active readings");
      }
    })
    .fail(function(response) {
      console.log("error");
    });
  }
};
