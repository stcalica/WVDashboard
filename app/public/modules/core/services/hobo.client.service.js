(function(){

 'use strict';

  angular.module('core')
  .factory('hobo', hobo);


  hobo.$inject = ['$http'];

  function hobo($http){

  	var factory = {

      //stored in json file for easy changes
  	 getZNE : getZNE,
     getDaily:getDaily,
     getMonthly:getMonthly,
     getKitchen:getKitchen
//   getPlugLoad:getPlugLoad,
//   getLights:getLights,
//   getSolar:getSolar,
//   getEV:getEV,
//   getHVAC:getHVAC
//   getInstaHot:getInstaHot

  function getZNE(){
  		//grab from json file
  }

  function getDaily(building){
      //restAPI
  }

  function getMonthly(building){

  }

  function getKitchen(building){

  }

  	};

  return factory;
}();
