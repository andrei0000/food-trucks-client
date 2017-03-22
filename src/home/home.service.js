(function (angular) {
  'use strict'

  angular
    .module('home.service', ['app.config'])
    .factory('FoodTrucksWebClient', [
      '$q', '$http', '$interpolate', 'AppConfig', FoodTrucksWebClient
    ]);

  function FoodTrucksWebClient($q, $http, $interpolate, AppConfig) {

    return {

      /**
       * @typedef TruckItem
       * @property {string} facilitytype - type of data item.
       * @property {string} fooditems - data description.
       * @property {string} latitude
       * @property {string} longitude
       */
      /**
       * Get food trucks data by latitude, longitude and range.
       * @param {number} latitude
       * @param {number} longitude
       * @param {number} range
       * @returns {Array<TruckItem>}
       */
      getFoodTracks: function (latitude, longitude, range) {
        var deferred = $q.defer(),
          exp = $interpolate('{{server}}/api/trucks?latitude={{latitude}}&longitude={{longitude}}&range={{range}}');

        $http.get(exp({
          server: AppConfig.SERVER_URL,
          latitude: latitude,
          longitude: longitude,
          range: range
        })).then(function (data) {
          deferred.resolve(data.data);
        }, function (error) {
          deferred.reject(error);
        });

        return deferred.promise;
      }
    };
  }

})(angular);