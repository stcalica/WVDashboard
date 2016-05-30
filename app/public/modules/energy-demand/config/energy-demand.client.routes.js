(function(){

	'use strict'; 

	angular.module('energy-demand')
		.config(Config); 
	
		Config.$inject = ['$routeProvider']; 
		
		function Config($routeProvider){
			
			$routeProvider
			
			.when('/energy-demand', {
				templateUrl: '/modules/energy-demand/views/energy-demand.client.view.html'
			}) 
			.otherwise({
				
				redirectTo:'/' 

			});


		}


})();
