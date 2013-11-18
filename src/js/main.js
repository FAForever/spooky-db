var app = angular.module('app', ['ngRoute', 'angular-underscore']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeCtrl',
            templateUrl: 'home.html'
        })
        .otherwise({
            templateUrl: '404.html'
        });
}]);

app.factory('data', ['$http', function($http) {
    return $http.get('/data/index.json');
}]);

app.filter('tech', function() {
    return function(text) {
        var dict = {
            RULEUTL_Basic: 'T1'
        };

        return dict[text] || 'T?';
    };
})

app.directive('ngCard', [function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'thumb.html',
        scope: {
            item: '=ngContent'
        }
    }
}]);

app.controller('HomeCtrl', ['$scope', 'data', function($scope, data) {

    data.success(function(d) {
        $scope.index = d;
    });

}]);
