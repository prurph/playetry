Playetry.tagControl = {
  onAutocomplete: function(event, selectionItem) {
    var $tag = Playetry.tagControl.textToTag(selectionItem.item.value),
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
  }
};
