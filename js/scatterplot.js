/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 
d3.csv("data/scatter.csv").then((data) => {

    let maxY = d3.max(data, function(d) { return d.score; });
    let maxX = d3.max(data, function(d) { return d.day; });

    const width = 900; 
    const height = 450; 
    const margin = {left:50, right:50, bottom:50, top:50}; 
    const yTooltipOffset = 15; 

    let yScale = d3.scaleLinear()
        .domain([0,maxY])
        .range([height-margin.bottom,margin.top]); 

    let xScale = d3.scaleLinear()
        .domain([0,maxX])
        .range([margin.left, width - margin.right]);
        // .padding(0.1); 

    const svg3 = d3
        .select("#csv-scatter")
        .append("svg")
        .attr("width", width-margin.left-margin.right)
        .attr("height", height - margin.top - margin.bottom)
        .attr("viewBox", [0, 0, width, height]);

    svg3.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(yScale)) 
        .attr("font-size", '20px'); 
      
    svg3.append("g")
          .attr("transform", `translate(0,${height - margin.bottom})`) 
          .call(d3.axisBottom(xScale))
          .attr("font-size", '20px'); 

    const tooltip1 = d3.select("#csv-scatter") 
          .append("div") 
          .attr('id', "tooltip1") 
          .style("opacity", 0) 
          .attr("class", "tooltip"); 

    const mouseover1 = function(event, d) {
    tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
            .style("opacity", 1);  
    }
    
    const mousemove1 = function(event, d) {
    tooltip1.style("left", (event.x)+"px") 
            .style("top", (event.y + yTooltipOffset) +"px"); 
    }
    
    const mouseleave1 = function(event, d) { 
    tooltip1.style("opacity", 0); 
    }

    svg3.selectAll(".scatter")
        .data(data)
        .enter()
        .append("circle")
            .attr("class", "bar") 
            .attr("cx", (d) => xScale(d.day)) 
            .attr("cy", (d) => yScale(d.score)) 
            .attr("r", 5)
            // .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
            // .attr("width", xScale1.bandwidth())
            .on("mouseover", mouseover1) 
            .on("mousemove", mousemove1)
            .on("mouseleave", mouseleave1);
  
  });




