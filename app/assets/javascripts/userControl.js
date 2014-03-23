Playetry.userControl = {
  renderUser: function() {
    $.ajax({
      url: '/user',
      type: 'GET',
      dataType: 'json',
    })
    .done(function(response) {
      console.log(response);
      Playetry.poemControl.makePoems(response.poems, $("#fav-poems").empty());
      Playetry.audioControl.makePlayers(response.readings,
        $("#fav-readings").empty());
    })
    .fail(function(response) {
      console.log("error");
    });
  }
};
