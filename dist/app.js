"use strict";angular.module("ngTemplates",[]).run(["$templateCache",function(e){e.put("home/home.template.html",'<div class="row"><div class="col-md-12"><p>1. Define desired search area in miles:</p></div></div><div class="row"><div class="col-md-12"><rzslider rz-slider-model="home.max"></rzslider></div></div><div class="row"><div class="col-md-12"><p>2. Define a desired location by clicking on a map. Food trucks positions matching the specified criteria will be displayed on a map.</p><p>3. In order to see an additional information about the specific truck (truck type and food items it delivers), click on a desired truck marker.</p></div></div><div class="row"><div class="col-md-12"><div id="map-container" style="min-height: 400px"></div></div></div>')}]),function(e){e.module("app.config",[]).constant("AppConfig",{SERVER_URL:"http://127.0.0.1:9000",DEFAULT_LATITUDE:37.75962101544518,DEFAULT_LONGITUDE:-122.42932319641113,MAP_ZOOM:12})}(angular),function(e){e.module("app.module",["app.routing","rzModule"])}(angular),function(e){function n(e,n){e.state("home",{url:"/home",templateUrl:"home/home.template.html",controller:"HomeController",controllerAs:"home"}),n.otherwise("/home")}e.module("app.routing",["ui.router","home.controller","ngTemplates"]).config(["$stateProvider","$urlRouterProvider",n])}(angular),function(e){function n(e,n,o){function t(o,t){n.clear(),e.getFoodTracks(o,t,i.max).then(function(e){n.addPoints(e)}).catch(function(e){console.log(e)})}var i=this;i.max=150,n.initialize("map-container",o.MAP_ZOOM,o.DEFAULT_LATITUDE,o.DEFAULT_LONGITUDE,t)}e.module("home.controller",["home.service","map.service","app.config"]).controller("HomeController",["FoodTrucksWebClient","GoogleMapService","AppConfig",n])}(angular),function(e){function n(e,n,o,t){return{getFoodTracks:function(i,r,a){var l=e.defer(),c=o("{{server}}/api/trucks?latitude={{latitude}}&longitude={{longitude}}&range={{range}}");return n.get(c({server:t.SERVER_URL,latitude:i,longitude:r,range:a})).then(function(e){l.resolve(e.data)},function(e){l.reject(e)}),l.promise}}}e.module("home.service",["app.config"]).factory("FoodTrucksWebClient",["$q","$http","$interpolate","AppConfig",n])}(angular),function(e,n){function o(){function o(e,o,t){return new n.maps.Map(document.getElementById(e),{zoom:o,center:t})}function t(e){return new n.maps.Marker({position:e})}function i(e){return new n.maps.InfoWindow({content:"<div><p>"+e+"</p></div>"})}function r(e){return function(n){a(n.latLng),null!=e&&"function"==typeof e&&e(n.latLng.lat(),n.latLng.lng())}}function a(e){c&&c.setMap(null),l&&(c=t(e),c.setMap(l))}var l,c,d=[];return{initialize:function(e,t,i,a,c){l||(l=o(e,t,new n.maps.LatLng(i,a)),n.maps.event.addListener(l,"click",r(c)))},addPoint:function(e,o,r){if(e&&o){var a,c=t(new n.maps.LatLng(e,o));c.setMap(l),r&&(a=i(r),c.addListener("click",function(){a.open(l,c)})),d.push(c)}},addPoints:function(n){if(e.isArray(n)){var o=this;n.forEach(function(e){o.addPoint(e.latitude,e.longitude,e.fooditems)})}},clear:function(){for(var e=0;e<d.length;e++)d[e].setMap(null);d=[]}}}e.module("map.service",[]).factory("GoogleMapService",[o])}(angular,google);