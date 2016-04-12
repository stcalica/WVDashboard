(function(){

	'use strict'; 

	angular.module('core')
		.config(Config); 
	
		Config.$inject = ['$routeProvider']; 
		
		function Config($routeProvider){
			
			$routeProvider
			
			.when('/core', {
				templateUrl: '/modules/core/views/core.client.view.html',
				controller: 'Index', 
				controllerAs: 'vm'
			}) 
			.otherwise({
				
				redirectTo:'/' 

			});


		}


})();
