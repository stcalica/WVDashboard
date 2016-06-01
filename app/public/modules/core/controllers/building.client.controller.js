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
    // buildings always in order 215,1590,1605,1715
    vm.leaderboardData = [
      {                 
        "energy_sum_week": 100, // (sum(end uses) - solar) over this last week
        "zne_sum_week": 90      // sum(ZNE daily goals) over this last week
      },{
        "energy_sum_week": 70,
        "zne_sum_week": 90
      },{
        "energy_sum_week": 80,
        "zne_sum_week": 90
      },{
        "energy_sum_week": 130,
        "zne_sum_week": 90
      }
    ];

    console.log('From Controller leaderboardData: ', vm.leaderboardData);

    // test data for the percent goal graph
    vm.percentGoalData = [{
      value: Math.random() * 100,
      datestr: '2016-05-07 21:36:07'
    },{
      value: Math.random() * 100,
      datestr: '2016-05-16 21:36:07'
    },{
      value: Math.random() * 100,
      datestr: '2016-05-17 21:36:07'
    },{
      value: Math.random() * 100,
      datestr: '2016-05-18 21:36:07'
    },{
      value: Math.random() * 100,
      datestr: '2016-05-31 21:36:07'
    },{
      value: Math.random() * 100,
      datestr: '2016-05-12 21:36:07'
    },{
      value: Math.random() * 100,
      datestr: '2016-06-01 21:36:07'
    },{
      value: Math.random() * 100,
      datestr: '2016-05-02 21:36:07'
    },{
      value: -52,
      datestr: '2016-04-23 21:36:07'
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
