(function(){

	'use strict'; 
	
	// 'core', 'd3'
	var dependencies = []; //include hobo possibly 

	angular.module('end-use', dependencies)
		.factory('d3Service', [function(){
			var d3;


			

			return d3;
		}]);

	angular.module('end-use').run(initialize);

	initialize.$inject = [ '$rootScope', '$location']; 

	function initialize($rootScope, $location){
		//initialize module's variables here 
	}
})(); 
