Playetry.d3Tags = function() {
  var fill = d3.scale.category20(),
      tagData;

  $.ajax({
    url: '/tag_cloud',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(response) {
    Playetry.drawD3(response.tags);
  })
  .fail(function(response) {
    console.log("error");
  });
};

Playetry.drawD3 = function(tagData) {
  var fill = d3.scale.category20(),
      size = d3.scale.linear()
              .range([32,72])
              .domain(d3.extent(tagData, function(d) { return d.count; }));

  d3.layout.cloud().size([400, 400])
    .words(tagData)
    .rotate(function() { return ~~(Math.random()*5) * 90; })
    .font("Lato")
    .fontSize(function(d) { return size(d.count); })
    .on("end", draw)
    .start();

  function draw(words) {
    console.log(words);
    var a = d3.select("#tags-list").append("svg")
        .attr("width", 400)
        .attr("height", 400)
      .append("g")
        .attr("transform", "translate(200,200)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Lato")
        .style("fill", function(d,i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("class", "tag-link")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; })
        .on("click", Playetry.poemControl.poemsByTag);
    d3.select("svg").attr("transform", "translate(200,200");
  }
};
