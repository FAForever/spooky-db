unitDb.directives = {
    thumb: [function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'thumb.html',
            scope: {
                item: '=content',
                click: '&'
            }
        }
    }],

    unit: [function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'unit.html',
            scope: {
                item: '=content'
            }
        }
    }]
};
