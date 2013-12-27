var unitDb = function() {
    var start = function(appName, payload) {

            var module = init(appName, payload);
            angular.bootstrap(document, [appName]);

            return module;
        },
        init = function(appName, payload) {
            var app = angular.module(appName, ['ngRoute', 'angular-underscore']);

            // routing
            app.config(['$routeProvider', function($routeProvider) {
                $routeProvider
                    .when('/', {
                        controller: 'homeCtrl',
                        templateUrl: 'home.html'
                    })
                    .when('/:ids', {
                        controller: 'compareCtrl',
                        templateUrl: 'compare.html'
                    })
                    .otherwise({
                        templateUrl: '404.html'
                    });
            }]);

            // services
            app.provider('data', unitDb.services.dataProvider);
            app.config(['dataProvider', function(dataProvider) {
                if (!payload) throw 'need unit data!';
                dataProvider.setIndex(payload);
            }]);

            // filters
            angular.forEach(unitDb.filters, function(v, k) { app.filter(k, v); })

            // directives
            angular.forEach(unitDb.directives, function(v, k) { app.directive(k, v); })

            // controllers
            angular.forEach(unitDb.controllers, function(v, k) { app.controller(k, v); })
        };

    return {
        start: start
    }
}();

// decorator to make the unit object a bit more usable
unitDb.UnitDecorator = function(blueprint) {
    var classification_lookup = {
            'RULEUC_Engineer': 'Build',
            'RULEUC_Commander': 'Build',
            'RULEUMT_Amphibious': 'Land',
            'RULEUC_MilitaryVehicle': 'Land',
            'RULEUC_MilitaryAircraft': 'Air',
            'RULEUC_MilitarySub': 'Naval',
            'RULEUC_MilitaryShip': 'Naval',
            'RULEUC_Weapon': 'Base',
            'RULEUC_Sensor': 'Base',
            'RULEUC_Factory': 'Base',
            'RULEUC_Resource': 'Base',
            'RULEUC_MiscSupport': 'Base',
            'RULEUC_CounterMeasure': 'Base'
        },
        tech_lookup = {
            'RULEUTL_Basic': 'T1',
            'RULEUTL_Advanced': 'T2',
            'RULEUTL_Secret': 'T3',
            'RULEUTL_Experimental': 'TX',
            'TECH1': 'T1',
            'TECH2': 'T2',
            'TECH3': 'T3',
            'EXPERIMENTAL': 'EXP',
        },
        getTech = function(bp) {
            var x = _.intersection(bp.Categories, _.keys(tech_lookup));
            return x.length == 1 ? tech_lookup[x[0]] : '';
        },
        fullName = function() {
            return (this.name ? this.name + ': ' : '') + (this.tech == 'EXP' ? '' : this.tech + ' ') + this.description;
        };
        self = {
            id: blueprint.Id,
            name: blueprint.General.UnitName,
            description: blueprint.Description,
            faction: blueprint.General.FactionName,
            classification: classification_lookup[blueprint.General.Classification],
            tech: getTech(blueprint),
            strategicIcon: blueprint.StrategicIconName,
            icon: blueprint.General.Icon || '',
            order: blueprint.BuildIconSortPriority || 1000,
            fullName: fullName
        };

    return _.extend(self, blueprint);
}

unitDb.GeneralPropertiesDecorator = function(blueprint) {



}