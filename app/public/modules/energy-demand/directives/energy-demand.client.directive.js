(function(){

  'use strict';

  angular.module("energy-demand")
  .directive("energyDemandGraph", directive);

  directive.$inject = ["d3"];

  function directive(d3){
    var directive = {
      restrict: 'E',
      link: link,
      scope: {
        data: '='
      }
    };//end of function

    return directive;

    function link(scope, element){
      scope.$watch('energyDemandData',function(){
      console.log("Link");
      console.log('scope.data', scope.data);
      var data = scope.data;
			d3.d3().then(function(d3) {
        console.log("Called energy-demand graph");

        // Set the dimensions of the canvas / graph
        var margin = {top: 30, right: 20, bottom: 30, left: 50},
            width = 600 - margin.left - margin.right,
            height = 270 - margin.top - margin.bottom;

        // Parse the date / time
        // ###########################################
        // NEEDS TO ACCOUNT FOR SWITCH BETWEEN TIME MEASUREMENTS
        // ###########################################
        var parseDate = d3.time.format("%M:%H").parse;

        // Set the ranges
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        // Define the axes
        var xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(5);

        var yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(5);

        // Define the line
        // ###########################################
        // NEEDS TO SUM ALL "ON" END_USES TOGETHER,
        // SEPARATE THE SOLAR END_USE
        // ###########################################
        var valueline = d3.svg.line() 
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.value); });
            
        // Adds the svg canvas
        // use element[0] instead of "body"
        var svg = d3.select(element[0])
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", 
                      "translate(" + margin.left + "," + margin.top + ")");

        // Get the data
        // d3.csv("stocks.csv", function(error, data) {
            data.forEach(function(d) {
              d.date = parseDate(d.date);
              d.value = +d.value;
            }); // end for each loop

            // Scale the range of the data
            x.domain(d3.extent(data, function(d) { return d.date; }));
            y.domain([0, d3.max(data, function(d) { return d.value; })]);

            // Nest the entries by end_use
            var dataNest = d3.nest()
                .key(function(d) {return d.end_use;})
                .entries(data);

            var color = d3.scale.category10();  // set the colour scale

            // Loop through each end_use / key
            // ###########################################
            // NEEDS TO BE CHANGED TO JUST 2 LINES
            // ###########################################
            dataNest.forEach(function(d) {
                svg.append("path")
                    .attr("class", "line")
                    .style("stroke", function() { // Add dynamically
                        return d.color = color(d.key); })
                    .attr("d", valueline(d.values));
            }); // end for each loop

            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

        // }); // end get data funciton

				}, true); // end d3 function
			}); // end scope.$watch function
	  }//end of link function
  } //end of directive(d3) function
})(); // end of encompassing function
