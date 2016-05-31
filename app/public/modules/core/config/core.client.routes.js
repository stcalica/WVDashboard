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
			.when('/building/:address',{
					templateUrl: '/modules/core/views/building.client.view.html',
					controller: 'Building',
					controllerAs: 'vm'
			}).when('/about',{
					templateUrl: '/modules/core/views/about.client.view.html'
			}).when('/contact',{
					templateUrl: '/modules/core/views/contact.client.view.html'
			})
			.otherwise({

				redirectTo:'/'

			});

		}


})();
