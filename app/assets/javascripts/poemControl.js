Playetry.poemControl = {
  searchPoems: function(event) {
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
      var poemCon = Playetry.poemControl;
      poemCon.makePoems(response.poems, $("#poems-list").empty());
      poemCon.adjustText(response);
    })
    .fail(function() {
      console.log("error");
    });
    return false;
  },

  poemsByTag: function(event) {
    $.ajax({
      // super hacky: get the tag text and concatenate that in as the param
      url: "/tags/" + this.textContent,
      type: 'GET',
      dataType: 'json',
    })
    .done(function(response) {
      var poemCon = Playetry.poemControl;
      console.log(response);
      poemCon.makePoems(response.poems, $("#poems-list").empty());
      poemCon.adjustText(response);
    })
    .fail(function() {
      console.log("error");
    });
    return false;
  },

  adjustText: function(response) {
    var search = response.search,
        searchText = " results for ";
    if (response.poems.length === 1) {
      searchText = " result for ";
    }
    for (var param in search) {
      searchText += param + ": " + search[param] + ", ";
    }
    $("#search-by").html(searchText.slice(0,-2));
  },

  makePoems: function(response, $attachNode) {
    $.each(response, function(index, poem) {
      var poemInstance = new Playetry.Poem(poem);
      poemInstance.renderSelf($attachNode);
    });
  },
};
