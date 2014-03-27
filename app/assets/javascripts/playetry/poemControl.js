Playetry.poemControl = {
  searchPoems: function(event) {
    var $title = $("#title-search"),
        $author = $('#author-search'),
        $body   = $('#body-search');
    if ($title.length > 0 || $author.length > 0 || $body > 0) {
      $.ajax({
        url: Routes.poems_path(),
        type: 'GET',
        dataType: 'json',
        data: { fuzzies: { title: $title.val(), author: $author.val(),
          body: $body.val() } }
      })
      .done(function(response) {
        var poemCon = Playetry.poemControl;
        poemCon.makePoems(response.poems, $("#poems-list").empty());
        poemCon.adjustText(response);
        $("input[id$='search']").val("");
      })
      .fail(function() {
        console.log("error");
      });
    }
    return false;
  },

  poemsByTag: function(event) {
    $.ajax({
      // super hacky: get the tag text and concatenate that in as the param
      url: Routes.tag_path(this.textContent),
      type: 'GET',
      dataType: 'json',
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

  adjustText: function(response) {
    var search = response.search,
        resultsText = response.poems.length + " results for ",
        paramText = "",
        $paramSpan;
    if (response.poems.length === 1) {
      resultsText = "1 result for ";
    }
    for (var param in search) {
      paramText += "[" +param + "] " + search[param] + ", ";
    }
    $paramSpan = $("<span/>", { text: paramText.slice(0,-2),
      "class": "search-param" });
    $("#search-by").text(resultsText).append($paramSpan);
  },

  makePoems: function(response, $attachNode) {
    $.each(response, function(index, poem) {
      var poemInstance = new Playetry.Poem(poem);
      poemInstance.renderSelf($attachNode);
    });
  },
};
