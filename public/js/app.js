
'use strict';

var appChat = angular.module('appChat', ['ngRoute', 'ui.bootstrap','luegg.directives', 'appServices', 'appDirectives', 'appControllers']);

appChat.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/chatroomView.html'
        })
        .when('/video-chat', {
            templateUrl: '/views/videoChatView.html',
            controller: 'VideoCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
}]);