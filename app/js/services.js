'use strict';
unitDb.services = {
    dataProvider: function() {
        var unitIndex = [];
        var contenders = [];
        var version = null;

        this.setIndex = function(index) {
            unitIndex = index.units;
            version = index.version;
        };

        this.$get = ['$location', function($location) {

            return {
                items: _.map(unitIndex, function(u) { return unitDb.UnitDecorator(u); }),
                selectedFilterFractions: [],
                selectedFilterKinds: [],
                selectedFilterTech: [],
                contenders: contenders,
                version: version
            };
        }];
    }
};
