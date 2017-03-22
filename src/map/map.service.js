(function (angular, google) {
  'use strict'

  angular
    .module('map.service', [])
    .factory('GoogleMapService', [GoogleMapService]);

  /**
   * Google maps service. 
   * Creates map component and allows to use google map api.
   */
  function GoogleMapService() {
    var map,
      marker,
      markers = [];

    /**
     * Create google map instance.
     * 
     * @param {string} id 
     * @param {number} zoom 
     * @param {google.maps.LatLng} latlng 
     */
    function createMap(id, zoom, latlng) {
      return new google.maps.Map(document.getElementById(id), {
        zoom: zoom,
        center: latlng
      });
    }

    /**
     * Create orphan marker.
     * 
     * @param {google.maps.LatLng} latlng 
     */
    function createMarker(latlng) {
      return new google.maps.Marker({
        position: latlng
      });
    }

    /**
     * Create marker info component.
     * 
     * @param {string} text 
     */
    function createInfo(text) {
      return new google.maps.InfoWindow({
        content: '<div><p>' + text + '</p></div>'
      });
    }

    /**
     * Create mam click listener.
     * 
     * @param {function} onClick 
     */
    function createClickListener(onClick) {
      return function (event) {
        setMainMarker(event.latLng);
        if (onClick != null && typeof onClick === 'function') {
          onClick(event.latLng.lat(), event.latLng.lng());
        }
      }
    }

    /**
     * Create and add to the map center marker.
     * 
     * @param {google.maps.LatLng} latLng 
     */
    function setMainMarker(latLng) {
      if (marker) {
        marker.setMap(null);
      }

      if (map) {
        marker = createMarker(latLng);
        marker.setMap(map);
      }
    }

    return {

      /**
       * Initialize map component.
       * 
       * @param {number} id identificator of the html component.
       * @param {number} zoom 
       * @param {number} latitude 
       * @param {number} longitude 
       * @param {function} onClick map click listener.
       */
      initialize: function (id, zoom, latitude, longitude, onClick) {
        if (!map) {
          map = createMap(id, zoom, new google.maps.LatLng(latitude, longitude));
          google.maps.event.addListener(map, 'click', createClickListener(onClick));
        }
      },

      /**
       * Create and add marker to the map, for which specified latitude, longitude and description.
       * 
       * @param {number} latitude 
       * @param {number} longitude 
       * @param {string} description 
       */
      addPoint: function (latitude, longitude, description) {
        if (!latitude || !longitude) return;

        var marker = createMarker(new google.maps.LatLng(latitude, longitude)),
          info;

        marker.setMap(map);

        if (description) {
          info = createInfo(description);
          marker.addListener('click', function () {
            info.open(map, marker);
          });
        }

        markers.push(marker);
      },

      /**
       * @typedef TruckItem
       * @property {string} facilitytype - type of data item.
       * @property {string} fooditems - data description.
       * @property {string} latitude
       * @property {string} longitude
       */
      /**
       * Create and add all markers to the map, for which specified points.
       * See {@link GoogleMapService#addPoint(number, number, string)}
       * 
       * @param {Array<TruckItem>} points
       */
      addPoints: function (points) {
        if (!angular.isArray(points)) return;

        var self = this;
        points.forEach(function (item) {
          self.addPoint(item.latitude, item.longitude, item.fooditems);
        });
      },

      /**
       * Remove all markers (except center markers).
       */
      clear: function () {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }

        markers = [];
      }
    };

  }

})(angular, google);