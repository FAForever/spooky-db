'use strict';

var unitDb = (function() {
    var start = function(appName, payload) {

            var module = init(appName, payload);
            angular.bootstrap(document, [appName]);

            return module;
        },
        init = function(appName, payload) {
            var app = angular.module(appName, ['ngRoute', 'ngSanitize', 'angular-underscore']);

            // routing
            app.config(['$routeProvider', function($routeProvider) {
                $routeProvider
                    .when('/', {
                        controller: 'homeCtrl',
                        templateUrl: 'views/home.html'
                    })
                    .when('/:ids', {
                        controller: 'compareCtrl',
                        templateUrl: 'views/compare.html'
                    })
                    .otherwise({
                        templateUrl: '404.html'
                    });
            }]);

            // services
            app.provider('data', unitDb.services.dataProvider);
            app.config(['dataProvider', function(dataProvider) {
                if (!payload) throw 'need unit data!';
                dataProvider.setIndex(payload);
            }]);

            // filters
            angular.forEach(unitDb.filters, function(v, k) { app.filter(k, v); });

            // directives
            angular.forEach(unitDb.directives, function(v, k) { app.directive(k, v); });

            // controllers
            angular.forEach(unitDb.controllers, function(v, k) { app.controller(k, v); });

            return app;
        };

    return {
        start: start
    };
})();
