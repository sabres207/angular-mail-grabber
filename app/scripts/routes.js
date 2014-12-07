'use strict';

/**
 * @ngdoc overview
 * @name angularMailGrabberApp
 * @description
 * # angularMailGrabberApp
 *
 * Main module of the application.
 */
angular
    .module('angularMailGrabberApp').config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);