Playetry.tagControl = {
  onTagGenerated: function(event, ui) {
    var $tag = Playetry.tagControl.textToTag(ui.item.value),
        $tagList = $("#tag-list");
    $("#tag-list").append($tag);
    Playetry.tagControl.adjustIndent($tagList);
    $("#new-tags").val("").attr("placeholder", "");
    Playetry.tagControl.bindClickX($tag);
    Playetry.tagControl.fillHidden(ui.item.value);
    // this return false is critical
    return false;
  },
  textToTag: function(text) {
    var $tagNode = $(HandlebarsTemplates["tag"]({name: text}));
    return $tagNode;
  },
  bindClickX: function($tag) {
    $tag.click(function(event) {
      if ($(event.target).hasClass("tag-x")) {
        this.remove();
        var $tagList = $("#tag-list");
        Playetry.tagControl.adjustIndent($tagList);
        if ($(".tag-x").length === 0) {
          $("#new-tags").attr("placeholder", "enter tags (comma-separated)");
        }
      }
    });
  },
  adjustIndent: function($tagList) {
    var indent = $tagList.position().left + $tagList.width();
    $("#new-tags").css("text-indent", indent - 9 + "px").val("");
    // move the autocomplete with the tags
    $(".ui-autocomplete").css("padding-left", indent - 9 + "px").hide();
  },
  lookForComma: function(event) {
    // if comma pressed, fake a tag match to effectively create a new tag
    if (event.which === 188 && !(/^,/.test(this.value)) ) {
      var withoutComma = this.value.slice(0,-1),
          dummyUi = {item: {value: withoutComma}};
      Playetry.tagControl.onTagGenerated(event, dummyUi);
    }
    return false;
  },
  fillHidden: function(event) {
    var $tags = $(".mini-tag p"),
        $processedList,
        $tagInput = $("#new-tags");
    $processedList = $tags.map(function(index, tagDOM) {
      return this.innerText;
    });
    // in case user hit submit with an active tag still in the input, make sure
    // it gets stored too.
    if ($tagInput.val().length >= 2) {
      $processedList.push($tagInput.val());
    }
    // adjust the hidden form with the list of tag1,tag2,tag3
    $("#finished-tags").val($processedList.get().join(","));
    // and submit it to Rails to create the poem
    return true;
  }
};
