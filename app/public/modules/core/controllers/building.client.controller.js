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
        "zne_sum_week": 90,     // sum(ZNE daily goals) over this last week
        "address": "215"
      },{
        "energy_sum_week": 70,
        "zne_sum_week": 90,
        "address": "1590"
      },{
        "energy_sum_week": 80,
        "zne_sum_week": 90,
        "address": "1605"
      },{
        "energy_sum_week": 130,
        "zne_sum_week": 90,
        "address": "1715"
      }
    ];

    console.log('From Controller leaderboardData: ', vm.leaderboardData);

    // test data for the percent goal graph
    vm.percentGoalData = [{
      zne: 50,
      value: 35,
      datestr: '2016-05-01 15:42:13'
    },{
      zne: 50,
      value: 9,
      datestr: '2016-05-02 15:42:13'
    },{
      zne: 50,
      value: Math.random() * 100,
      datestr: '2016-05-03 15:42:13'
    },{
      zne: 50,
      value: Math.random() * 100,
      datestr: '2016-05-04 15:42:13'
    },{
      zne: 50,
      value: Math.random() * 100,
      datestr: '2016-05-05 15:42:13'
    },{
      zne: 50,
      value: Math.random() * 100,
      datestr: '2016-05-06 15:42:13'
    },{
      zne: 50,
      value: Math.random() * 100,
      datestr: '2016-05-07 15:42:13'
    },{
      zne: 50,
      value: Math.random() * 100,
      datestr: '2016-05-08 15:42:13'
    },{
      zne: 50,
      value: 50,
      datestr: '2016-05-09 15:42:13'
    }];

    console.log('From Controller percent-goal: ', vm.percentGoalData);

    // NEEDS UPDATE!!!!!!!!!!!!!!!!!!!
    // test data for the energy demand graph
    // symbol = end_use, price = value
    // date is currently formatted "minute:hour"
    vm.energyDemandData = [{
        "date": "2016-05-01 15:42:13",
        "Kitchen": 1,
        "Lights": 2,
        "Plugs": 3,
        "EV": 4,
        "Solar": 5,
        "Sum": 15
      }, {
        "date": "2016-05-02 15:42:13",
        "Kitchen": 1,
        "Lights": 2,
        "Plugs": 3,
        "EV": 4,
        "Solar": 3,
        "Sum": 12
      }, {
        "date": "2016-05-03 15:42:13",
        "Kitchen": 1,
        "Lights": 2,
        "Plugs": 3,
        "EV": 4,
        "Solar": 12,
        "Sum": 42
      }, {
        "date": "2016-05-04 15:42:13",
        "Kitchen": 1,
        "Lights": 2,
        "Plugs": 3,
        "EV": 4,
        "Solar": 8,
        "Sum": 67
      }, {
        "date": "2016-05-05 15:42:13",
        "Kitchen": 1,
        "Lights": 2,
        "Plugs": 3,
        "EV": 4,
        "Solar": 7,
        "Sum": 22
      }
    ];

    console.log('From Controller energyDemandData: ', vm.energyDemandData);

  //  vm.ZNE = hobo.getZNE();
  //  vm.daily = hobo.getDaily(vm.address);
  //  vm.monthly = hobo.getMonthly(vm.address);

  } // end buildingController() function
})(); // end encompassing function
