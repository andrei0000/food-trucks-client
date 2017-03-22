(function (angular) {
  'use strict'

  angular
    .module('app.config', [])
    .constant('AppConfig', {
      SERVER_URL: 'http://127.0.0.1:9000',
      DEFAULT_LATITUDE: 37.75962101544518,
      DEFAULT_LONGITUDE: -122.42932319641113,
      MAP_ZOOM: 12
    })

})(angular);