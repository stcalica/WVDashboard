(function(){

	'use strict';

	var dependencies = [
		'ngRoute',
		'core' 

	]; // all our modules  

	angular.module('dashboard', dependencies).config(Config); //.config(Config); 

	Config.$inject = ['$locationProvider'];
	
	function Config($locationProvider){
		$locationProvider.hashPrefix('!'); 
	
	}	

 	angular.element(document).ready(function(){
	
		angular.bootstrap(document, ['dashboard']); 


	});

})();
