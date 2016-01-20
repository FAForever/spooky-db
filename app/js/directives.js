'use strict';
unitDb.directives = {
    thumb: [function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/thumb.html',
        };
    }],

    unit: [function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/unit.html',
            scope: {
                item: '=content'
            }
        };
    }]
};
