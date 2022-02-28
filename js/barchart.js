/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do? 
// creates an svg for the bar chart and sets the width and heigh of the chart
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// TODO: What does this code do? 
// it finds the max score to figure out how tall the chart should be to ensure all the data points appear
let maxY1 = d3.max(data1, function(d) { return d.score; });

// TODO: What does each line of this code do?   
// maps the data values (domain for the scale function) to pixel values (range for the scale function) 
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// TODO: What does each line of this code do? 
// it scales the data to fit into bars, by mapping the data to the pixels and adding padding in between the bars
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// TODO: What does each line of this code do?  
// adds the y axis to the svg
svg1.append("g")
  // moves the axis to the left of the chart
  .attr("transform", `translate(${margin.left}, 0)`) 
  // gives the axis a scale function
  .call(d3.axisLeft(yScale1)) 
  // sets a font size
  .attr("font-size", '20px'); 

// TODO: What does each line of this code do? 
// adds the x axis to the svg
svg1.append("g")
    // moves the axis to the bottom of the chart
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            // at each tick, show the data row's name 
            .tickFormat(i => data1[i].name))  
    // adds a font size
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? 
// selecting something that's not there
const tooltip1 = d3.select("#hard-coded-bar") 
                // for every placeholder created, append a div
                .append("div") 
                // set tooltip1 to be the id
                .attr('id', "tooltip1") 
                // set the opactity to be 0
                .style("opacity", 0) 
                // set the class to be tooltip
                .attr("class", "tooltip"); 

// TODO: What does each line of this code do?  
// initializes a function for mousing over
const mouseover1 = function(event, d) {
  // adds the html of the tooltip to show the score
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          // styles the opacity
          .style("opacity", 1);  
}

// TODO: What does each line of this code do? 
// initializes a function for moving the mouse
const mousemove1 = function(event, d) {
  // continues to move the tool tip even while the mouse moves
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
const mouseleave1 = function(event, d) { 
  // removes the tool tipe when the mouse doesn't hover over the bar
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? 
// select anything in svg1 with the class "bar" --> empty selection
svg1.selectAll(".bar") 
    // links it with the data from data1
   .data(data1) 
   // creates placeholders
   .enter()  
   // appends a rect for every placeholder created
   .append("rect") 
     .attr("class", "bar") 
     // sets the x position for the rectangles
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     // add the height and width attributes for the bars
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     // links the event listeners from the tooltips
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);

const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

svg2.append("g")
  .attr("transform", `translate(${margin.left}, 0)`) 
  .call(d3.axisLeft(yScale1)) 
  .attr("font-size", '20px'); 

svg2.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

// rerouting the data to come from a csv
d3.csv("data/barchart.csv").then((data) => {

  svg2.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
      .attr("class", "bar") 
      .attr("x", (d,i) => xScale1(i)) 
      .attr("y", (d) => yScale1(d.score)) 
      .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
      .attr("width", xScale1.bandwidth())
      .on("mouseover", mouseover1) 
      .on("mousemove", mousemove1)
      .on("mouseleave", mouseleave1);

});








