(function(){

	'use strict'; 
	
	// 'core', 'd3'
	var dependencies = []; //include hobo possibly 

	angular.module('energy-demand', dependencies)
		.factory('d3Service', [function(){
			var d3;


			

			return d3;
		}]);

	angular.module('energy-demand').run(initialize);

	initialize.$inject = [ '$rootScope', '$location']; 

	function initialize($rootScope, $location){
		//initialize module's variables here 
	}
})(); 
