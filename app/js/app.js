'use strict';

var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ngCookies']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/users', {
                templateUrl: 'views/partials/list-users.html',
                controller: 'ListUsersCtrl'
            })
            .when('/game/:id', {
                templateUrl: 'views/partials/current-game.html',
                controller: 'CurrentGameCtrl'
            })
            .when('/games', {
                templateUrl: 'views/partials/list-games.html',
                controller: 'ListGamesCtrl'
            })
            .when('/register', {
                templateUrl: 'views/partials/register.html',
                controller: 'SignUpCtrl'
            })
            .when('/creategame', {
                templateUrl: '../views/partials/create-game.html',
                controller: 'CreateGameCtrl'
            })
            .otherwise({ redirectTo: '/' });
    }])
    .value('toastr', toastr)
    .constant('baseServiceUrl', 'http://tictactoe-20.apphb.com');