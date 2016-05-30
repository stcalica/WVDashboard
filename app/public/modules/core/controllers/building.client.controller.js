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
    vm.leaderboardData = [100,150,200,175];
    console.log('From Controller leaderboardData: ', vm.leaderboardData);

    // test data for the percent goal graph
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

    console.log('From Controller percent-goal: ', vm.percentGoalData);

    // NEEDS UPDATE!!!!!!!!!!!!!!!!!!!
    // test data for the energy demand graph
    // symbol = end_use, price = value
    // date is currently formatted "minute:hour"
    vm.energyDemandData = [{
      value: Math.random() * 100,
      date: '00:1',
      end_use: 'Sol'
    },{
      value: Math.random() * 100,
      date: '30:1',
      end_use: 'Sol'
    },{
      value: Math.random() * 100,
      date: '00:2',
      end_use: 'Sol'
    },{
      value: Math.random() * 100,
      date: '30:2',
      end_use: 'Sol'
    },{
      value: Math.random() * 100,
      date: '00:3',
      end_use: 'Sol'
    },{
      value: Math.random() * 100,
      date: '00:1',
      end_use: 'A'
    },{
      value: Math.random() * 100,
      date: '30:1',
      end_use: 'A'
    },{
      value: Math.random() * 100,
      date: '00:2',
      end_use: 'A'
    },{
      value: Math.random() * 100,
      date: '30:2',
      end_use: 'A'
    },{
      value: Math.random() * 100,
      date: '00:3',
      end_use: 'A'
    },{
      value: Math.random() * 100,
      date: '00:1',
      end_use: 'B'
    },{
      value: Math.random() * 100,
      date: '30:1',
      end_use: 'B'
    },{
      value: Math.random() * 100,
      date: '00:2',
      end_use: 'B'
    },{
      value: Math.random() * 100,
      date: '30:2',
      end_use: 'B'
    },{
      value: Math.random() * 100,
      date: '00:3',
      end_use: 'B'
    }];

    console.log('From Controller energyDemandData: ', vm.energyDemandData);

  //  vm.ZNE = hobo.getZNE();
  //  vm.daily = hobo.getDaily(vm.address);
  //  vm.monthly = hobo.getMonthly(vm.address);

  } // end buildingController() function
})(); // end encompassing function
