var myApp = angular.module('app', ['ngRoute', 'ngRightClick'])
myApp.config(function($routeProvider){
    $routeProvider
    .when('/game', {
        templateUrl: 'partials/game.html',
        controller: 'gameController'
    })
    .otherwise({
        redirectTo: '/game'
    })
})