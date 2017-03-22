(function (angular) {
  'use strict'

  angular
    .module('home.controller', ['home.service', 'map.service', 'app.config'])
    .controller('HomeController', ['FoodTrucksWebClient', 'GoogleMapService', 'AppConfig', HomeController]);

  function HomeController(FoodTrucksWebClient, GoogleMapService, AppConfig) {
    var vm = this;

    vm.max = 150;

    GoogleMapService.initialize('map-container',
      AppConfig.MAP_ZOOM,
      AppConfig.DEFAULT_LATITUDE,
      AppConfig.DEFAULT_LONGITUDE,
      onMapClick);

    function onMapClick(lat, lon) {
      GoogleMapService.clear();

      FoodTrucksWebClient.getFoodTracks(lat, lon, vm.max)
        .then(function (data) {
          GoogleMapService.addPoints(data);
        }).catch(function (error) {
          console.log(error);
        })
    }

  }

})(angular);