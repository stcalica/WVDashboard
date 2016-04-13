(function(){
	
	'use strict'; 
	
	var dependencies = []; 
	
	angular.module('core', dependencies);

	angular.module('core').run(initialize);

	initialize.$inject = [ '$rootScope', '$location']; 

	function initialize($rootScope, $location){
		//initialize module's variables here 
		var vm = this; 
	        	
	}  




})(); 
