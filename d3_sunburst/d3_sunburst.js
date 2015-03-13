// Dimensions of sunburst.
var width = 750;
var height = 600;
var radius = Math.min(width, height) / 2;

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
var b = {
	w: 75, h: 30, s: 3, t: 10, g:3
};

// Mapping of step names to colors.
var colors = {
  "Engineered": "#7f2704",
  "Acid_Mine_Drainage": "#fd8d3c",
  "Engineered_Aquatic": "#a63603",
  "Bioreactor": "#d94801",
  "Contaminated": "#a63603",
  "Solid_waste": "#f16913",
  "Hydrocarbon": "#fdae6b",
  "Contaminated_Soil": "#fdae6b",
  "Anaerobic_Bioreactor": "#fdae6b",
  "Anaerobic_Digester_Sludge": "#fdae6b",
  "Mixed_alcohol_bioreactor": "#fdae6b",
  "Tetrachloroethylene_and_derivatives": "#fdae6b",
  "Unclassified_Bioreactor": "#fdae6b",
  "Coal_bed":"#fdd0a2",
  "Anoxic_Bioreactor":"#fdae6b",
  "Anaerobic_Bioreactor":"#fdae6b",
  "Aerobic_Bioreactor":"#fdae6b",
  "Oil_Polluted":"#fdd0a2",
  "Oil_Sand":"#fdd0a2",
  "Tailing_Pond":"#fdd0a2",
  "Oil_Field": "#fdd0a2",
  "RDX": "#fdd0a2",
  "Tetrachloroethylene": "#fdd0a2",
  "Chloroethene": "#fdd0a2",
  "Cyanide": "#fdd0a2",
  "Phosphorus_Removal": "#fdd0a2",
  "Zoo": "#fdd0a2",
  "Municipal": "#fdd0a2",
  "Wood": "#fdd0a2",
  "Grass": "#fdd0a2",
  "Contaminated_Bioreactor": "#fdd0a2",
  "Composting": "#fdae6b",
  "Engineered_Marine": "#fdae6b",
  "Evaporation_Pond": "#fdd0a2",
  "Environmental": "#252525",
  "Aquatic": "#023858",
  "Marine": "#045A8D",
  "Freshwater": "#0570B0",
  "Thermal_springs": "#3690C0",
  "Non_marine_saline_lake": "#74A9CF",
  "Ashphalt_Lake": "#A6BDDB",
  "Groundwater": "#A6BDDB",
  "Ice": "#A6BDDB",
  "Lentic": "#A6BDDB",
  "Coastal": "#A6BDDB",
  "Coral_reef": "#A6BDDB",
  "Deep_ocean": "#A6BDDB",
  "Hydrothermal_vent": "#A6BDDB",
  "OMZ": "#A6BDDB",
  "Open_ocean": "#A6BDDB",
  "Whale_Fall": "#A6BDDB",
  "Meromictic": "#A6BDDB",
  "Microbial_mat": "#A6BDDB",
  "Water": "#A6BDDB",
  "Sub_Tropical_Forest": "#A6BDDB",
  "Agricultural": "#A6BDDB",
  "Deep_subsurface": "#A6BDDB",
  "5.4m": "#D0D1E6",
  "5.8m_contaminated": "#D0D1E6",
  "Oxygen_Injected": "#D0D1E6",
  "dead_zone": "#D0D1E6",
  "epilimnion": "#D0D1E6",
  "dead_zone": "#D0D1E6",
  "ice": "#D0D1E6",
  "Surface": "#D0D1E6",
  "Atlantic": "#D0D1E6",
  "Indian": "#D0D1E6",
  "Oil_spill_plume": "#D0D1E6",
  "Pacific": "#D0D1E6",
  "hydrothermal_fluid": "#D0D1E6",
  "1000m": "#D0D1E6",
  "100m": "#D0D1E6",
  "10m": "#D0D1E6",
  "120m": "#D0D1E6",
  "135m": "#D0D1E6",
  "150m": "#D0D1E6",
  "500m": "#D0D1E6",
  "50m": "#D0D1E6",
  "770m": "#D0D1E6",
  "80m": "#D0D1E6",
  "20m": "#D0D1E6",
  "250m": "#D0D1E6",
  "30m": "#D0D1E6",
  "AAIW": "#D0D1E6",
  "Bottom": "#D0D1E6",
  "36m": "#D0D1E6",
  "hypersaline_mat": "#D0D1E6",
  "acid_hot_spring": "#D0D1E6",
  "Terrestrial": "#004529",
  "Soil": "#006837",
  "Sediment": "#238443",
  "Marine_Sediment": "#41ab5d",
  "Freshwater_Sediment": "#78c679",
  "Non_marine_saline_lake_Sediment": "#addd8e",
  "Sub_Tropical_Forest": "#a1d99b",
  "Agricultural": "#a1d99b",
  "Deep_subsurface": "#a1d99b",
  "Desert": "#a1d99b",
  "Grassland": "#41ab5d",
  "Mediterranean_Forest": "#a1d99b",
  "Peat": "#a1d99b",
  "Temperate_Forest": "#74c476",
  "Tundra": "#a1d99b",
  "300m": "#c7e9c0",
  "coastal_plain": "#c7e9c0",
  "Cryoconite": "#D9F0A3",
  "Benthic": "#D9F0A3",
  "intertidal_zone": "#D9F0A3",
  "Sulphate_reducing": "#D9F0A3",
  "Air":"#737373",
  "Outdoor_Air":"#969696",
  "Smog":"#969696",
  "Upper_Troposphere":"#bdbdbd",
  "Polluted_City_Air": "#D9D9D9",
  "Host_Associated": "#49006A",
  "Mammals": "#7A0177",
  "Plants": "#AE017E",
  "Insect_Gut": "#dd3497",
  "Porifera": "#f768a1",  
  "Birds": "#f768a1",
  "Carnivores": "#AD34AA",
  "Foregut_fermenting_Herbivores": "#AD34AA",
  "Hindgut_fermenting_Herbivores": "#AD34AA",
  "Human": "#AD34AA",
  "Omnivores": "#AD34AA",
  "Armadillo": "#E067DD",
  "Bush_Dog": "#E067DD",
  "Dog": "#E067DD",
  "Domestic_dog": "#E067DD",
  "Echidna": "#E067DD",
  "Hyena": "#E067DD",
  "Lion": "#E067DD",
  "Polar_Bear": "#E067DD",
  "Saki": "#E067DD",
  "Big_Horn_Sheep": "#E067DD",
  "Colobus": "#E067DD",
  "Cow": "#E067DD",
  "Gazelle": "#E067DD",
  "Giraffe": "#E067DD",
  "Hyrax": "#E067DD",
  "Kangaroo": "#E067DD",
  "Okapi": "#E067DD",
  "Reindeer": "#E067DD",
  "Springbok": "#E067DD",
  "Urial": "#E067DD",
  "Wallaby": "#E067DD",
  "African_Elephant": "#E067DD",
  "Beaver": "#E067DD",
  "Black_Rhino": "#E067DD",
  "Capybara": "#E067DD",
  "Gorilla": "#E067DD",
  "Horse": "#E067DD",
  "Lemur": "#E067DD",
  "Orangutan": "#E067DD",
  "Rabbit": "#E067DD",
  "Zebra": "#E067DD",
  "Airway": "#E067DD",
  "Gut": "#E067DD",
  "Oral_Cavity": "#E067DD",
  "Skin": "#E067DD",
  "Vagina": "#E067DD",
  "Baboon": "#E067DD",
  "Black_Bear": "#E067DD",
  "Black_Lemur": "#E067DD",
  "Callimicos": "#E067DD",
  "Chimpanzee": "#E067DD",
  "Pig": "#E067DD",
  "Spectacled_Bear": "#E067DD",
  "Squirrel": "#E067DD",
  "Wild_Panda": "#E067DD",
  "Rhizosphere": "#fa9fb5",
  "Unclassified_Porifera": "#fa9fb5",
  "Digestive_system": "#fa9fb5",
  "Epithelium": "#fa9fb5",
  "Bee": "#fa9fb5",
  "Beetle_Gut": "#fa9fb5",
  "Termite_Gut": "#fa9fb5",
  "Hoatzin" : "#fcc5c0",
  "Arabidopsis" : "#fcc5c0",
  "Corn" : "#fcc5c0",
  "Miscanthus" : "#fcc5c0",
  "Switchgrass" : "#fcc5c0",
  "Extracellular_symbionts" : "#fcc5c0",
  "Epiphytes": "#fde0dd",
  "Viral_Sediment" : "#fc9272",
  "Viral_Sewage" : "#fc9272",
  "Viral_Hot_Spring" : "#fc9272",
  "Viral_Host_associated" : "#ef3b2c",
  "Viral_Soil" : "#fb6a4a",
  "Extreme": "#CB181D",
  "Viral_Aquatic" : "#A50F15",
  "Virome" : "#67000D",
  "Cow_Rumen" : "#fcbba1",
  "TBA" : "#fcbba1",
  "Viral_Agricultural" : "#fcbba1",
  "Viral_Hydrothermal_vent" : "#fcbba1",
  "Viral_Desert" : "#fcbba1",
  "Viral_Praire" : "#fcbba1",
  "Viral_Coral_reef" : "#fcbba1",
  "Viral_Adult_Feces" : "#fcbba1",
  "Viral_Baby_Feces" : "#fcbba1",
  "Viral_Marine" : "#fcbba1",
  "Viral_Porpoise" : "#fcbba1",
  "Viral_Swine" : "#fcbba1",
  "Viral_Hot_Spring" : "#fcbba1",
  "Extreme": "#cb181d",
  "Virome_Host_Associated": "#ef3b2c",
  "Viral_OMZ": "#fee0d2",
  "other": "#a173d1",
  "end": "#bbbbbb"
};

// Total size of all segments; we set this later, after loading the data.
var totalSize = 0; 

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var partition = d3.layout.partition()
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

// Use d3.text and d3.csv.parseRows so that we do not need to have a header
// row, and can receive the csv as an array of arrays.
d3.text("global_samples.csv", function(text) {
  var csv = d3.csv.parseRows(text);
  var json = buildHierarchy(csv);
  createVisualization(json);
});

// Main function to draw and set up the visualization, once we have the data.
function createVisualization(json) {

  // Basic setup of page elements.
  initializeBreadcrumbTrail();
  drawLegend();
  d3.select("#togglelegend").on("click", toggleLegend);

  // Bounding circle underneath the sunburst, to make it easier to detect
  // when the mouse leaves the parent g.
  vis.append("svg:circle")
      .attr("r", radius)
      .style("opacity", 0);
  
  
  // For efficiency, filter nodes to keep only those large enough to see.
  var nodes = partition.nodes(json)
      .filter(function(d) {
      return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
      });

  var path = vis.data([json]).selectAll("path")
      .data(nodes)
      .enter().append("svg:path")
      .attr("display", function(d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("fill", function(d) { return colors[d.name]; })
      .style("opacity", 1)
      .on("mouseover", mouseover)
      .on("click", click);

    // Add image to center
    vis.selectAll("image").data([0]).enter().append("image")
                                    .attr("xlink:href", "globe_square.png")
                                    .attr("x", -80)
                                    .attr("y", -80)
                                    .attr("width", "160")
                                    .attr("height", "160");
    // Get total size of the tree = value of root node from partition.
    totalSize = path.node().__data__.value;
   };
  
  // Add the mouseleave handler to the bounding circle.
  d3.select("#container").on("mouseleave", mouseleave);

  

// click to update the datatable
function click(d) {
  filter_data(d);
}

function filter_data(d) {
  position = d.depth + 3;
  filter_csv = [];
  for (var i=0; i < csv.length; i++) {
    if(csv[i][position] == d.name) {
      filter_csv.push(csv[i]);
    }
  }
  my_data_table.fnClearTable();
  my_data_table.fnAddData(filter_csv);
}

// Fade all but the current sequence, and show it in the breadcrumb trail.
function mouseover(d) {
  var percentage = (100 * d.value / totalSize).toPrecision(2);
  var percentageString = percentage + "%";
  if (percentage < 0.1) {
    percentageString = "< 0.1%";
  }
  percentageString = d.value + " (" + percentageString + ")";

  d3.select("#percentage")
      .text(percentageString);

  d3.select("#explanation")
      .style("visibility", "");
	  
  d3.select("#icon")
      .style("visibility", "hidden");

  var sequenceArray = getAncestors(d);
  updateBreadcrumbs(sequenceArray, percentageString);

  // Fade all the segments.
  d3.selectAll("path")
      .style("opacity", 0.3);

  // Then highlight only those that are an ancestor of the current segment.
  vis.selectAll("path")
      .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
              })
      .style("opacity", 1);
}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {

  // Hide the breadcrumb trail
  d3.select("#trail")
      .style("visibility", "hidden");

  // Deactivate all segments during transition.
  d3.selectAll("path").on("mouseover", null);

  // Transition each segment to full opacity and then reactivate it.
  d3.selectAll("path")
      .transition()
      .duration(1000)
      .style("opacity", 1)
      .each("end", function() {
              d3.select(this).on("mouseover", mouseover);
            });

  d3.select("#explanation")
      .style("visibility", "hidden");
  d3.select("#icon")
      .style("visibility", "");
}

// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
function getAncestors(node) {
  var path = [];
  var current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }
  return path;
}

function initializeBreadcrumbTrail() {
  // Add the svg area.
  var trail = d3.select("#sequence").append("svg:svg")
      .attr("width", width)
      .attr("height", 50)
      .attr("id", "trail");
  // Add the label at the end, for the percentage.
  trail.append("svg:text")
    .attr("id", "endlabel")
    .style("fill", "#000");
}

// calculate size of breadcrumb box due to name size
function calculateBreadcrumbWidth(d) {
	return(b.w + b.t + d.name.length*4.0);
}

// calculate breadcrumb offset
function calculateBreadcrumbOffset(d) {
	var offset = 0;
	// var d_temp = d;
	if (d.parent.name == "root") {
		return 0;
	}
	while(d.parent.name != "root") {
		d = d.parent;
		offset += (calculateBreadcrumbWidth(d) + b.g);
	}

	return(offset);
	// alert("Starting at " + d_temp.name);
	// while ("parent" in d_temp) {
	// 	offset += 1;
	// 	d_temp = d["parent"];
	// 	alert("Moved to " + d_temp["name"]);
	// 	alert("offset=" + offset);
	// }
	// d_temp = null;
	// //console.log(offset);
	// return(offset);
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
  var points = [];
  points.push("0,0"); // top-left
  points.push(calculateBreadcrumbWidth(d) + ",0"); //top right
  points.push(calculateBreadcrumbWidth(d) + b.t + "," + (b.h / 2)); // tip
  points.push(calculateBreadcrumbWidth(d) + "," + b.h); // bottom right
  points.push("0," + b.h); // bottom-left
  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
    points.push(b.t + "," + (b.h / 2));
  }
  return points.join(" ");
}

function calculateBreadcrumbPercentage(nodeArray) {
	var offset = 0;
	for (var i = 0; i < nodeArray.length; i++) {
	    offset += calculateBreadcrumbWidth(nodeArray[i]);
	}
	offset += nodeArray.length * b.g;
	offset += 45;
	return(offset);
}

// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray, percentageString) {

  // Data join; key function combines name and depth (= position in sequence).
  var g = d3.select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) { return d.name + d.depth; });

  // Add breadcrumb and label for entering nodes.
  var entering = g.enter().append("svg:g");

  entering.append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) { return colors[d.name]; });

  entering.append("svg:text")
      .attr("x", function (d) {
        return ((calculateBreadcrumbWidth(d) + b.t) / 2);
      })
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name; });

  // Set position for entering and updating nodes.
  g.attr("transform", function(d, i) {
    return "translate(" + calculateBreadcrumbOffset(d) + ", 0)";
  });

  // Remove exiting nodes.
  g.exit().remove();
  
  // Now move and update the percentage at the end.
  d3.select("#trail").select("#endlabel")
      .attr("x", calculateBreadcrumbPercentage(nodeArray))
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(percentageString);

  // Make the breadcrumb trail visible, if it's hidden.
  d3.select("#trail")
      .style("visibility", "");

}

function drawLegend() {

  // Dimensions of legend item: width, height, spacing, radius of rounded rect.
  var li = {
    w: 75, h: 30, s: 3, r: 3
  };

  var legend = d3.select("#legend").append("svg:svg")
      .attr("width", li.w)
      .attr("height", d3.keys(colors).length * (li.h + li.s));

  var g = legend.selectAll("g")
      .data(d3.entries(colors))
      .enter().append("svg:g")
      .attr("transform", function(d, i) {
              return "translate(0," + i * (li.h + li.s) + ")";
           });

  g.append("svg:rect")
      .attr("rx", li.r)
      .attr("ry", li.r)
      .attr("width", li.w)
      .attr("height", li.h)
      .style("fill", function(d) { return d.value; });

  g.append("svg:text")
      .attr("x", li.w / 2)
      .attr("y", li.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.key; });
}

function toggleLegend() {
  var legend = d3.select("#legend");
  if (legend.style("visibility") == "hidden") {
    legend.style("visibility", "");
  } else {
    legend.style("visibility", "hidden");
  }
}

// Take a 2-column CSV and transform it into a hierarchical structure suitable
// for a partition layout. The first column is a sequence of step names, from
// root to leaf, separated by hyphens. The second column is a count of how 
// often that sequence occurred.
function buildHierarchy(csv) {
  var root = {"name": "root", "children": []};
  for (var i = 0; i < csv.length; i++) {
    var sequence = csv[i][0];
    var size = +csv[i][1];
    if (isNaN(size)) { // e.g. if this is a header row
      continue;
    }
    var parts = sequence.split("-");
    var currentNode = root;
    for (var j = 0; j < parts.length; j++) {
      var children = currentNode["children"];
      var nodeName = parts[j];
      var childNode;
      if (j + 1 < parts.length) {
   // Not yet at the end of the sequence; move down the tree.
 	var foundChild = false;
 	for (var k = 0; k < children.length; k++) {
 	  if (children[k]["name"] == nodeName) {
 	    childNode = children[k];
 	    foundChild = true;
 	    break;
 	  }
 	}
  // If we don't already have a child node for this branch, create it.
 	if (!foundChild) {
 	  childNode = {"name": nodeName, "children": []};
 	  children.push(childNode);
 	}
 	currentNode = childNode;
      } else {
 	// Reached the end of the sequence; create a leaf node.
 	childNode = {"name": nodeName, "size": size};
 	children.push(childNode);
      }
    }
  }
  return root;
};
