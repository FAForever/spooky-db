'use strict';
unitDb.services = {
    dataProvider: function() {
        var unitIndex = [];
        var contenders = [];

        this.setIndex = function(index) {
            unitIndex = index;
        };

        this.$get = ['$hotkey', '$location', function($hotkey, $location) {
            $hotkey.bind('Ctrl + C', function() {
                $location.path('/' + contenders.join(','));
            });

            return {
                items: _.map(unitIndex, function(u) { return unitDb.UnitDecorator(u); }),
                selectedFilterFractions: [],
                selectedFilterKinds: [],
                selectedFilterTech: [],
                contenders: contenders,
            };
        }];
    }
};
