(function(){

	'use strict'; 

	angular.module('percent-goal')
		.config(Config); 
	
		Config.$inject = ['$routeProvider']; 
		
		function Config($routeProvider){
			
			$routeProvider
			
			.when('/percent-goal', {
				templateUrl: '/modules/percent-goal/views/percent-goal.client.view.html'
			}) 
			.otherwise({
				
				redirectTo:'/' 

			});


		}


})();
