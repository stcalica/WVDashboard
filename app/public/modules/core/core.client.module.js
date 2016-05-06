(function(){

	'use strict';

	var dependencies = [];

	angular.module('core', dependencies);

	angular.module('core').run(initialize);

	initialize.$inject = [ '$http', '$rootScope', '$location'];

	function initialize($http, $rootScope, $location){
		//initialize module's variables here
		var vm = this;
	/*  vm.data = $http.get(url+params).success(function(data){
			$scope.data = data;
		}); */
	}




})();
