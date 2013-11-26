var app = angular.module('app', ['ngRoute', 'angular-underscore']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeCtrl',
            templateUrl: 'home.html'
        })
        .when('/compare', {
            controller: 'CompareCtrl',
            templateUrl: 'compare.html'
        })
        .when('/:id', {
            controller: 'DetailsCtrl',
            templateUrl: 'details.html'
        })
        .otherwise({
            templateUrl: '404.html'
        });
}]);

app.factory('data', ['$http', function($http) {
    return {
        items: $http.get('/data/index.json'),
        contenders: []
    };
}]);

app.filter('name', function() {
    return function(item) {
        if (!item) return;
        return (item.name ? item.name + ': ' : '') + item.tech + ' ' + item.description;
    }
});
app.filter('pic', function() {
    return function (item) {
        if (!item) return;
        return '/img/units/'+item.id+'.png';
    }
});
app.filter('icon', function() {
    return function (item) {
        if (!item) return;
        return '/img/strategic/' + item.faction + '_' + item.strategicIcon +'.png';
    }
});

app.directive('ngThumb', [function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'thumb.html',
        scope: {
            item: '=content',
            click: '&'
        }
    }
}]);
app.directive('ngUnit', [function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'unit.html',
        scope: {
            item: '=ngContent'
        }
    }
}]);

app.controller('HomeCtrl', ['$scope', 'data', function($scope, data) {
    $scope.factions = [];
    $scope.kinds = [];
    $scope.tech = [];

    $scope.contenders = data.contenders;

    var toggleArray = function(arr, el) {
        var idx = arr.indexOf(el);
        if (idx >= 0) {
            arr = arr.splice(idx, 1);
        } else {
            arr.push(el);
        }
    },
    isInArray = function(arr, el) {
        return arr.indexOf(el) >= 0;
    };

    $scope.toggleFaction = function(f) {
        toggleArray($scope.factions, f);
    };
    $scope.factionSelected = function(f) {
        return isInArray($scope.factions, f);
    }
    $scope.toggleKind = function(k) {
        toggleArray($scope.kinds, k);
    };
    $scope.kindSelected = function (k) {
        return isInArray($scope.kinds, k);
    };
    $scope.toggleTech = function(t) {
        toggleArray($scope.tech, t);
    };
    $scope.techSelected = function(t) {
        return isInArray($scope.tech, t);
    };
    $scope.compare = function(item) {
        item.selected = !item.selected;

        var idx = data.contenders.indexOf(item);
        if (idx == -1)
            data.contenders.push(item);
        else
            data.contenders.splice(idx, 1);
    };
    $scope.strain = function(e) {
        return ($scope.factions.length == 0 || isInArray($scope.factions, e.faction))
                && ($scope.kinds.length == 0 || isInArray($scope.kinds, e.classification))
                && ($scope.tech.length == 0 || isInArray($scope.tech, e.tech));
    };

    data.items.success(function(d) {
        $scope.index = d;
    });
}]);
app.controller('DetailsCtrl', ['$scope', '$routeParams', 'data', function($scope, $routeParams, data) {
    data.items.success(function(d) {
        $scope.unit = _.where(d, { id: $routeParams.id })[0];
    });
}]);
app.controller('CompareCtrl', ['$scope', 'data', function($scope, data) {

    $scope.contenders = data.contenders;

}]);
