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

        var margin = {top: 20, right: 20, bottom: 30, left: 40},
                      width = 300 - margin.left - margin.right,
                      height = 200 - margin.top - margin.bottom;
  
        var xScale = d3.scale.ordinal()
          .rangeRoundBands([0, width], .2);

        var yScale = d3.scale.linear()
          .domain([-12, 12])
          .range([height, 0])

        var xAxis = d3.svg.axis()
          .scale(xScale)
          .orient("bottom")
          .tickFormat('')
          .ticks(function(d) {
            return d.label;
          });

        var yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left")
          .tickFormat('')
          .tickValues([-12,-9,-6,-3,0,3,6,9,12]);

        xScale.domain(data.map(function(d) {
          return d.label;
        }));

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
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-50)");

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
            return xScale(d.label);
          })
          .attr("y", function(d) {
            return  d.value < 0 ? yScale(0) : yScale(d.value);
          })
          .attr("width", xScale.rangeBand())
          .attr("height", function(d) {
             return Math.abs(yScale(d.value) - yScale(0));
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
