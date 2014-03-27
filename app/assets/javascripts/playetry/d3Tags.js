Playetry.d3Tags = function(selector, svgSize) {
  $.ajax({
    url: Routes.tag_cloud_path(),
    type: 'GET',
    dataType: 'json'
  })
  .done(function(response) {
    Playetry.drawD3(response.tags, selector, svgSize);
  })
  .fail(function(response) {
    console.log("error");
  });
};

Playetry.drawD3 = function(tagData, selector, svgSize) {
  var fill = d3.scale.category20(),
      size = d3.scale.linear()
              .range([svgSize/15 ,svgSize/5])
              .domain(d3.extent(tagData, function(d) { return d.count; }));

  d3.layout.cloud().size([svgSize, svgSize])
    .words(tagData)
    .rotate(function() { return ~~(Math.random()*2) * 90; })
    .font("Lato")
    .fontSize(function(d) { return size(d.count); })
    .on("end", draw)
    .start();

  function draw(words) {
    var a = d3.select(selector).append("svg")
        .attr("width", svgSize)
        .attr("height", svgSize)
      .append("g")
        .attr("transform", "translate(200,200)")
        .attr("transform", "translate(" + svgSize/2.5 + "," + svgSize/2.5 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Oleo Script")
        .style("fill", function(d,i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("class", "tag-link letterpress")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; })
        .on("click", function() {
            if (window.location.pathname !== Routes.poems_path()) {
              window.location.href = Routes.poems_path();
              window.sessionStorage.playetryPoemsByTag = this.textContent;
            } else {
              $(document).ready(Playetry.poemControl.poemsByTag.bind(this));
            }
          });
    d3.select("svg").attr("transform", "translate(200,200");
  }
};
