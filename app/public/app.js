(function(){

	'use strict';

	var dependencies = [
		'ngRoute',
		'core',
		'leaderboard',
		'energy-demand',
		// used to be 'energy-by-use'
		'percent-goal'

	]; // all our modules

	angular.module('dashboard', dependencies).config(Config); //.config(Config);

	console.log('Loaded module dependencies: ', dependencies);

	Config.$inject = ['$locationProvider'];

	function Config($locationProvider){
		$locationProvider.hashPrefix('!');

	}

	if(window.location.hash === '#_=_'){
		window.location.hash = '#!';
	}

 	angular.element(document).ready(function(){
		angular.bootstrap(document, ['dashboard']);
	});
})();
