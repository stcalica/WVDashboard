(function(){

    'use strict';

    angular.module('core')
    .controller('building', buildingController);

    //add all the directives and services
    buildingController.$inject = ['$routeParams', 'hobo'];

    function buildingController($routeParams){



      var address = $routeParams.address;

      var vm = this;
      vm.address = address;

      vm.ZNE = hobo.getZNE();
    //  vm.daily = hobo.getDaily(vm.address);
    //  vm.monthly = hobo.getMonthly(vm.address);

      vm.data_graph = {
            var ZNE = vm.ZNE;
          //  var daily = vm.daily;
        //    var monthly = vm.monthly;
      }






    }


})();
