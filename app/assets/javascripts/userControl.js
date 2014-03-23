Playetry.userControl = {
  renderUser: function() {
    $.ajax({
      url: '/user',
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
    })
    .fail(function(response) {
      console.log("error");
    });
  }
};
