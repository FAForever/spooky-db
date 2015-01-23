'use strict';
unitDb = unitDb || {};

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
            var shots = weapon.ManualFire ? 1 : weapon.MuzzleSalvoSize, // number of projectiles
                   rate = weapon.RateOfFire,
                   delay = weapon.RackSalvoChargeTime||0 + weapon.RackSalvoReloadTime||0,
                   cycle = 1 / rate + delay, // how long it takes between shots
                   damage = weapon.Damage;

            return { shots: shots, cycle: cycle, damage: damage };
        },
        fireCycle = function(weapon) {
            var stats = weaponStats(weapon);
            return stats.shots + ' shot' + (stats.shots > 1 ? 's' : '') + ' / ' + ( stats.cycle === 1 ? '' : Math.round(stats.cycle * 10)/10 ) + ' sec';
        },
        getDps = function(weapon) {
            return unitDb.dpsCalculator.dps(weapon);
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
