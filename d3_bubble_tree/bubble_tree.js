
var m = [20, 120, 20, 120],
    w = 1280 - m[1] - m[3],
    h = 800 - m[0] - m[2],
    i = 0,
    root;

var tree = d3.layout.cluster()
                    .size([h, w])
	                .separation(function separation(a, b) {
  					  	return a.parent == b.parent ? 1 : 1;
					});

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var vis = d3.select("#figure").append("svg:svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
    .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

// bubble plot variables
var plot_offset = 300;
var radius = null;
var samples = 4;
var sample_names = [];
var trans = 0.5;
var colors = ["red", "blue", "green", "orange", "purple" ];
	
// pie stuff
var arc = d3.svg.arc()
	.outerRadius(radius * 0.8)
	.innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
	.innerRadius(radius * 0.9)
	.outerRadius(radius * 0.9);

var pie = d3.layout.pie()
.sort(null)
.value(function(d) {
	return d.value;
});



// quick crawl of tree to load sample_names
// variable
function initializeSampleNames(d){
	if(d.values) {
		if (sample_names.length == 0) {
			for (var sample_name in d.values) {
					sample_names.push(sample_name);
			}
		}
	}
	if (d.children) {
		for (var i=0; i < d.children.length; i++) {
			initializeSampleNames(d.children[i]);
		}
	} else if (d._children) {
		for (var i=0; i < d._children.length; i++) {
			initializeSampleNames(d._children[i]);
		}
	} 
}


d3.json("data/WL_ISA_Bubble_Chart-1-1.json", function(json) {
  root = json;
  root.x0 = h / 2;
  root.y0 = 0;
  
  // set full node status of all nodes
  function toggleAll(d) {
    if (d.children) {
      d.children.forEach(toggleAll);
      toggle(d);
    }
  }
  
  // sets leaf status of all nodes to false
  initializeLeaves(root);
  root._leaf = true;
  
  // Initialize the display to show a few nodes.
  root.children.forEach(toggleAll);
  initializeSampleNames(root);
  
  // Set max bubble size to max samples
  max_size = 0
  for(var i=0; i < sample_names.length; i++){
	  var sample_sum = sumCountsBySample2(root, sample_names[i]);
	  if (sample_sum > max_size) {
	      max_size = sample_sum;
	  }
  }
  
  radius = d3.scale.sqrt()
                   .domain([0, max_size])
                   .range([0, 30]);
				   
  var legend = vis.append("g")
                  .attr("class", "legend")
                  .attr("transform", "translate(" + (0) + "," + (50) + ")")
                  .selectAll("g")
                  .data([Math.round(max_size), Math.round(max_size/2), Math.round(max_size/4)])
                  .enter().append("g");

 legend.append("circle")
     .attr("cy", function(d) { return -radius(d); })
     .attr("r", radius);

 legend.append("text")
     .attr("y", function(d) { return -2 * radius(d); })
     .attr("dy", "1.2em")
     .text(d3.format(".1s"));
  
  var color_legend = vis.append("g")
	                    .attr("class", "legend")
	                    .attr("transform", "translate(" + (0) + "," + (70) + ")")
	                    .selectAll("g")
	                    .data(sample_names)
	                    .enter().append("g");
  
  color_legend.append("circle")
			      .attr("cy", function(d,i) { return i*20; })
                  .attr("r", 8)
				  .style("fill", function(d,i) {
							return colors[i];
						 })
				  .attr("opacity", trans);
  color_legend.append("text")
        .attr("y", function(d,i) { return i*20; })
		.attr("dy", 4)
		.attr("x", 40)		  
        .text(function(d,i) {
        	return d
        });
	              
  
  // alert(sample_names);
  // alert(sumCounts(root));
  // alert(sumCountsBySample(root, 1));
  // alert(sumCountsBySample(root, 2));
  // alert(sumCountsBySample(root, 3));
  // set_children_leaves(root);
  toggle(root);
  //console.log(root);
  //toggle(root.children[1]);
  //toggle(root.children[1].children[2]);
  //toggle_leaf(root.children[1].children[2]);
  //toggle(root.children[9]);
  //toggle(root.children[9].children[0]);
  //toggle_leaf(root.children[9].children[0]);
  update(root);
  
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

function update(source) {
  var duration = d3.event && d3.event.altKey ? 5000 : 500;

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse();

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 90; });

  // Update the nodes…
  var node = vis.selectAll("g.node")
                .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	  //.on("click", function(d) { toggle(d); update(d); });
      .on("click", function(d) { update_leaf(d); toggle(d); update(d); });

  nodeEnter.append("svg:circle")
      .attr("r", 1e-6)
	  .attr("class", "node_circle")
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
  
  //create_slices(nodeEnter);

  nodeEnter.append("svg:text")
      .attr("x", function(d) { return d.children || d._children ? -10 : -10; })
      .attr("y", 12)
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "end"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6);
  
  // circle that appears when leaf
  create_leaf_nodes(nodeEnter);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
  
  // update leaf nodes with colors
  update_leaf_nodes(nodeUpdate);

  nodeUpdate.select("circle.node_circle")
      .attr("r", function(d) {return 6;} )
      .style("fill", function(d) { return d._children ? "#CECECE" : "#fff"; });
  
  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);
  nodeExit.select("text")
      .style("fill-opacity", 1e-6);
  nodeExit.select(".leaf")
      .style("r", 1e-6)
	  .attr("opacity", 0);

  // Update the links…
  var link = vis.selectAll("path.link")
      .data(tree.links(nodes), function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("svg:path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      })
    .transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
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

// sets current leaf and all children leaves to false
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

function create_leaf_nodes(nodeEnter) {
	for (itr2 = 0; itr2 < samples; itr2++) {
		nodeEnter.append("svg:circle")
		         .attr("class", "leaf")
		         .attr("cx", (itr2 + 1) * 30)
		         .attr("r", 1e-6)
		         .attr("opacity", 0)
		         .style("fill", function(d) { return d._leaf ? colors[itr2] : "#fff"; });
	}
	console.log()
}

function update_leaf_nodes(nodeUpdate) {
	console.log("In update_leaf_nodes");
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