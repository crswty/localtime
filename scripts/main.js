"use strict";!function(){var t=function(t,o){this.longitude=t,this.momentProvider=o};t.prototype.offsetFromUTC=function(){var t=4;return t*this.longitude},t.prototype.calculate=function(){var t=this.momentProvider(),o=this.offsetFromUTC();return t.utc().add(o,"minute")},window.LocalMeanTime=t}(),function(){var t=function(t){this.targetElement=t};t.prototype.determineUsersLocation=function(t,o){navigator.geolocation?navigator.geolocation.getCurrentPosition(t,function(){o(!0)}):o(!1)},window.Geolocator=t}(),function(){var t=function(t){this.targetElement=t};t.prototype.showError=function(t){var o=new google.maps.InfoWindow({map:this.map});o.setPosition(this.map.getCenter()),o.setContent(t)},t.prototype.setMarker=function(t,o){var n=new google.maps.Marker({position:t,map:this.map,draggable:!0});n.addListener("dragend",function(t){o({lat:t.latLng.lat(),lng:t.latLng.lng()})})},t.prototype.create=function(){this.map=new google.maps.Map(this.targetElement,{center:{lat:0,lng:0},zoom:8,scrollwheel:!0,disableDefaultUI:!0,zoomControl:!0})},t.prototype.navigateToPosition=function(t){this.map.setCenter(t)},window.MapWrapper=t}(),function(){var t=function(){};t.prototype.loadPage=function(){this.map=new MapWrapper(document.getElementById("map")),this.map.create();var t=new Geolocator,o=function(){this.setPosition({lat:51.478,lng:0})}.bind(this),n=function(t){this.setPosition({lat:t.coords.latitude,lng:t.coords.longitude})}.bind(this);t.determineUsersLocation(n,o)},t.prototype.setPosition=function(t){this.map.navigateToPosition(t),this.map.setMarker(t,function(t){this.updatePositionForTime(t)}.bind(this)),this.updatePositionForTime(t)},t.prototype.updatePositionForTime=function(t){void 0!==this.interval&&clearInterval(this.interval);var o=document.getElementById("localMeanTime"),n=t.lng,e=new LocalMeanTime(n,function(){return moment()});this.interval=setInterval(function(){var t=e.calculate(),n=t.format("HH:mm:ss");o.innerText=n},500)},window.initMap=function(){(new t).loadPage()}}();