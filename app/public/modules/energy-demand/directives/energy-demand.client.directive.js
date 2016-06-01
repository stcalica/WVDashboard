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
        var margin = {top: 50, right: 20, bottom: 30, left: 40},
            width = 1000 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // Parse the date / time
        var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

        // Set the ranges
        //var x = d3.time.scale().range([0, width]);
        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
        var y = d3.scale.linear().range([height, 0]);

        // Define the axes
        // var xAxis = d3.svg.axis().scale(x)
        //     .orient("bottom").ticks(5);

        var xAxis = d3.svg.axis().scale(x)
        .orient("bottom");

        var diff = Math.abs( (new Date(data[1].date)).getTime() - (new Date(data[0].date)).getTime() );

        if( diff <= 1800000)
            xAxis.tickFormat(d3.time.format('%H:%M'));
        else if( 1800000 < diff <= 10800000)
            xAxis.tickFormat(d3.time.format('%d %H'));
        else if( 10800000 < diff <= 43200000)
            xAxis.tickFormat(d3.time.format('%d %H'));
        else if( diff > 43200000)
            xAxis.tickFormat(d3.time.format('%m/%d'));


        var yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(10);

        // Define the linear line
        var valueline = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.Sum); })
            .interpolate("basis");
            
        // Define the smooth line
        var valueline2=d3.svg.line()
            .interpolate('basis')   
            .x(function(d){return x(d.date)})
            .y(function(d){return y(d.Solar)});
            
        // Adds the svg canvas
        var svg = d3.select(element[0])
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", 
                      "translate(" + margin.left + "," + margin.top + ")");

        // Get the data
            data.forEach(function(d) {
                d.date = parseDate(d.date);
                d.Sum = +d.Sum;
                d.Solar = +d.Solar;
                console.log(d.Sum);
            });

            // Scale the range of the data
            //x.domain(d3.extent(data, function(d) { return d.date; }));
            x.domain(data.map(function(d) { return d.date; }));
            y.domain([0, d3.max(data, function(d) { return Math.max(d.Sum,d.Solar) })]);
            

            // Add the valueline path.
            svg.append("path")
                .style("stroke", "red")
                .style("stroke-width", 2)
                .style("fill", "none")
                .attr("class", "line")
                .attr("d", valueline(data));
            
            svg.append("path") 
                .style("stroke","steelblue")
                .style("stroke-width", 2)
                .style("fill", "none")
                .attr("d", valueline2(data));
                   
          // svg.selectAll("dot")
          //       .data(data)
          //       .enter().append("circle")
          //       .attr("r",3)
          //       .attr("cx", function(d) { return x(d.date) ; })
          //       .attr("cy", function(d) { return y(d.Sum); })
          //       .attr("fill","steelblue")
          //       .attr("stroke","steelblue");
                
            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                 .attr("width", 1440)
                .call(xAxis);
                
            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            svg.append("circle")
                .style("stroke", "gray")
                .style("fill", "red")
                .attr("r", 10)
                .attr("cx", width - 50)
                .attr("cy", height - 50)
                .on("click", updatePlugsSub);

            svg.append("circle")
                .style("stroke", "gray")
                .style("fill", "green")
                .attr("r", 10)
                .attr("cx", width - 100)
                .attr("cy", height - 50)
                .on("click", updatePlugsAdd);

            svg.append("circle")
                .style("stroke", "gray")
                .style("fill", "red")
                .attr("r", 10)
                .attr("cx", width - 50)
                .attr("cy", height - 100)
                .on("click", updateKitchenSub);

            svg.append("circle")
                .style("stroke", "gray")
                .style("fill", "green")
                .attr("r", 10)
                .attr("cx", width - 100)
                .attr("cy", height - 100)
                .on("click", updateKitchenAdd);

            svg.append("circle")
                .style("stroke", "gray")
                .style("fill", "red")
                .attr("r", 10)
                .attr("cx", width - 50)
                .attr("cy", height - 150)
                .on("click", updateEVSub);

            svg.append("circle")
                .style("stroke", "gray")
                .style("fill", "green")
                .attr("r", 10)
                .attr("cx", width - 100)
                .attr("cy", height - 150)
                .on("click", updateEVAdd);

            svg.append("circle")
                .style("stroke", "gray")
                .style("fill", "red")
                .attr("r", 10)
                .attr("cx", width - 50)
                .attr("cy", height - 200)
                .on("click", updateLightsSub);

            svg.append("circle")
                .style("stroke", "gray")
                .style("fill", "green")
                .attr("r", 10)
                .attr("cx", width - 100)
                .attr("cy", height - 200)
                .on("click", updateLightsAdd);


            //update data from combobox onChange
            function updatePlugsSub(value) {
                data.forEach(function(d) {
                    d.date = d.date;
                    d.Sum = +(d.Sum - d.Plugs);
                    d.Solar = +d.Solar;
                    d.Kitchen = +d.Kitchen;
                    d.Plugs = +d.Plugs;
                    d.EV = +d.EV;
                    d.Lights = +d.Lights;
                });

              x.domain(data.map(function(d) { return d.date; }));
              y.domain([0, d3.max(data, function(d) { return Math.max(d.Sum,d.Solar) })]);

                // Select the section we want to apply our changes to
                var trans = d3.select("body").transition();
                
                // Make the changes
                var transition = svg.transition().duration(750),
                    delay = function(d, i) { return i * 50; };
                
               svg.selectAll(".line")
                 .data(data)
                 .transition().duration(750)
                 .attr("d", valueline(data));
                
                transition.select(".y.axis") // change the y axis
                  .call(yAxis);

                };

            function updatePlugsAdd(value) {
                data.forEach(function(d) {
                    d.date = d.date;
                    d.Sum = +(d.Sum + d.Plugs);
                    d.Solar = +d.Solar;
                    d.Kitchen = +d.Kitchen;
                    d.Plugs = +d.Plugs;
                    d.EV = +d.EV;
                    d.Lights = +d.Lights;
                });

              x.domain(data.map(function(d) { return d.date; }));
              y.domain([0, d3.max(data, function(d) { return Math.max(d.Sum,d.Solar) })]);

                // Select the section we want to apply our changes to
                var trans = d3.select("body").transition();
                
                // Make the changes
                var transition = svg.transition().duration(750),
                    delay = function(d, i) { return i * 50; };
                
               svg.selectAll(".line")
                 .data(data)
                 .transition().duration(750)
                 .attr("d", valueline(data));
                
                transition.select(".y.axis") // change the y axis
                  .call(yAxis);

                transition.select(".x.axis") // change the y axis
                  .call(xAxis);
                };

            function updateKitchenSub(value) {
                data.forEach(function(d) {
                    d.date = d.date;
                    d.Sum = +(d.Sum - d.Kitchen);
                    d.Solar = +d.Solar;
                    d.Kitchen = +d.Kitchen;
                    d.Plugs = +d.Plugs;
                    d.EV = +d.EV;
                    d.Lights = +d.Lights;
                });

              x.domain(data.map(function(d) { return d.date; }));
              y.domain([0, d3.max(data, function(d) { return Math.max(d.Sum,d.Solar) })]);

                // Select the section we want to apply our changes to
                var trans = d3.select("body").transition();
                
                // Make the changes
                var transition = svg.transition().duration(750),
                    delay = function(d, i) { return i * 50; };
                
               svg.selectAll(".line")
                 .data(data)
                 .transition().duration(750)
                 .attr("d", valueline(data));
                
                transition.select(".y.axis") // change the y axis
                  .call(yAxis);

                transition.select(".x.axis") // change the y axis
                  .call(xAxis);
                };

            function updateKitchenAdd(value) {
                data.forEach(function(d) {
                    d.date = d.date;
                    d.Sum = +(d.Sum + d.Kitchen);
                    d.Solar = +d.Solar;
                    d.Kitchen = +d.Kitchen;
                    d.Plugs = +d.Plugs;
                    d.EV = +d.EV;
                    d.Lights = +d.Lights;
                });

              x.domain(data.map(function(d) { return d.date; }));
              y.domain([0, d3.max(data, function(d) { return Math.max(d.Sum,d.Solar) })]);

                // Select the section we want to apply our changes to
                var trans = d3.select("body").transition();
                
                // Make the changes
                var transition = svg.transition().duration(750),
                    delay = function(d, i) { return i * 50; };
                
               svg.selectAll(".line")
                 .data(data)
                 .transition().duration(750)
                 .attr("d", valueline(data));
                
                transition.select(".y.axis") // change the y axis
                  .call(yAxis);

                transition.select(".x.axis") // change the y axis
                  .call(xAxis);
                };

            function updateLightsSub(value) {
                data.forEach(function(d) {
                    d.date = d.date;
                    d.Sum = +(d.Sum - d.Lights);
                    d.Solar = +d.Solar;
                    d.Kitchen = +d.Kitchen;
                    d.Plugs = +d.Plugs;
                    d.EV = +d.EV;
                    d.Lights = +d.Lights;
                });

              x.domain(data.map(function(d) { return d.date; }));
              y.domain([0, d3.max(data, function(d) { return Math.max(d.Sum,d.Solar) })]);

                // Select the section we want to apply our changes to
                var trans = d3.select("body").transition();
                
                // Make the changes
                var transition = svg.transition().duration(750),
                    delay = function(d, i) { return i * 50; };
                
               svg.selectAll(".line")
                 .data(data)
                 .transition().duration(750)
                 .attr("d", valueline(data));
                
                transition.select(".y.axis") // change the y axis
                  .call(yAxis);

                transition.select(".x.axis") // change the y axis
                  .call(xAxis);
                };

            function updateLightsAdd(value) {
                data.forEach(function(d) {
                    d.date = d.date;
                    d.Sum = +(d.Sum + d.Lights);
                    d.Solar = +d.Solar;
                    d.Kitchen = +d.Kitchen;
                    d.Plugs = +d.Plugs;
                    d.EV = +d.EV;
                    d.Lights = +d.Lights;
                });

              x.domain(data.map(function(d) { return d.date; }));
              y.domain([0, d3.max(data, function(d) { return Math.max(d.Sum,d.Solar) })]);

                // Select the section we want to apply our changes to
                var trans = d3.select("body").transition();
                
                // Make the changes
                var transition = svg.transition().duration(750),
                    delay = function(d, i) { return i * 50; };
                
               svg.selectAll(".line")
                 .data(data)
                 .transition().duration(750)
                 .attr("d", valueline(data));
                
                transition.select(".y.axis") // change the y axis
                  .call(yAxis);

                transition.select(".x.axis") // change the y axis
                  .call(xAxis);
                };

            function updateEVSub(value) {
                data.forEach(function(d) {
                    d.date = d.date;
                    d.Sum = +(d.Sum - d.EV);
                    d.Solar = +d.Solar;
                    d.Kitchen = +d.Kitchen;
                    d.Plugs = +d.Plugs;
                    d.EV = +d.EV;
                    d.Lights = +d.Lights;
                });

              x.domain(data.map(function(d) { return d.date; }));
              y.domain([0, d3.max(data, function(d) { return Math.max(d.Sum,d.Solar) })]);

                // Select the section we want to apply our changes to
                var trans = d3.select("body").transition();
                
                // Make the changes
                var transition = svg.transition().duration(750),
                    delay = function(d, i) { return i * 50; };
                
               svg.selectAll(".line")
                 .data(data)
                 .transition().duration(750)
                 .attr("d", valueline(data));
                
                transition.select(".y.axis") // change the y axis
                  .call(yAxis);

                transition.select(".x.axis") // change the y axis
                  .call(xAxis);
                };

            function updateEVAdd(value) {
                data.forEach(function(d) {
                    d.date = d.date;
                    d.Sum = +(d.Sum + d.EV);
                    d.Solar = +d.Solar;
                    d.Kitchen = +d.Kitchen;
                    d.Plugs = +d.Plugs;
                    d.EV = +d.EV;
                    d.Lights = +d.Lights;
                });

              x.domain(data.map(function(d) { return d.date; }));
              y.domain([0, d3.max(data, function(d) { return Math.max(d.Sum,d.Solar) })]);

                // Select the section we want to apply our changes to
                var trans = d3.select("body").transition();
                
                // Make the changes
                var transition = svg.transition().duration(750),
                    delay = function(d, i) { return i * 50; };
                
               svg.selectAll(".line")
                 .data(data)
                 .transition().duration(750)
                 .attr("d", valueline(data));
                
                transition.select(".y.axis") // change the y axis
                  .call(yAxis);

                transition.select(".x.axis") // change the y axis
                  .call(xAxis);
                };

				}, true); // end d3 function
			}); // end scope.$watch function
	  }//end of link function
  } //end of directive(d3) function
})(); // end of encompassing function