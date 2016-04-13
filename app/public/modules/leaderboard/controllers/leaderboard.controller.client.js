(function(){
	'use strict'; 
	
	angular.module('leaderboard')
		.controller('leaderboard', LeaderboardController);
	
	LeaderboardController.$inject = ['$rootScope', '$scope' ];

	function LeaderboardController($rootScope, $scope){
		var vm = this; 
	}
})();
