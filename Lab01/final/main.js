// set the dimensions and margins of the graph
// var margin = {top: 100, right: 10, bottom: 40, left: 100},
//         width = 1000 ,
//         height = 400 ;

const width = window.innerWidth;
const height = window.innerHeight;

// The svg
var svg = d3.select("svg")
    .attr("width", width) //+ margin.left + margin.right)
    .attr("height", height) //+ margin.top + margin.bottom)
    .append("g")
    //.attr("transform",
    // "translate(" + margin.left + "," + margin.top + ")");
  
// create a tooltip
    var tooltip = d3.select("#tooltip")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position", "absolute")
 

// Map and projection
// var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(100)
//.center([0,20])
  .translate([width / 2, height / 2]);

// Data and color scale
var data = d3.map();

// var domain = [0, 2500]
var labels = ["0-10", "11-25", "26-50", "51-100","101-250", "251-500", "501-1001","1001-2500"]
// var range = ["#F8CAEE","#BF76AF","#852170", "red","black", "orange", "green", "yellow"]
var colorScale = d3.scaleQuantize()
  .domain([0,2500])
  .range(d3.schemeReds[8]);


var promises = []
promises.push(d3.json("https://raw.githubusercontent.com/tinaamath1/majorstudio1/main/Lab01/1D/finaldata/mm.geojson"))
promises.push(d3.csv("https://raw.githubusercontent.com/tinaamath1/majorstudio1/main/Lab01/final/mm.csv", function(d) { data.set(d.GeoAreaName , +d["2017"]); }))

myDataPromises = Promise.all(promises).then(function(topo) {


	
	
	let mouseOver = function(d) {
    	d3.selectAll(".topo")
    		
      		.transition()
      		.duration(200)
      		.style("opacity", 1)
      		
      	// var ratio = data.get(d.properties["ADMIN"]) || 0;
      	// var min_ratio = 0
      	// var max_ratio = domain[0]
      	// for(var i = 0; i < domain.length; i++){
      	// 	if (ratio >= min_ratio && ratio <= max_ratio)
      	// 		break;
      	// 	min_ratio = domain[i]
      	// 	if (i < domain.length-1)
      	// 		max_ratio = domain[i+1]
      	// 	else
      	// 		max_ratio = 2500
      	// }
      	
    	d3.select(this)
    		// .filter(function(d){d.total = data.get(d.properties["ADMIN"]) || 0; return d.total <= max_ratio && d.total >= min_ratio})
    		.transition()
      		.duration(100)
      		.style("opacity", 1)
      		.style("stroke", "black")
      
      	d.total = data.get(d.properties["ADMIN"]) || 0;
      	
      	tooltip
          	.style("opacity", 0.8)
          	.html(d.properties["ADMIN"] + ": " + d3.format(",.2r")(d.total))
          	.style("left", (d3.event.pageX) + "px")		
          	.style("top", (d3.event.pageY - 28) + "px");
          	
        d3.select("#annotation")
    	.style("opacity", 0) 	
        

  }

  let mouseLeave = function(d) {
    d3.selectAll(".topo")
      .transition()
      .duration(200)
      .style("opacity", .7)
      
    d3.selectAll(".topo")
      .transition()
      .duration(200)
      .style("stroke", "transparent")
      
    d3.select("#annotation")
    	.style("opacity", 1)
      
    tooltip
          .style("opacity", 0)
  }

	var topo = topo[0]

  	// Draw the map
  	svg.append("g")
    	.selectAll("path")
    	
    	.data(topo.features)
    	.enter()
    	.append("path")
    	.attr("class", "topo")
      	
        // draw each country
      	.attr("d", d3.geoPath()
        	.projection(projection)
      	)
      	
        // set the color of each country
      	.attr("fill", function (d) {
        	d.total = data.get(d.properties["ADMIN"]) || 0;
        	return colorScale(d.total);
      	})
      	.style("opacity", 1)
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )
      
      
    // legend
    var legend_x = width - margin.left
    var legend_y = height - 30
    svg.append("g")
  		.attr("class", "legendQuant")
  		.attr("transform", "translate(" + legend_x + "," + legend_y+")");

	var legend = d3.legendColor()
    	.labels(labels)
    	.title("Maternal Mortality Ratio")
    	.scale(colorScale)
    
    
     svg.select(".legendQuant")
  		.call(legend);
  
  
  // Features of the annotation
	const annotations = [
    {
    note: {
      label: "despite its great territorial extension Australia has only 20 million inhabitants.",
      title: "Australia Population",
      wrap: 150,  // try something smaller to see text split in several lines
      padding: 10   // More = text lower
      
    },
    color: ["#852170"],
    x: projection([150.916672,-31.083332])[0],
    y: projection([150.916672,-31.083332])[1],
    dy: -30,
    dx: 10
  }
]



// Add annotation to the chart
const makeAnnotations = d3.annotation()
  .annotations(annotations)

  svg.append("g")
  .style("opacity", 1)
  .attr("id", "annotation")
  .call(makeAnnotations)

    })
    
