'use strict';

var unitDb = (function() {
    var start = function(appName, payload) {

            var module = init(appName, payload);
            angular.bootstrap(document, [appName]);

            return module;
        },
        init = function(appName, payload) {
            var app = angular.module(appName, ['ngRoute', 'ngSanitize', 'angular-underscore']);

            // routing
            app.config(['$routeProvider', function($routeProvider) {
                $routeProvider
                    .when('/', {
                        controller: 'homeCtrl',
                        templateUrl: 'views/home.html'
                    })
                    .when('/:ids', {
                        controller: 'compareCtrl',
                        templateUrl: 'views/compare.html'
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
            angular.forEach(unitDb.filters, function(v, k) { app.filter(k, v); });

            // directives
            angular.forEach(unitDb.directives, function(v, k) { app.directive(k, v); });

            // controllers
            angular.forEach(unitDb.controllers, function(v, k) { app.controller(k, v); });

            return app;
        };

    return {
        start: start
    };
})();

// decorator to make the unit object a bit more usable
unitDb.UnitDecorator = function(blueprint) {
    var classificationLookup = {
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
        techLookup = {
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
            var x = _.intersection(bp.Categories, _.keys(techLookup));
            return x.length === 1 ? techLookup[x[0]] : '';
        },
        fullName = function() {
            return (this.name ? this.name + ': ' : '') + (this.tech === 'EXP' ? '' : this.tech + ' ') + this.description;
        },
        weaponStats = function(weapon) {
            // ?? MuzzleSalvoSize, MuzzleSalvoDelay
            var shots = weapon.ManualFire ? 1 : weapon.ProjectilesPerOnFire, // number of projectiles
                   rate = weapon.ProjectilesPerOnFire ? weapon.RateOfFire : 1 / weapon.RateOfFire, // tml/nuke launch weapons seem to be mixed up
                   delay = weapon.RackSalvoChargeTime,
                   cycle = 1 / rate + delay, // how long it takes between shots
                   damage = weapon.Damage;

            return { shots: shots, cycle: cycle, damage: damage };
        },
        fireCycle = function(weapon) {
            var stats = weaponStats(weapon);
            return stats.shots + ' shot' + (stats.shots > 1 ? 's' : '') + ' / ' + ( stats.cycle === 1 ? '' : Math.round(stats.cycle * 10)/10 ) + ' sec';
        },
        getDps = function(weapon) {
            var stats = weaponStats(weapon);
            return (stats.damage * stats.shots) / stats.cycle;
        };

        var self = {
            id: blueprint.Id,
            name: blueprint.General.UnitName,
            description: blueprint.Description,
            faction: blueprint.General.FactionName,
            classification: classificationLookup[blueprint.General.Classification],
            tech: getTech(blueprint),
            strategicIcon: blueprint.StrategicIconName,
            icon: blueprint.General.Icon || '',
            order: blueprint.BuildIconSortPriority || 1000,
            fullName: fullName,
            fireCycle: fireCycle
        };

        // additional stats for weapons
        for(var i in blueprint.Weapon) {
            _.extend(blueprint.Weapon[i], {
                dps: getDps(blueprint.Weapon[i])
            });
        }

    return _.extend(self, blueprint);
};