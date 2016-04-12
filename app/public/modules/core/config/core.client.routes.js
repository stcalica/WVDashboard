(function(){

	'use strict'; 

	angular.module('core')
		.config(Config); 
	
		Config.$inject = ['$routeProvider']; 
		
		function Config($routeProvider){
			
			$routeProvider
			
			.when('/core', {
				template: '<h3> Testing Routing </h3>',
				controller: 'Index', 
				controllerAs: 'vm'
			}) 
			.otherwise({
				
				redirectTo:'/' 

			});


		}


})();
