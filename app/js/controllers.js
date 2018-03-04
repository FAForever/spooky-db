'use strict';
unitDb.controllers = {
    homeCtrl: ['$scope', '$window', '$location', '$hotkey', 'data', function($scope, $window, $location, $hotkey, data) {
        $scope.factions = [];
        $scope.kinds = [];
        $scope.tech = [];

        $scope.index = data.items;
        $scope.version = data.version;
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

            // clear the array without loosing reference
            $scope.contenders.length = 0;
        };
        $scope.strain = function(e) {
            return ($scope.factions.length === 0 || isInArray($scope.factions, e.faction)) &&
                       ($scope.kinds.length === 0 || isInArray($scope.kinds, e.classification)) &&
                       ($scope.tech.length === 0 || isInArray($scope.tech, e.tech));
        };

        var lastClickTime = 0;
        var lastClickUnit = null;
        var maxDoubleClickDelay = 500; //in miliseconds

        $scope.unitClick = function(unit, event) {
            //What happens when the user click on a unit thumbnail in the home
            //view (the click actually happens in the thumb view)

            if (event.ctrlKey) {//The control key is pressed: we open a new page
                //with only the unit
                $window.open('#/' + unit.id, '_blank');

            } else {
                var newTime = (new Date()).getTime();

                if ((lastClickUnit === unit) && //it a double click: we go to
                        (newTime - lastClickTime) < maxDoubleClickDelay) { //compare view
                    if (!unit.selected)
                        $scope.compare(unit);

                    var newURL = '/' + $scope.contenders.join(',');
                    $scope.$apply($location.path( newURL ));

                } else {
                    lastClickUnit = unit;
                    lastClickTime = newTime;
                    $scope.compare(unit);
                }
            }
        };

        $hotkey.bind('Ctrl + X', $scope.clear);
        $hotkey.bind('Ctrl + Z', function() {
            angular.element('#filter').focus();
        });
    }],

    gdiCtrl: ['$scope', '$window', '$location', '$hotkey', 'data', function($scope, $window, $location, $hotkey, data) {
        $scope.compact = false || (localStorage.getItem('compact') === 'true');

        $scope.factions = data.selectedFilterFractions;
        $scope.kinds = data.selectedFilterKinds;
        $scope.tech = data.selectedFilterTech;

        $scope.index = data.items;
        $scope.version = data.version;
        $scope.visibleIndex = data.visibleIndex;
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
                                     function(x) { return x.factionId + x.id.substr(-4); });
            var newStateIsSelected = true;
            if ( classItems.length > 0 ) {
                newStateIsSelected = !classItems[0].selected;
            }
            for (var c in classItems)
                $scope.setBpSelected( classItems[c], newStateIsSelected );
        };
        $scope.clear = function() {
            for (var c in $scope.index)
                if ($scope.index[c].selected)
                    $scope.index[c].selected = false;

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
        $scope.compare = function(item) {
            item.selected = !item.selected;

            var idx = $scope.contenders.indexOf(item.id);
            if (idx === -1)
                $scope.contenders.push(item.id);
            else
                $scope.contenders.splice(idx, 1);
        };

        var lastClickTime = 0;
        var lastClickUnit = null;
        var maxDoubleClickDelay = 500; //in miliseconds

        $scope.unitClick = function(unit, event) {
            //What happens when the user click on a unit thumbnail in the home
            //view (the click actually happens in the thumb view)

            if (event.ctrlKey) {//The control key is pressed: we open a new page
                //with only the unit
                $window.open('#/' + unit.id, '_blank');

            } else {
                var newTime = (new Date()).getTime();

                if ((lastClickUnit === unit) && //it a double click: we go to
                    (newTime - lastClickTime) < maxDoubleClickDelay) { //compare view
                    if (!unit.selected)
                        $scope.compare(unit);

                    var newURL = '/' + $scope.contenders.join(',');
                    $scope.$apply($location.path( newURL ));

                } else {
                    lastClickUnit = unit;
                    lastClickTime = newTime;
                    $scope.compare(unit);
                }
            }
        };

        $scope.toggleCompact = function() {
            $scope.compact = !$scope.compact;
            localStorage.setItem('compact', $scope.compact);
        };

        $hotkey.bind('Ctrl + X', $scope.clear);
        $hotkey.bind('Ctrl + Z', function() {
            angular.element('#filter').focus();
        });
    }],

    compareCtrl: ['$scope', '$routeParams', 'data', function($scope, $routeParams, data) {
        $scope.layoutClass = localStorage.getItem('compareLayout');

        var ids = $routeParams.ids.split(',');
        $scope.contenders = _.sortBy(_.filter(data.items, function(x) { return _.contains(ids, x.id); }),
                                    function(x) { return ids.indexOf(x.id); });

        $scope.layout = function(className) {
            $scope.layoutClass = className;
            localStorage.setItem('compareLayout', className);
        };
    }]
};
