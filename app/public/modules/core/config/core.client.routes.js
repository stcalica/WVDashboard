(function(){

	'use strict'; 

	angular.module('core')
		.config(Config); 
	
		Config.$inject = ['$routeProvider']; 
		
		function Config($routeProvider){
			
			$routeProvider
			
			.when('/', {
				templateUrl: '/modules/core/views/core.client.view.html'
			}) 
			.otherwise({
				
				redirectTo:'/' 

			});


		}


})();
