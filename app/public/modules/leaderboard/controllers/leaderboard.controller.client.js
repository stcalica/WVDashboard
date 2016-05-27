(function(){
	'use strict'; 
	
	angular.module('leaderboard')
		.controller('LeaderboardController', LeaderboardController);
	
	LeaderboardController.$inject = ['$rootScope', '$scope' ];

	function LeaderboardController($rootScope, $scope){
		var vm = this;

		// test data for Leaderboard graph
		vm.Costdata = [100,150,200,175];
		console.log('From Controller Costdata: ', Costdata);
	}
})();