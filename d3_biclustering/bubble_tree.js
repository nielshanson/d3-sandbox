
var width = 1280;
var height = 800;

var m = {east:20, north:120, west:20, south:120},
    fig_width = width - m.north - m.south,
    fig_height = height - m.east - m.west,
    i = 0,
    root;
	var xroot;
	var yroot;

	var x_tree_w = 200;
	var y_tree_h = 200;
	var x_tree_h = fig_height - y_tree_h;
	var y_tree_w = fig_width - x_tree_w;

// var tree = d3.layout.cluster()
//                     .size([h, w])
// 	                .separation(function separation(a, b) {
//   					  	return a.parent == b.parent ? 1 : 1;
// 					});

console.log(x_tree_h);
console.log(x_tree_w);

var xtree = d3.layout.cluster()
                    .size([x_tree_h, x_tree_w])
	                .separation(function separation(a, b) {
  					  	return a.parent == b.parent ? 1 : 2;
					});
var ytree = d3.layout.cluster()
                    .size([y_tree_w, y_tree_h])
	                .separation(function separation(a, b) {
  					  	return a.parent == b.parent ? 1 : 2;
					});

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });
var xdiagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });
var ydiagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var vis = d3.select("#figure").append("svg:svg")
    .attr("width", width)
    .attr("height", height);

var xtree_vis = vis.append("svg:g")
                   .attr("transform", "translate(" + m.east + "," + m.south  + ")");

var ytree_vis = vis.append("svg:g")
                   .attr("transform", "translate(" + 400 + "," + m.south + ")");

// // bubble plot variables
// var plot_offset = 300;
// var radius = null;
// var samples = 4;
// var sample_names = [];
// var trans = 0.5;
// var colors = ["red", "blue", "green", "orange", "purple" ];
// var named_colors = {"Bt":"red", "C-Surface": "blue", "N-surface":"green", "Mid": "Yellow"}
	
// // pie stuff
// var arc = d3.svg.arc()
//  .outerRadius(radius * 0.8)
//  .innerRadius(radius * 0.4);
// 
// var outerArc = d3.svg.arc()
//  .innerRadius(radius * 0.9)
//  .outerRadius(radius * 0.9);
// 
// var pie = d3.layout.pie()
// 	.sort(null)
// 	.value(function(d) {
// 		return d.value;
// 	});

// var key = function(d){ return d.data.label; };

// quick crawl of tree to load sample_names
// variable
// unction initializeSampleNames(d){
// 	if(d.values) {
// 		if (sample_names.length == 0) {
// 			for (var sample_name in d.values) {
// 					sample_names.push(sample_name);
// 			}
// 		}
// 	}
// 	if (d.children) {
// 		for (var i=0; i < d.children.length; i++) {
// 			initializeSampleNames(d.children[i]);
// 		}
// 	} else if (d._children) {
// 		for (var i=0; i < d._children.length; i++) {
// 			initializeSampleNames(d._children[i]);
// 		}
// 	}
// }

// set full node status of all nodes
function toggleAll(d) {
	// console.log("In toggleAll");
  if (d.children) {
    d.children.forEach(toggleAll);
    toggle(d);
  }
}

d3.json("data/WL_ISA_Bubble_Chart-1-1.json", function(json) {
  xroot = json;
  xroot.x0 = 0;
  xroot.y0 = height / 2;
  
  yroot = json;
  yroot.x0 = height / 2;
  yroot.y0 = 0;
  
  
  // initialize trees
  xroot.children.forEach(toggleAll);
  yroot.children.forEach(toggleAll);
  //toggle(xroot);
  //
  
  // sets leaf status of all nodes to false
  // initializeLeaves(root);
  // root._leaf = true;
  updatex(xroot);
  updatey(yroot);
  //updatey(yroot, ytree);
  //update(yroot);
  
  // Initialize the display to show a few nodes.
  
  // initializeSampleNames(root);
  
  // Set max bubble size to max samples
  // max_size = 0
  // for(var i=0; i < sample_names.length; i++){
  // 	  var sample_sum = sumCountsBySample2(root, sample_names[i]);
  // 	  if (sample_sum > max_size) {
  // 	      max_size = sample_sum;
  // 	  }
  // }
  
  // radius = d3.scale.sqrt()
//                    .domain([0, max_size])
//                    .range([0, 30]);
				   
  // var legend = vis.append("g")
  //                 .attr("class", "legend")
  //                 .attr("transform", "translate(" + (0) + "," + (50) + ")")
  //                 .selectAll("g")
  //                 .data([Math.round(max_size), Math.round(max_size/2), Math.round(max_size/4)])
  //                 .enter().append("g");

 // legend.append("circle")
//      .attr("cy", function(d) { return -radius(d); })
//      .attr("r", radius);
//
//  legend.append("text")
//      .attr("y", function(d) { return -2 * radius(d); })
//      .attr("dy", "1.2em")
//      .text(d3.format(".1s"));
  
  // var color_legend = vis.append("g")
// 	                    .attr("class", "legend")
// 	                    .attr("transform", "translate(" + (0) + "," + (70) + ")")
// 	                    .selectAll("g")
// 	                    .data(sample_names)
// 	                    .enter().append("g");
  
  // color_legend.append("circle")
 // 			      .attr("cy", function(d,i) { return i*20; })
 //                  .attr("r", 8)
 // 				  .style("fill", function(d,i) {
 // 							return colors[i];
 // 						 })
 // 				  .attr("opacity", trans);
 //  color_legend.append("text")
 //        .attr("y", function(d,i) { return i*20; })
 // 		.attr("dy", 4)
 // 		.attr("x", 40)
 //        .text(function(d,i) {
 //        	return d
 //        });
 // 
  
  // alert(sample_names);
  // alert(sumCounts(root));
  // alert(sumCountsBySample(root, 1));
  // alert(sumCountsBySample(root, 2));
  // alert(sumCountsBySample(root, 3));
  // set_children_leaves(root);
  
  //console.log(root);
  //toggle(root.children[1]);
  //toggle(root.children[1].children[2]);
  //toggle_leaf(root.children[1].children[2]);
  //toggle(root.children[9]);
  //toggle(root.children[9].children[0]);
  //toggle_leaf(root.children[9].children[0]);
 
  
  // debug: print leaf nodes
  // children_list = root.children;
  // for (i = 0; i < children_list.length; i++) {
  // 	  	alert(children_list[i]._leaf);
  // }
  
});

function getChildrenNames(parent) {
	children = parent.children;
	for (i = 0; i < children.length; i++) { 
	    // alert(children[i]["size"]);
	}
}

function updatex(source) {
    var duration = d3.event && d3.event.altKey ? 5000 : 500;
    //console.log(source)
    // Compute the new tree layout.
    var xnodes = xtree.nodes(xroot).reverse();
    //console.log(xnodes)
    // Normalize for fixed-depth.
    // nodes.forEach(function(d) { d.y = d.depth * 180; });

    // Update the nodes…
    var xnode = xtree_vis.selectAll("g.xnode")
        .data(xnodes, function(d) {
            var res = d.id || (d.id = ++i);
            return d.id || (d.id = ++i); 
        });

    // Enter any new nodes at the parent's previous position.
    var xnodeEnter = xnode.enter().append("svg:g")
        .attr("class", "xnode")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click", function(d) { toggle(d); updatex(d); });

    xnodeEnter.append("svg:circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    xnodeEnter.append("svg:text")
        .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var xnodeUpdate = xnode.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    xnodeUpdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    xnodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var xnodeExit = xnode.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

    xnodeExit.select("circle")
        .attr("r", 1e-6);

    xnodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links…
    var xlink = xtree_vis.selectAll("path.link")
        .data(xtree.links(xnodes), function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    xlink.enter().insert("svg:path", "g")
        .attr("class", "xlink")
        .attr("d", function(d) {
          var o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        })
      .transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition links to their new position.
    xlink.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    xlink.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        })
        .remove();

    // Stash the old positions for transition.
    xnodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
}

function transpose_node_coord(ynodes) {
    for(var i=0; i < ynodes.length; i++) {
        var temp = ynodes[i].x;
        ynodes[i].x = ynodes[i].y;
        ynodes[i].y = temp;
    }
    return(ynodes);
}


function updatey(source) {
    var duration = d3.event && d3.event.altKey ? 5000 : 500;

    // Compute the new tree layout.
    console.log(source);
    var ynodes = ytree.nodes(yroot).reverse();
    transpose_node_coord(ynodes);
    // Normalize for fixed-depth.
    //ynodes.forEach(function(d) { d.y = d.depth * 180; });

    // Update the nodes…
    var ynode = ytree_vis.selectAll("g.ynode")
        .data(ynodes, function(d) { return d.id || (d.id = ++i); });
    
    // Enter any new nodes at the parent's previous position.
    var ynodeEnter = ynode.enter().append("svg:g")
        .attr("class", "ynode")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click", function(d) { toggle(d); updatey(d); });

    ynodeEnter.append("svg:circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    ynodeEnter.append("svg:text")
        .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var ynodeUpdate = ynode.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    ynodeUpdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    ynodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var ynodeExit = ynode.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
        .remove();

    ynodeExit.select("circle")
        .attr("r", 1e-6);

    ynodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links…
    var ylink = ytree_vis.selectAll("path.ylink")
        .data(ytree.links(ynodes), function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    ylink.enter().insert("svg:path", "g")
        .attr("class", "ylink")
        .attr("d", function(d) {
          var o = {x: source.x0, y: source.y0};
          console.log(diagonal({source: o, target: o}));
          return diagonal({source: o, target: o});
        })
      .transition()
        .duration(duration)
        .attr("d", ydiagonal);

    // Transition links to their new position.
    ylink.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    ylink.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {x: source.x, y: source.y};
          console.log(diagonal({source: o, target: o}));
          return diagonal({source: o, target: o});
        })
        .remove();

    // Stash the old positions for transition.
    ynodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
}


// Toggle children.
function toggle(d) {
  if (d.children) {
	// hide children
    d._children = d.children;
    d.children = null;
  } else {
	// show children
    d.children = d._children;
    d._children = null;
  }
}

// Update leaf status of children on click
function set_children_leaves(d) {
    // update leaf status
	if (d.children) {
		children = d.children;
	} else if (d._children) {
		children = d._children;
	}
    
    for (i = 0; i < children.length; i++) { 
	    // alert("leaf " + children[i]["name"]);
	    children[i]._leaf = true;
    }
}

function update_leaf(d) {
    if (d._leaf) {
	  // if currently a leaf, expand and make children leaves
	  d._leaf = false;
	  
	  if(d.children) {
		  d.children.forEach(function(d){ d._leaf = true;});
	  } else if (d._children){
		  d._children.forEach(function(d){ d._leaf = true;});
	  }
    } else {
      // if not a leaf, collapsing up traverse all setting leaves to false
	  d._leaf = true;	
	  if(d.children) {
	  	d.children.forEach(initializeLeaves);
	  } else if (d._children){
	  	d._children.forEach(initializeLeaves);
	  }
    }
}

// sets current leaf and all children nodes to false
function initializeLeaves(d) {
  d._leaf = false;
  if (d.children) {
	  d.children.forEach(initializeLeaves);
  } else if (d._children) {
  	  d._children.forEach(initializeLeaves);
  }
}

// sums all values below
// function sumCounts(d) {
// 	if (d.children) {
// 		values = d.children.map(sumCounts);
// 		sum = 0;
// 		for (itr = 0; itr < values.length; itr++) {
// 			sum += values[itr];
// 		}
// 		if(d.values) {
// 			counts = d.values.map(parseFloat);
// 			for (itr = 0; itr < counts.length; itr++) {
// 				sum += counts[itr];
// 			}
// 		}
// 		return(sum);
// 	} else if (d._children) {
// 		values = d._children.map(sumCounts);
// 		sum = 0;
// 		for (itr = 0; itr < values.length; itr++) {
// 			sum += values[itr];
// 		}
// 		if(d.values) {
// 			counts = d.values.map(parseFloat);
// 			for (itr = 0; itr < counts.length; itr++) {
// 				sum += counts[itr];
// 			}
// 		}
// 		return(sum);
// 	} else {
// 		if(d.values) {
// 			counts = d.values.map(parseFloat);
// 			sum = 0;
// 			for (itr = 0; itr < counts.length; itr++) {
// 				sum += counts[itr];
// 			}
// 			return(sum);
// 		}
// 	}
//
// }

function sumCountsBySample2(d, sample){
    //console.log(d);
	if (d.children) {
		var sum = 0;
		for (var i=0; i < d.children.length; i++) {
			var value = sumCountsBySample2(d.children[i], sample);
			sum += value;
		}
		if(d.values) {
			var value = parseFloat(d.values[sample]);
			sum += value;
		}
		return(sum);
	} else if (d._children) {
		var sum = 0;
		for (var i=0; i < d._children.length; i++) {
			var value = sumCountsBySample2(d._children[i], sample);
			sum += value;
		}
		if(d.values) {
			var value = parseFloat(d.values[sample]);
			sum += value;
		}
		return(sum);
	} else {
		if(d.values) {
			var value = parseFloat(d.values[sample]);
		 	return(value);
		}
	}
}

// function sumCountsBySample(d) {
// 	if (d.children) {
// 		values = d.children.map(sumCountsBySample);
// 		//alert(values.length + " " + values);
// 		//alert(values[0]);
// 		len = values[0].length;
// 		//alert(len);
// 		sums = [];
// 		for (itr3 = 0; itr3 < len; itr3++) {
// 			sums[itr3] = 0;
// 		}
//
// 		for(itr = 0; itr < values.length; itr++) {
// 			for (itr2 = 0; itr2 < len; itr2++) {
// 				//sums[itr2] += values[itr][itr2];
// 				sums[itr2] += values[itr][itr2];
// 			}
// 		}
// 		// alert(sums);
// 		if(d.values) {
// 			counts = d.values.map(parseFloat);
// 			for (itr = 0; itr < counts.length; itr++) {
// 				sums[itr] += counts[itr];
// 			}
// 		}
// 		// alert(sums);
// 		return(sums);
// 	} else if (d._children) {
// 		values = d._children.map(sumCountsBySample);
// 		//alert(values.length + " " + values);
// 		len = values[0].length;
// 		//alert(len);
// 		sums = [];
// 		for (itr3 = 0; itr3 < len; itr3++) {
// 			sums[itr3] = 0;
// 		}
//
// 		for(itr = 0; itr < values.length; itr++) {
// 			for (itr2 = 0; itr2 < len; itr2++) {
// 				//sums[itr2] += values[itr][itr2];
// 				sums[itr2] += values[itr][itr2];
// 			}
// 		}
// 		if(d.values) {
// 			counts = d.values.map(parseFloat);
// 			for (itr = 0; itr < counts.length; itr++) {
// 				sums[itr] += counts[itr];
// 			}
// 		}
// 		// alert(sums);
// 		return(sums);
// 	} else {
// 		if(d.values) {
// 			counts = d.values.map(parseFloat);
// 			return(counts);
// 		}
// 	}
// }

function hideChildren(d) {
	if(d.children) {
	    d._children = d.children;
		d.children.forEach(hideChildren)
	    d.children = null;
	}
}

// Toggle leaf status of node
function toggle_leaf(d) {
	if (d._leaf){
		d._leaf = false;
	} else {
		d._leaf = true;
	}
}

// Not sure what this function does
function create_slices(nodeEnter) {
  for (itr4 = 0; itr4 < samples; itr4++) {
  	  nodeEnter.append("circle")
  	  .style("fill", colors[itr4])
  	  .attr("class", "slice")
  };
  
  nodeEnter.select()

}

function create_node_proportions(d) {
      dohnut_data = []
      node_sum = 0;
      for (var itr=0; itr < samples; itr++) {
          node_sum += sumCountsBySample2(d,sample_names[itr]);
      }
      for (var itr=0; itr < samples; itr++) {
          prop = sumCountsBySample2(d,sample_names[itr]) / node_sum;
          dohnut_data.push({label: sample_names[itr], value: prop});
      }
      pie_data = pie(dohnut_data)
      //pie_array = []
      // for (var i=0; i < pie_data.length; i++) {
      //     pie_array.push(pie_data[i])
      // }
      return pie_data;
}

function constructDohnutPlot(nodeEnter) {
    // construct dohnut data
    var dohnut = nodeEnter.append("g")
                          .attr("class","dohnut")
                          .append("g")
                          .attr("class", "slices")
                          .selectAll("path.slice")
                          .data(function(d) {
                              return(create_node_proportions(d));
                           }, key)
                          .enter()
                          .insert("path")
                          .attr("class", "slice");
    //console.log(dohnut.data());
    
    // node_data = nodeEnter.data();
    //     console.log("node_data");
    //     console.log(node_data);
    //     var node_sum = 0;
    //     var dohnut_data = []; 
    //     for (var itr=0; itr < samples; itr++) {
    //              node_sum += sumCountsBySample2(node_data,sample_names[itr]);
    //     }     
    //     // create data and calculate proportions
    //     for (var itr=0; itr < samples; itr++) {
    //       prop = sumCountsBySample2(node_data,sample_names[itr]) / node_sum;
    //       dohnut_data.push({label: sample_names[itr], value: prop});
    //     }
    //console.log("dohnut_data");
    //console.log(dohnut_data);
    
    // var dohnut = nodeEnter.append("g")
    //                       .attr("class","dohnut")
    //                       .append("g")
    //                       .attr("class", "slices")
    //                       .selectAll("path.slice")
    //                       
    //     // dohnut;
    //     var node_data = dohnut.data();
    //     console.log(node_data);
    //     var node_sum = 0;
    //     var dohnut_data = [];
    //     
    //     for (var itr=0; itr < samples; itr++) {
    //         //console.log("constructDohnutPlot", node_data[0]);
    //         //console.log(node_data[0])
    //         node_sum += sumCountsBySample2(node_data[0],sample_names[itr]);
    //     }
    //     // create data and calculate proportions
    //     for (var itr=0; itr < samples; itr++) {
    //         prop = sumCountsBySample2(node_data[0],sample_names[itr]) / node_sum;
    //         dohnut_data.push({label: sample_names[itr], value: prop});
    //     }
    //     console.log(dohnut_data);
    //     
    //     var slice = dohnut.select(".slices").selectAll("path.slice")
    //                  .data(pie(dohnut_data), key)
    //     slice.enter()
    //          .insert("path")
    //          .attr("class", "slice");
             // .style("fill", function(d) { 
             //                  return named_colors[d["data"]["label"]] ; 
             //                  })
             //              .attr("opacity", 0.6);
             //.attr("class", "slice");
        //         
        //         dohnut.attr("transform", "translate(" + x + "," + y + ")");
        //         
        // slice.transition().duration(1000)
        //      .attrTween("d", function(d) {
        //      this._current = this._current || d;
        //      var interpolate = d3.interpolate(this._current, d);
        //      this._current = interpolate(0);
        //      return function(t) {
        //          return arc(interpolate(t));
        //      };
        //      });
        // console.log("finished styling slices");
        // 
        //         slice.exit()
        //              .remove();
}

function updateDohnutPlot(nodeUpdate) {
    slice = nodeUpdate.select(".dohnut").select(".slices").selectAll("path.slice");
    // console.log(slice)
    slice.style("fill", function(d,i) {
        console.log(d);
         return named_colors[d["data"]["label"]] ;
      })
    .attr("opacity", 0.6);
    var r = 30;
    var arc = d3.svg.arc()
                .outerRadius(r * 0.8)
                .innerRadius(r * 0.4);
    var outerArc = d3.svg.arc()
                     .innerRadius(r * 0.9)
                     .outerRadius(r * 0.9);
    slice.attrTween("d", function(d) {
           //console.log(d)
           this._current = this._current || d;
           var interpolate = d3.interpolate(this._current, d);
           this._current = interpolate(0);
          return function(t) {
              return arc(interpolate(t));
          };
    })
}


function create_leaf_nodes(nodeEnter) {
	for (itr2 = 0; itr2 < samples; itr2++) {
		nodeEnter.append("svg:circle")
		         .attr("class", "leaf")
		         .attr("cx", (itr2 + 1) * 30)
		         .attr("r", 1e-6)
		         .attr("opacity", 0)
		         .style("fill", function(d) { return d._leaf ? colors[itr2] : "#fff"; });
	}
}

function update_leaf_nodes(nodeUpdate) {
	leaf_circles = nodeUpdate.selectAll("circle.leaf")
	                  .transition()
	                  .attr("r", function(d,i) {
						  //alert(sample_names[i]);
					      value = sumCountsBySample2(d,sample_names[i]);
						  return(radius(value));
					  })
	                  .attr("opacity", function(d,i) {
						  if (d._leaf) {
						      return(trans);
						  } else {
							  return(0);
						  }
						  
					  });
// 	    leaf_circles.attr("r", function(d) {
// 								  if (d._leaf) {
// 									  if (d.values) {
// 									  	  return(radius(parseFloat(sumCountsBySample(d,itr3))));
// 									  } else {
// 										  return (1e-6);
// 									  }
// 								  } else {
// 									  return (1e-6);
// 								  }
// 							    })
// 	                 .attr("opacity", function(d) {
// 										  if (d._leaf) {
// 											  if (d.values) {
// 											  	  if (parseFloat(sumCountsBySample(d,itr3)) > 0) {
// 													  return(1);
// 											  	  }
// 											  } else {
// 												  return (0);
// 											  }
// 										  } else {
// 											  return (0);
// 										  }
// 									  })
// 	              .style("fill", function(d) { return d._leaf ? colors[itr3] : "#fff"; });
// 	}
}