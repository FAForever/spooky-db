unitDb.controllers = {
    homeCtrl: ['$scope', 'data', function($scope, data) {
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

            var idx = data.contenders.indexOf(item.id);
            if (idx == -1)
                data.contenders.push(item.id);
            else
                data.contenders.splice(idx, 1);
        };
        $scope.strain = function(e) {
            return ($scope.factions.length == 0 || isInArray($scope.factions, e.faction))
                    && ($scope.kinds.length == 0 || isInArray($scope.kinds, e.classification))
                    && ($scope.tech.length == 0 || isInArray($scope.tech, e.tech));
        };

        data.items.success(function(d) {
            $scope.index = _.map(d, function(u) {
                return unitDb.UnitDecorator(u);
            });
        });
    }],

    compareCtrl: ['$scope', '$routeParams', 'data', function($scope, $routeParams, data) {
        ids = $routeParams.ids.split(',');

        data.items.success(function(d) {
            d = _.map(d, function(u) { return unitDb.UnitDecorator(u); });
            $scope.contenders = _.sortBy(
                _.filter(d, function(x) { return _.contains(ids, x.id); }), 
                function(x) { return ids.indexOf(x.id); }
            );
        });
    }]
};
