d3.text("ReducedGHMining_trans.csv", function(datasetText) {

var parsedCSV = d3.csv.parseRows(datasetText);

// parse out x and y axis labels
var xlab = parsedCSV[0].slice(1,parsedCSV[0].length);
var ylab = [];
for(var i = 1; i < parsedCSV.length; i++){
    var temp = parsedCSV[i];
    ylab = ylab.concat(temp[0]);
}
// parse out the datamatrix
var data_matrix = [];
for(var i = 1; i < parsedCSV.length; i++){
    var temp = parsedCSV[i].slice(1,parsedCSV[i].length );
    data_matrix = data_matrix.concat([temp]);
}

// find marginal sums
var sum_rows = []; // sum of the rows
for(var i = 0; i < data_matrix.length; i++){
    var temp_sum = 0;
    for(var j = 0; j < data_matrix[i].length; j++){
        temp_sum = parseFloat(temp_sum) + parseFloat(data_matrix[i][j]);
    }
    sum_rows = sum_rows.concat([temp_sum]);
}

var sum_col = []; // sum of the columns
for(var i = 0; i < data_matrix[0].length; i++){
    var temp_sum = 0;
    for(var j = 0; j < data_matrix.length; j++){
        temp_sum = parseFloat(temp_sum) + parseFloat(data_matrix[j][i]);
    }
    sum_col = sum_col.concat([temp_sum]);
}                    

function colorPicker(d) {
	if( d <= 0 ){
		return "rgb(255, 247, 251)"; // 0
	} else if (d > 0 && d<= 2){
		return "rgb(236, 226, 240)"; // 1
	} else if (d > 2 && d<= 4) {
		return "rgb(208, 209, 230)"; // 2
	} else if (d > 4 && d<= 6) {
		return "rgb(166, 189, 219)"; // 3
	} else if (d > 6 && d<= 8){
		return "rgb(103, 169, 207)"; // 4
	} else if (d > 8 && d<= 10){
		return "rgb(54, 144, 192)"; // 5
	} else if (d > 10 && d<= 12){
		return "rgb(2, 129, 138)"; // 6
	} else if (d > 12 && d<= 14) {
		return "rgb(1, 108, 89)"; // 7
	} else if (d > 14){
		return "rgb(1, 70, 54)"; // 7+
	} else {
		return "pink"; // number not in range
	}
}


var margin = {top: 160, right: 160, bottom: 80, left: 160},
    width = data_matrix[1].length*12;
    height = data_matrix.length*12;                    
    
var svg = d3.select("#table").append("svg");
    svg.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("border-collapse", "collapse")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .selectAll("g")
    .data(data_matrix)
    .enter()
    .append("g")
    .attr("class", "row")
    .attr("transform", function(d, i){ return "translate(0," + (i*12) + ")"; })
    
    .selectAll("rect")
    .data(function(d){return d;})
    .enter().append("rect")
    .attr("width", "10px")
    .attr("height", "10px")
    .attr("fill", function(d) {
        return colorPicker(d);
    })
    .attr("x", function(d,i) {
        return (i * 12);
    })
    .on("mouseover", function(){d3.select(this).attr("fill", "#F77E1C")})
    .on("mouseout", function(){d3.select(this).attr("fill", function(d) {
        return colorPicker(d);
    })})
    .on("mousedown", function(){d3.select(this).attr("fill", "red")})
    .on("mouseup", function(){d3.select(this).attr("fill", "#F77E1C")})
    //.attr("onclick", "javascript:showBlast('MMGA_0001')");                        
    .attr("onclick", function(d,i,j) {
        var temp1 = xlab[i];
        var temp2 = ylab[j];
        return "javascript: showBlast('" + temp1 +"', " + "'" + temp2 + "')";
    })
    .attr("alt", function(d) {
        return d;
    })
    // axis
    var xScale = d3.scale.ordinal()
                          .domain(xlab)
                          .rangePoints([0+5, width-5]);
    var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient("left")
                        
    var yScale = d3.scale.ordinal()
                         .domain(ylab)
                         .rangePoints([0+4, height-4]);
    var yAxis = d3.svg.axis()
                       .scale(yScale)
                       .orient("left")                    
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+ margin.left + "," + (margin.top + height) + ") rotate(270)")
        .call(xAxis);
        
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+ (margin.left -2) + "," + margin.top + ") rotate(0)")
        .call(yAxis);

    // 
    
    var col_hist_size = 0.5* margin.top;

    var col_hist_scale = d3.scale.linear()
                         .domain([0, d3.max(sum_col)])
                         .range([0, col_hist_size]);
        
    svg.append("g")
       //.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
       .attr("transform", "translate(" + margin.left + ",0)")
       .selectAll("rect")
       .data(sum_col)
       .enter()
       .append("rect")
       .attr("x", function(d, i) {
           return i * 12;  //Bar width of 12 plus 1 for padding
       })
       .attr("y", function(d) {
              return margin.top - col_hist_scale(d) - 5; // spacing of 5
        })
       .attr("width", 10)
       .attr("fill","teal")
       .attr("height", function(d) {
           return col_hist_scale(d);
       });


       svg.append("g")
          .attr("transform", "translate(" + margin.left + ",0)")
          .selectAll("text")
          .data(sum_col)
          .enter()
          .append("text")
          .text(function(d) {
                  return d;
             })
         .attr("x", function(d, i) {
              return i * 12 + 2 + 3;
         })
         .attr("y", function(d) {
              return margin.top - col_hist_scale(d) - 5 - 3;
         })
         .attr("font-family", "sans-serif")
         .attr("font-size", "8px")
         .attr("fill", "black")
         .attr("text-anchor", "middle");
         
     svg.append("g").append("line")
        .attr("x1", margin.left).attr("x2", width + margin.right - 2).attr("y1", margin.top - 3).attr("y2", margin.top - 3).attr("stroke","black");
        
        
        // row histogram
        
        var row_hist_size = 0.8* margin.right;

        var row_hist_scale = d3.scale.linear()
                             .domain([0, d3.max(sum_rows)])
                             .range([0, row_hist_size]);
        
        
        svg.append("g")
        .attr("transform", "translate(" + (width + margin.right) + "," + margin.top + ")")
        .selectAll("rect")
        .data(sum_rows)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return 0; // spacing of 5
        })
        .attr("y", function(d, i) {
            return i * 12;  //Bar width of 12 plus 1 for padding
              
        })
        .attr("width",  function(d) {
               return row_hist_scale(d);
        })
        .attr("fill","rgb(54, 144, 192)")
        .attr("height", 10);
        
        svg.append("g")
           .attr("transform", "translate(" + (width + margin.right) + "," + margin.top + ")")
           .selectAll("text")
           .data(sum_rows)
           .enter()
           .append("text")
           .text(function(d) {
                   return d;
              })
          .attr("x", function(d, i) {
              return row_hist_scale(d) + 5;

          })
          .attr("y", function(d, i) {
               return i * 12 + 8;
          })
          .attr("font-family", "sans-serif")
          .attr("font-size", "8px")
          .attr("fill", "black");
    
    var legend = [0, 2, 4, 6, 8, 10, 12, 14, 16];
    
    svg.append("g")
       .attr("transform", "translate(20,60)")
       .selectAll("rect")
       .data(legend)
       .enter()
       .append("rect")
       .attr("x", function(d, i) {
           return i * 12;  //Bar width of 12 plus 1 for padding
       })
       .attr("y", function(d) {
           return 20;
       })
      .attr("width", 10)
      .attr("fill",function(d){
          return colorPicker(d);
      })
      .attr("height", 10);
      
      svg.append("g")
         .attr("transform", "translate(20,60)")
         .selectAll("text")
            .data(legend)
            .enter()
            .append("text")
            .text(function(d) {
                    return d;
               })
           .attr("x", function(d, i) {
               return i * 12 + 5;

           })
           .attr("y", function(d, i) {
                return 40;
           })
           .attr("font-family", "sans-serif")
           .attr("font-size", "8px")
           .attr("fill", "black")
           .attr("text-anchor", "middle");      
           
       svg.append("text").attr("transform", "translate(20,65)")
       .text("Legend:")
       .attr("font-family", "sans-serif")
       .attr("font-size", "12px");                                       
                 
});
