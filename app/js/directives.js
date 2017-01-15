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
    }],

    filters: [function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/filters.html'
        };
    }],

    appFooter: [function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/app-footer.html'
        };
    }],
};
