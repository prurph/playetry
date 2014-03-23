Playetry.tagControl = {
  onTagGenerated: function(event, ui) {
    var $tag = Playetry.tagControl.textToTag(ui.item.value),
        $tagList = $("#tag-list");
    $("#tag-list").append($tag);
    Playetry.tagControl.adjustIndent($tagList);
    $("#new-tags").css("text-indent", $tagList.position().left +
      $tagList.width() + "px").val("");
    Playetry.tagControl.bindClickX($tag);
    return false;
  },
  textToTag: function(text) {
    var $tagNode = $(HandlebarsTemplates["tag"]({text: text}));
    return $tagNode;
  },
  bindClickX: function($tag) {
    $tag.click(function(event) {
      if ($(event.target).hasClass("tag-x")) {
        this.remove();
        var $tagList = $("#tag-list");
        Playetry.tagControl.adjustIndent($tagList);
      }
    });
  },
  adjustIndent: function($tagList) {
    $("#new-tags").css("text-indent", $tagList.position().left +
      $tagList.width() + "px").val("");
  },
  lookForComma: function(event) {
    // if comma pressed, fake a tag match to effectively create a new tag
    if (event.which === 188 && !(/^,/.test(this.value)) ) {
      var withoutComma = this.value.slice(0,-1),
          dummyUi = {item: {value: withoutComma}};
      Playetry.tagControl.onTagGenerated(event, dummyUi);
    }
  }
};
