'use strict';

// Declare app level module which depends on filters, and services
angular.module('rawApp', ['ui'])
	.config(function ($routeProvider) {
	    $routeProvider
	      .when('/', {
	        templateUrl: 'views/main.html',
	        controller: 'mainCtrl'
	      })
	      .otherwise({
	        redirectTo: '/'
	      });
	  });