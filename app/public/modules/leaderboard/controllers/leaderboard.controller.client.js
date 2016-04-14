(function(){
	'use strict'; 
	
	angular.module('leaderboard')
		.controller('LeaderboardController', LeaderboardController);
	
	LeaderboardController.$inject = ['$rootScope', '$scope' ];

	function LeaderboardController($rootScope, $scope){
		var lc = this; 
	}
})();
