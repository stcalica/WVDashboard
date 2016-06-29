(function(){

	'use strict'; 

	angular.module('end-use')
		.config(Config); 
	
		Config.$inject = ['$routeProvider']; 
		
		function Config($routeProvider){
			
			$routeProvider
			
			.when('/end-use', {
				templateUrl: '/modules/end-use/views/end-use.client.view.html'
			}) 
			.otherwise({
				
				redirectTo:'/' 

			});


		}


})();
