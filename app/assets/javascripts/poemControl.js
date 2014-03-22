Playetry.poemControl = {
  searchPoems: function(event) {
    event.preventDefault();
    var $title = $("#title-search"),
        $author = $('#author-search'),
        $body   = $('#body-search');
    $.ajax({
      url: '/poems',
      type: 'GET',
      dataType: 'json',
      data: { fuzzies: { title: $title.val(), author: $author.val(),
                         body: $body.val() }
            }
    })
    .done(function(response) {
      console.log(response);
      Playetry.poemControl.makePoems(response.poems);
      $("#search-by").text(
        "searched: " + $title.val() + " " + $author.val() + " " + $body.val()
        );
    })
    .fail(function() {
      console.log("error");
    });

  },
  poemControl: function(response) {
    $.each(response, function(index, poem) {
      var poemInstance = new Playetry.Poem(poem);
      poemInstance.renderSelf($("#poems-list"));
    });
  }
};
