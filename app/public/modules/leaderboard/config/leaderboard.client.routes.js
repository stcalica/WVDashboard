(function(){

	'use strict'; 

	angular.module('leaderboard')
		.config(Config); 
	
		Config.$inject = ['$routeProvider']; 
		
		function Config($routeProvider){
			
			$routeProvider
			
			.when('/leaderboard', {
				templateUrl: '/modules/leaderboard/views/leaderboard.client.view.html'
			}) 
			.otherwise({
				
				redirectTo:'/' 

			});


		}


})();
