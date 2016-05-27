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


				scope.$watch('graphData',function(){
				console.log ("Link");
				// var data = scope.data; 
				console.log('scope.data', scope.data);
				var data = scope.data;
				d3.d3().then(function(d3) {
					console.log("Called Race Track Graph");
										// scope.render  = function(data){
						var categories= ['','215','1590','1605','1715'];
					    // Data
					    // var data = [100,150,200,175];

					    // Fake ZNE Goal
					    var ZNE = 200;
					    
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

						var xscale = d3.scale.linear()
						                .domain([10,250])
						                .range([0,722]);

						var yscale = d3.scale.linear()
						                .domain([0,categories.length])
						                .range([0,480]);

						var colorScale = d3.scale.quantize()
						                .domain([0,categories.length])
						                .range(colors);

						var canvas = d3.select(element[0])
						                .append('svg')
						                .attr({'width':900,'height':500});

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
						                  .attr("transform", "translate(130,0)")
						                  .attr('id','yaxis')
						                  .call(yAxis);

						var x_xis = canvas.append('g')
						// Bad Solution! = To get rid of x axis it is moved past 
						// the graphs boundary. Note the "880"
						                  .attr("transform", "translate(150,880)")
						                  .attr('id','xaxis')
						                  .call(xAxis)
						;

						var chart = canvas.append('g')
						                    .attr("transform", "translate(150,0)")
											// Prints the value of each bar on the bar
											// .attr('id','bars')
						                    .selectAll('rect')
						                    .data(data)
						                    .enter()
						                    .append('rect')
						                    .attr('height',95)
						                    .attr({'x':0,'y':function(d,i){ return yscale(i)+50; }})
						                    .style('fill',function(d){ 
										      	if(d == Math.max.apply(Math, data)){
												//if(data[d] > ZNE){ -->
										        	return "green";
										      	} else {
										        	return "red";
										      	}
										    })
					                        .attr('width',function(d){ return 0; });
					   
					    // Animation when the graph updates
					    var transit = d3.select("svg").selectAll("rect")
					                        .data(data)
					                        .transition()
					                        .duration(1000) 
					                        .attr("width", function(d) {return xscale(d); });

					    var transitext = d3.select('#bars')
					                        .selectAll('text')
					                        .data(data)
					                        .enter()
					                        .append('text')
					                        .attr({'x':function(d) {return xscale(d)-200; },'y':function(d,i){ return yscale(i)+35; }})
					                        .text(function(d){ return d+"$"; }).style({'fill':'#fff','font-size':'14px'});

					  }, true);

					// }

					// scope.$watch('data', function(){
					// 	scope.render(scope.data);
					// }, true);
				}); // end of d3 funciton
		}//end of link function
	} // end raceTrack()
})();
