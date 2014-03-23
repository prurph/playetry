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
      var poemCon = Playetry.poemControl;
      poemCon.makePoems(response.poems, $("#poems-list").empty());
      poemCon.adjustText(response.poems.length, [$title, $author, $body]);
    })
    .fail(function() {
      console.log("error");
    });
    return false;
  },

  adjustText: function(numResponses, inputArray) {
    var searchText = numResponses + " results for ";
    $.each(inputArray, function(index, $input) {
      if ($input.val() !== "") {
        searchText += $input.attr("placeholder").toLowerCase() +
          ": \"" + $input.val() + "\", ";
      }
      $input.val("");
    });
    $("#search-by").html(searchText.slice(0,-2));
  },

  makePoems: function(response, $attachNode) {
    $.each(response, function(index, poem) {
      var poemInstance = new Playetry.Poem(poem);
      poemInstance.renderSelf($attachNode);
    });
  },
};
