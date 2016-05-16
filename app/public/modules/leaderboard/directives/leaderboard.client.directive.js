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
				console.log ("Link");
				d3.d3().then(function(d3) {
					console.log("Called Race Track Graph");
					var svg = d3.select(element[0])
					.append('svg')
					.attr('width', 300)
					.attr('height', 300);


					scope.render  = function(data){






					}

					scope.$watch('data', function(){
						scope.render(scope.data);
					}, true);
				});
		}//end of link function
	}
})();
