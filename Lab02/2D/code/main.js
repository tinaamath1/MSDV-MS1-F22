



let data2 = []
url="https://raw.githubusercontent.com/tinaamath1/majorstudio1/main/Lab02/2B/code/ssfgoal14.json"
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        drawWithDataAndScales(data);
        console.log (data)
    })
  
     // Draw with data and use scales to control how the data is interpreted
      function drawWithDataAndScales(data) {
       // define dimensions and margins for the graphic
      const margin = ({top: 100, right: 100, bottom: 100, left: 100})
      const width = 4500;
      const height = 50;
      
       // now we introduce our scales. 
       // the first, x, is about the amount of items we have
       let xLoc = d3.scaleLinear()
       .domain([0, data.length-1])
       .range(margin.left, width-margin.right)
    //    console.log([margin.left, width-margin.right])
  
       // The second, radius, is about the values we are getting in
       const radius = d3.scaleLinear()
       .domain([0, d3.max(data, d => d.year3)])
       .range([0, (height-margin.bottom-margin.top)/2 ])
        // console.log(radius)
    //  select svg
     const svg = d3.select("#dots"); 
      svg
       .selectAll("circle") 
       .data(data) 
       .join("circle")
       .attr('fill', "lightblue")
       .style("fill", function(d) {
        if (d.year3 == "N" || d.year3 == "NaN" || d.year3 == "") {return "gray"}
        else 	{ return "lightblue" }
        ;})
       .attr('cy', height/2)
       //.attr('cx', width/2) //function(d, i) {(i + 20);})
    //    .attr('r', function(d) { return radius(d) });
       //.attr('r', 20)
       .attr('r', function(d) {
        if (d.year3 == "N" || d.year3 == "NaN" || d.year3 == "") {return "1"}
            else 	{ return (d.year3) }
       ;})//, function(d) { return (d.year3)})

       .attr('cx', function(d, i) {return (i/data.length)*width;})
       
       .append("svg:title")
       .text(function(d) { return d.countries; });;

    // sine curve 

//     var width = 600,
//   height = 300,
//   margin = 50;

// var svg = d3.select('#graph')
//   .append('svg')
//   .style({
//     'width': width + 2 * margin,
//     'height': height + 2 * margin
//   });

// var g = svg.append('g')
//   .attr('transform', 'translate(' + margin + ', ' + margin + ')');

// var sine = d3.range(0, 10).map(function(k) {
//   var value = [0.5 * k * Math.PI, Math.sin(0.5 * k * Math.PI)];
//   return value;
// });

// var xScale = d3.scale.linear()
//   .range([0, width - margin])
//   .domain(d3.extent(sine, function(d) {
//     return d[0];
//   }));

// var yScale = d3.scale.linear()
//   .range([height - margin, 0])
//   .domain([-1, 1]);

// var xAxis = d3.svg.axis()
//   .scale(xScale)
//   .orient('bottom');

// var yAxis = d3.svg.axis()
//   .scale(yScale)
//   .orient('left');

// var line = d3.svg.line()
//   .x(function(d) {
//     return xScale(d[0]);
//   })
//   .y(function(d) {
//     return yScale(d[1]);
//   });

// g.append('path')
//   .datum(sine)
//   .attr('d', line.interpolate('basis'))
//   .attr({
//     'stroke': 'black',
//     'stroke-width': 1,
//     fill: 'none'
//   });

// g.append('g')
//   .classed('axis', true)
//   .attr('transform', 'translate(0, ' + (height - margin) + ')')
//   .call(xAxis);

// g.append('g')
//   .classed('axis', true)
//   .call(yAxis);
  
     
    }