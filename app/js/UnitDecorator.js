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
        factionIdLookup = {
            'UEF': 0,
            'Cybran': 1,
            'Aeon': 2,
            'Seraphim': 3,
        },
        gdiClassificationBestOfItsClass = {
            'XSL0301': [3, 'Best in DPS per Mass'],
            'UAL0301': [2, 'TODO(notbest) in DPS per Mass'],
            'URL0301': [1, 'TODO(notbest) in DPS per Mass'],
        },
        gdiClassificationLookup = {
            'UEL0401': 'Direct Fire Experimental',
            'UAL0401': 'Direct Fire Experimental',
            'XSL0401': 'Direct Fire Experimental',
            'URL0402': 'Direct Fire Experimental',
            'XRL0403': 'Direct Fire Experimental',
            'URA0401': 'Air Experimental',
            'XRL0401': 'Air Experimental',
            'UAA0310': 'Air Experimental',
            'XSA0402': 'Air Experimental',
            'UES0401': 'Naval Experimental',
            'UAS0401': 'Naval Experimental',
            'UEB2401': 'Indirect Fire Experimental',
            'URL0401': 'Indirect Fire Experimental',
            'XSB2401': 'Indirect Fire Experimental',
            'XAB1401': 'Other Experimental',
            'XEA0002': 'Other Experimental',
            'XEB2402': 'Other Experimental',
        },
        gdiBaseClassificationLookupAndOrder = {
            'Construction - Buildpower': ['T1 Engineer','T2 Engineer','T2 Field Engineer','T2 Engineering Station','T3 Engineer','T3 Engineering Station','T3 Support Armored Command Unit','Armored Command Unit','T1 Engineering Drone'],
            'Experimental' : ['Direct Fire Experimental', 'Air Experimental', 'Naval Experimental', 'Indirect Fire Experimental', 'Other Experimental'],
        },
        gdiClassificationLookupFunc = function( bp ) {
            var gdiClassById = gdiClassificationLookup[bp.Id];
            if ( gdiClassById ) return gdiClassById;
            var tech = getTech(bp);
            return (tech === 'EXP' ? 'T4 ' : ( tech === '' ? '' : tech + ' ' )) + bp.Description;
        },
        gdiBaseClassificationLookupAndOrderFunc = function( bp ) {
            var gdiClassification = gdiClassificationLookupFunc( bp );
            var outerOrder = 0;
            for ( var baseClass in gdiBaseClassificationLookupAndOrder ) {
                outerOrder++;
                var containedClasses = gdiBaseClassificationLookupAndOrder[baseClass];
                var indexInContainedClasses = containedClasses.indexOf( gdiClassification );
                if ( indexInContainedClasses > -1 )
                    return [baseClass,outerOrder,indexInContainedClasses];
            }
            return [ 'Unknown', 0, 0 ];
        },
        gdiBaseClassificationLookupFunc = function( bp ) {
            var ret = gdiBaseClassificationLookupAndOrderFunc( bp );
            return ret[0];
        },
        gdiOrderFunc = function( bp ) {
            var ret = gdiBaseClassificationLookupAndOrderFunc( bp );
            return ret[1]*100+ret[2];
        },
        getTech = function(bp) {
            var x = _.intersection(bp.Categories, _.keys(techLookup));
            return x.length === 1 ? techLookup[x[0]] : '';
        },
        fullName = function(u) {
            return (u.name ? u.name + ': ' : '') + (u.tech === 'EXP' ? '' : u.tech + ' ') + u.description;
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
            factionId: factionIdLookup[blueprint.General.FactionName],
            classification: classificationLookup[blueprint.General.Classification],
            gdiClassification: gdiClassificationLookupFunc(blueprint),
            gdiBaseClassification: gdiBaseClassificationLookupFunc(blueprint),
            gdiOrder: gdiOrderFunc(blueprint),
            tech: getTech(blueprint),
            strategicIcon: blueprint.StrategicIconName,
            icon: blueprint.General.Icon || '',
            order: blueprint.BuildIconSortPriority || 1000,
            fireCycle: fireCycle
        };

        self.fullName = fullName(self);

        // additional stats for weapons
        for(var i in blueprint.Weapon) {
            _.extend(blueprint.Weapon[i], {
                dps: getDps(blueprint.Weapon[i])
            });
        }

    return _.extend(self, blueprint);
};
