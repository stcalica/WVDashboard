(function(){

	'use strict';
	var dependencies = []; // all our modules  

	var mainModule = angular.module('dashboard', dependencies); //.config(Config); 

	
	angular.element(document).ready(function(){
		
		console.log('hello!');		
	
		angular.bootstrap(document, ['mainModule']); 

	});

});
