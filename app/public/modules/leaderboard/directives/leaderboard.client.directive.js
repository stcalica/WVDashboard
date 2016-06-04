(function(){

	'use strict';

	angular.module('leaderboard')
	.directive('raceTrackGraph', raceTrack);

	raceTrack.$inject = ['d3'];

	function raceTrack(d3){
		var directive = {
			restrict: 'E',
			link: link,
			scope: {
				data: '='
			}
		};//end of function

		return directive;

		function link(scope, element){
			// changed from "graphData"
			scope.$watch('leaderboardData',function(){
			console.log ("Link");
			// var data = scope.data; 
			console.log('scope.data', scope.data);
			var data = scope.data;
			d3.d3().then(function(d3) {
					console.log("Called Race Track Graph");
					console.log("leaderboard data: ", data);
					console.log("enenergy_sum_week: ", data[0]['energy_sum_week']);

									// scope.render  = function(data){
					var categories= ['','215 Sage','1590 Tilia','1605 Tilia','1715 Tilia'];
					var bar_thickness = 95;

					var energy_vals = [0,0,0,0];
					var zne_vals = [0,0,0,0];
					// console.log('energy_vals', energy_vals);
					// console.log('energy_vals[0]', energy_vals[0]);

					for (var i = 0; i < 4; i++ ) {
						// console.log(i);
						// console.log("data[i]", data[i]);
						// console.log( "print in loop", data[i]['energy_sum_week']);
						energy_vals[i] = data[i]['energy_sum_week'];
						zne_vals[i] = data[i]['zne_sum_week'];
					}

					console.log("enenergy_sum_week for energy_vals[0]: ", energy_vals[0]);
				    
					var colors = ['#0000b4','#0082ca','#0094ff','#0d4bcf'];

					var grid = d3.range(25).map(function(i){
					    return {'x1':0,'y1':0,'x2':0,'y2':0};
					});
 
					var tickVals = grid.map(function(d,i){
						if(i>0){ 
							return i*10;
						} else if(i===0){ 
							return "100";
						}
					});

					// x axis goes from value 0 to 250 currently
					var xscale = d3.scale.linear()
					                .domain([0,250])	// changes scale of xaxis
					                .range([0,722]);

					var yscale = d3.scale.linear()
					                .domain([0,categories.length])
					                .range([0,480]);

					var colorScale = d3.scale.quantize()
					                .domain([0,categories.length])
					                .range(colors);

					// element[0] used to be "#wrapper", but that references HTML code,
					// which we don't want because modularity. Element fixed that
					var canvas = d3.select(element[0])
					                .append('svg')
					                .attr({'width':900,'height':500});

					// grid line specifications (currently hidden, should be removed)
					var grids = canvas.append('g')
					                  .attr('id','grid')
					                  .attr('transform','translate(150,10)')
					                  .selectAll('line')
					                  .data(grid)
					                  .enter()
					                  .append('line')
					                  .attr({'x1':function(d,i){ return i*30; },
					                         'y1':function(d){ return d.y1; },
					                         'x2':function(d,i){ return i*30; },
					                         'y2':function(d){ return d.y2; },
					                    })
					                  .style({'stroke':'#adadad','stroke-width':'1px'});

					var xAxis = d3.svg.axis();
					    xAxis
					        .orient('bottom')
					        .scale(xscale)
					        .tickValues(tickVals);

					var yAxis = d3.svg.axis();
					    yAxis
					        .orient('left')
					        .scale(yscale)
					        .tickSize(0)
					        .tickFormat(function(d,i){ return categories[i]; })
					        .tickValues(d3.range(5));

					var y_xis = canvas.append('g')
										// This changes the label text offset!!!!
					                  .attr("transform", "translate(230,0)")
					                  .attr('id','yaxis')
					                  .call(yAxis);

					var x_xis = canvas.append('g')
					// Bad Solution! = To get rid of x axis it is moved past 
					// the graphs boundary. Note the "880"
					                  .attr("transform", "translate(150,880)")
					                  .attr('id','xaxis')
					                  .call(xAxis)
					;

					// Bar specifications
					var chart = canvas.append('g')
					                    .attr("transform", "translate(150,0)")
										// Prints the value of each bar on the bar
										// .attr('id','bars')
					                    .selectAll('rect')
					                    .data(energy_vals)
					                    .enter()
					                    .append('rect')
					                    .attr('height',bar_thickness)
					                    // This changes the bar offset!!!
					                    .attr({'x':100,'y':function(d,i){ return yscale(i)+50; }})
					                    .style('fill',function(d){ 
									      	if(d == Math.max.apply(Math, energy_vals)){
											//if(data[d] > ZNE){ -->
									        	return "green";
									      	} else {
									        	return "red";
									      	}
									    })
				                        .attr('width',function(d){ return 0; })
				                        .append("svg:image")
				                        	.attr("xlink:href", "/images/horse_1590_red.svg")
										    .attr("height", bar_thickness)
										    .attr("width", bar_thickness)
											.attr("x", 100)
											.attr("y", function(d,i){ return yscale(i)+50; });
				   
				    // Animation when the graph updates
				    var transit = d3.select("svg").selectAll("rect")
				                        .data(energy_vals)
				                        .transition()
				                        .duration(1000) 
				                        .attr("width", function(d) {return xscale(d); });

				    var transitext = d3.select('#bars')
				                        .selectAll('text')
				                        .data(energy_vals)
				                        .enter()
				                        .append('text')
				                        .attr({'x':function(d) {return xscale(d)-200; },'y':function(d,i){ return yscale(i)+35; }})
				                        .text(function(d){ return d+"$"; }).style({'fill':'#fff','font-size':'14px'});

			}, true); // end of d3 funciton

				// }

				// scope.$watch('data', function(){
				// 	scope.render(scope.data);
				// }, true);
			}); // end of scope.$watch function
		}//end of link function
	} // end raceTrack()
})();
