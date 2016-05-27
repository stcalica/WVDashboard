(function(){

    'use strict';

    angular.module('core')
    .controller('Building', buildingController);

    //add all the directives and services
    buildingController.$inject = ['$routeParams'];  //, 'hobo'];

    function buildingController($routeParams){
      var address = $routeParams.address;
      console.log(address);
      var vm = this;
      vm.address = address;
      // test data for the Leaderboard graph
      vm.graphData = [100,150,200,175];
      console.log('From Controller Costdata: ', vm.graphData);


    //  vm.ZNE = hobo.getZNE();
    //  vm.daily = hobo.getDaily(vm.address);
    //  vm.monthly = hobo.getMonthly(vm.address);


//    vm.graph_data =







    }


})();
