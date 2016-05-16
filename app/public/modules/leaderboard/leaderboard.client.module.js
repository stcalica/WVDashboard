(function(){
	
	'use strict'; 
	
	var dependencies = []; 
	
	angular.module('leaderboard', dependencies)
		.factory('d3Service', [function(){
			var d3;


			

			return d3;
		}]);

	angular.module('leaderboard').run(initialize);

	initialize.$inject = [ '$rootScope', '$location']; 

	function initialize($rootScope, $location){
		//initialize module's variables here 
	}
})(); 
