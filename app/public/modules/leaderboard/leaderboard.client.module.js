(function(){
	
	'use strict'; 
	
	var dependencies = []; 
	
	angular.module('leaderboard', dependencies);

	angular.module('leaderboard').run(initialize);

	initialize.$inject = [ '$rootScope', '$location']; 

	function initialize($rootScope, $location){
		//initialize module's variables here 
		var vm = this;        	
	}
})(); 