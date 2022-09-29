const width = window.innerWidth;
const height = window.innerHeight;

let map = d3
  .select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const projection = d3
  .geoMercator()
  .scale(500)
  .translate([width / 2, height / 2]);
const path = d3.geoPath().projection(projection);

// Chnage the parameter and color
function polygonColor(d) {
  return d > 1000 
    : "red"
    : d > 750
    : "orange"
    : d > 500
    : "yellow"
    : d > 250
    : "purple"
    : d > 100
    : "green"
    : d > 50
    : "blue"
    : d <= 0;

}

const world = d3.json("https://raw.githubusercontent.com/tinaamath1/majorstudio1d/main/mm.geojson").then((data) => {
  console.log(data);

  map
    .selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("opacity", 0.8)
    .attr("stroke", "white")
    .attr('fill', d => polygonColor(d."value"))



});
