var app = angular.module('app', ['ngRoute']);

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

app.filter('colorize', function() {
    return function(text) {
        return angular.isNumber(text)
            ? 'asd'
            : text;
    };
})
app.filter('tech', function() {
    return function(text) {
        var dict = {RULEUTL_Basic: 'T1'};
        return dict[text] || 'T?';
    };
})

app.directive('ngCard', [function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'card.html',
        scope: {
            item: '=ngContent'
        }
    }
}]);

app.controller('HomeCtrl', ['$scope', 'data', function($scope, data) {
    $scope.factions = ['uef', 'cybran', 'aeon', 'seraphim'];

    data.success(function(d) {
        $scope.index = d;
    });
}]);