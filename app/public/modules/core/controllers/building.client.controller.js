(function(){

    'use strict';

    angular.module('core')
    .controller('building', buildingController);

    //add all the directives and services
    buildingController.$inject = ['$routeParams', 'hobo'];

    function buildingController($routeParams){
      var address = $routeParams.address;
      console.log(address);
      var vm = this;
      vm.address = address;

    //  vm.ZNE = hobo.getZNE();
    //  vm.daily = hobo.getDaily(vm.address);
    //  vm.monthly = hobo.getMonthly(vm.address);


//    vm.graph_data =







    }


})();
