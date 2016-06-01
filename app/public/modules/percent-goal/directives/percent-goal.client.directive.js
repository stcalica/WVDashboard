(function(){

  'use strict';

  angular.module("percent-goal")
  .directive("percentZneGoal", directive);

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
      scope.$watch('percentGoalData',function(){
      console.log("Link");
      console.log('scope.data', scope.data);
      var data = scope.data;
			d3.d3().then(function(d3) {
        console.log("Called percent-goal graph");

        var margin = {top: 50, right: 20, bottom: 30, left: 40},
                      width = 1200 - margin.left - margin.right,
                      height = 667 - margin.top - margin.bottom;

        var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S");
        data.forEach(function(d) {
        	d.date = parseDate.parse(d.datestr);
        })

        var barRawWidth = width / (data.length);
		var barPadding = 35;
		var xStart = barPadding + (barRawWidth/2);
		var barWidth = barRawWidth - (barPadding*2);
        // var timeFormat = d3.time.format("%m-%d").parse;
  
        // var xScale = d3.scale.ordinal()
        //   .rangeRoundBands([0, width], .2);


		// var x = d3.time.scale().range([0, width]);          
		// var x = d3.time.scale().range([xStart, width-xStart]);          

		var x = d3.scale.ordinal()
			.domain(data.map(function(d){
				return d.date;
			} ))
			.rangeRoundBands([0, width], 0.1);

		// var x = d3.time.scale()
		    // .domain([new Date(data[0].date), d3.time.day.offset(new Date(data[data.length - 1].date), 1)])
		    // .domain([new Date(data[0].date), 7])
		    // .rangeRound([0, width - margin.left - margin.right]);


        var yScale = d3.scale.linear()
          .domain([-100, 100])
          .range([height, 0]);

        var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          // .tickFormat('')
          // .tickFormat(timeFormat)
          .tickPadding(height/2)
          // .tickSize([0,height/2])
          .ticks(3)
          // .ticks(d3.time.day, 7	)
          .tickFormat(d3.time.format('%m-%d'));
          // .ticks(function(d) {
          //   return d.datestr;
          // });

        // var xExtent = d3.extent(data, function(d) { return d.date; });
        // var nxExtent = [d3.time.day.offset(xExtent[0], -1) , d3.time.day.offset(xExtent[1],1)];
        // console.log(d3.time.day.offset(xExtent[0], -2));
		// var nxExtent = [d3.time.month.offset(xExtent[0], -1), d3.time.month.offset(xExtent[1], 0)];
		// x.domain(xExtent);

		

        var yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left")
          .tickFormat('');
          // .tickValues([-12,-9,-6,-3,0,3,6,9,12]);

        // xScale.domain(data.map(function(d) {
        //   return d.datestr;
        // }));

        // DOES ELEMENT NEED TO USE A DIFFERENT INDEX?!?
        var svg = d3.select(element[0])
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + height/2 + ")")
          .call(xAxis)
          .selectAll("text")
          .style("text-anchor", "end");
          // .attr("dx", "-.8em")
          // .attr("dy", ".15em");

        svg.append("g")
          .attr("class", "axis")
          .call(yAxis)
          .append("text")
          .style("text-anchor", "end")
          .attr("transform", "translate(10, -10)")
          .text("% ZNE");

        svg.selectAll("bar")
          .data(data)
          .enter().append("rect")
          .attr("x", function(d) {
            // return xScale(d.datestr);
            return x(d.date);
          })
          // .attr('x', function(d) { return x(new Date(d.date)); })
          .attr("y", function(d) {
            return  d.value < 0 ? yScale(0) + 6 : yScale(d.value);
          })
          .attr("width", x.rangeBand())
          // .attr("width", 5)
          .attr("height", function(d) {
             return  Math.abs(yScale(d.value) - yScale(0));
          })
          .style("fill", function(d) {
            if (d.value < 0) {
              return "red";
            } else if (d.value > 0) {
              return "green";
            } else {
              return "lightgray";
            }
          });
				}, true); // end d3 function
			}); // end scope.$watch function
	  }//end of link function
  } //end of directive(d3) function
})(); // end of encompassing function
