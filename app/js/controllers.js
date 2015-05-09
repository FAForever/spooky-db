'use strict';
unitDb.controllers = {
    homeCtrl: ['$scope', 'data', function($scope, data) {
        $scope.factions = [];
        $scope.kinds = [];
        $scope.tech = [];

        $scope.index = data.items;
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
        };
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

            var idx = $scope.contenders.indexOf(item.id);
            if (idx === -1)
                $scope.contenders.push(item.id);
            else
                $scope.contenders.splice(idx, 1);
        };
        $scope.clear = function() {
            for (var c in $scope.index)
                if ($scope.index[c].selected)
                    $scope.index[c].selected = false;

            $scope.contenders = [];
        };
        $scope.strain = function(e) {
            return ($scope.factions.length === 0 || isInArray($scope.factions, e.faction)) &&
                       ($scope.kinds.length === 0 || isInArray($scope.kinds, e.classification)) &&
                       ($scope.tech.length === 0 || isInArray($scope.tech, e.tech));
        };
    }],

    gdiCtrl: ['$scope', 'data', function($scope, data) {
        $scope.factions = data.selectedFilterFractions;
        $scope.kinds = data.selectedFilterKinds;
        $scope.tech = data.selectedFilterTech;

        $scope.index = data.items;
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
        };
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
        $scope.toggleBpSelected = function(item) {
            item.selected = !item.selected;

            var idx = $scope.contenders.indexOf(item.id);
            if (idx === -1)
                $scope.contenders.push(item.id);
            else
                $scope.contenders.splice(idx, 1);
        };
        $scope.setBpSelected = function(item,selected) {
            item.selected = selected;

            var idx = $scope.contenders.indexOf(item.id);
            if (idx === -1 && selected )
                $scope.contenders.push(item.id);
            else if ( !selected )
                $scope.contenders.splice(idx, 1);
        };
        $scope.toggleBpSelectedByGdiClass = function(gdiClass) {
            var classItems = _.sortBy(
                                        _.filter($scope.index, 
                                                 function(e) { return gdiClass === e.gdiClassification && $scope.strain(e); }),
                                     function(x) { return x.factionId; });
            var newStateIsSelected = true;
            if ( classItems.length > 0 ) {
                newStateIsSelected = !classItems[0].selected;
            }
            for (var c in classItems)
                $scope.setBpSelected( classItems[c], newStateIsSelected );
        };
        $scope.clearSelectedBps = function() {
            for (var c in $scope.index)
                if ($scope.index[c].selected)
                    $scope.index[c].selected = false;

            //$scope.contenders = [];
            $scope.contenders.splice($scope.contenders.len);
        };
        $scope.strain = function(e) {
            return ($scope.factions.length === 0 || isInArray($scope.factions, e.faction)) &&
                       ($scope.kinds.length === 0 || isInArray($scope.kinds, e.classification)) &&
                       ($scope.tech.length === 0 || isInArray($scope.tech, e.tech));
        };
        $scope.uniqGdiClass = function(e,idx) {
            if ( idx === 0 || e.gdiClassification !== $scope.lastDisplayedGdiClassification ) {
                $scope.lastDisplayedGdiClassification = e.gdiClassification;
                return e.gdiClassification;
            }
        };
        $scope.uniqGdiBaseClass = function(e,idx) {
            if ( idx === 0 || e.gdiBaseClassification !== $scope.lastDisplayedGdiBaseClassification ) {
                $scope.lastDisplayedGdiBaseClassification = e.gdiBaseClassification;
                return e.gdiBaseClassification;
            }
        };
    }],

    compareCtrl: ['$scope', '$routeParams', 'data', function($scope, $routeParams, data) {
        var ids = $routeParams.ids.split(',');
        $scope.contenders = _.sortBy(_.filter(data.items, function(x) { return _.contains(ids, x.id); }),
                                    function(x) { return ids.indexOf(x.id); });
    }]
};
