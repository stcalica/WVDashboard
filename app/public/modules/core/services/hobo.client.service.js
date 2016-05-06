(function(){

 'use strict';

  angular.module('core')
  .factory('hobo', hobo);


  hobo.$inject = [];

  function hobo(){

  	var zne;

  	var energyDetails = {



  	};
  	var factory = {


  		getZNE : getZNE,
  		//getPlugLoad : getPlugLoad;



  	};

  	return factory;

  	function getZNE(){
  		return ZNE;
  	}

  	function setZNE(z){
  		ZNE=z;
  	}

  	//function getPlugLoad(){}

  }


})();
