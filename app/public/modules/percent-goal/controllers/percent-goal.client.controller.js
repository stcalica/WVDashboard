(function(){
	
	'use strict'; 
	
	angular.module('percent-goal')
		.controller('percent-goal', percentController);


	percentController.$inject = ['$rootScope', '$scope' ];
	
	function percentController($rootScope, $scope){
		var vm = this; 
		
		vm.percentGoalData = [{
			value: -6,
			label: 'A'
		},{
			value: 9,
			label: 'B'
		},{
			value: Math.random() * 10,
			label: 'C'
		},{
			value: Math.random() * 10,
			label: 'D'
		},{
			value: Math.random() * 10,
			label: 'E'
		},{
			value: Math.random() * 10,
			label: 'f'
		},{
			value: Math.random() * 10,
			label: 'G'
		},{
			value: Math.random() * 10,
			label: 'H'
		},{
			value: Math.random() * 10,
			label: 'I'
		}];

		console.log('From Controller percent-goal: ', percentGoalData);
	} 
})();
