(function (angular) {
  'use strict'

  angular
    .module('app.routing', ['ui.router', 'home.controller', 'ngTemplates'])
    .config(['$stateProvider', '$urlRouterProvider', config]);

  function config($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'home/home.template.html',
      controller: 'HomeController',
      controllerAs: 'home'
    });

    $urlRouterProvider.otherwise('/home');
  }

})(angular);