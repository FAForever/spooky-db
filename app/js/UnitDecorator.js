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
            // 'RULEUTL_Basic': 'T1',
            // 'RULEUTL_Advanced': 'T2',
            // 'RULEUTL_Secret': 'T3',
            // 'RULEUTL_Experimental': 'EXP',
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
            'UEA0003': 'ACU Engineering Drone',
            'UEL0201': 'T1 Bot/Tank',
            'URL0107': 'T1 Bot/Tank',
            'UAL0201': 'T1 Bot/Tank',
            'XSL0201': 'T1 Bot/Tank',
            'XSL0101': 'T1 Land Scout',
            'XSL0202': 'T2 Bot',
            'DRL0204': 'T2 Bot',
            'DEL0204': 'T2 Bot',
            'UEL0203': 'T2 Amphibious/Hover Tank',
            'URL0203': 'T2 Amphibious/Hover Tank',
            'XAL0203': 'T2 Amphibious/Hover Tank',
            'XSL0203': 'T2 Amphibious/Hover Tank',
            'XEL0305': 'T3 Main Assault Bot/Tank',
            'XRL0305': 'T3 Main Assault Bot/Tank',
            'UAL0303': 'T3 Main Assault Bot/Tank',
            'XSL0303': 'T3 Main Assault Bot/Tank',
            'UEL0303': 'T3 Assault Bot',
            'URL0303': 'T3 Assault Bot',
            'UEL0104': 'T1 Mobile Anti-Air',
            'URL0104': 'T1 Mobile Anti-Air',
            'UAL0104': 'T1 Mobile Anti-Air',
            'XSL0104': 'T1 Mobile Anti-Air',
            'XSB2104': 'T1 Anti-Air Turret',
            'URL0205': 'T2 Mobile Anti-Air',
            'UAL0205': 'T2 Mobile Anti-Air',
            'UEL0205': 'T2 Mobile Anti-Air',
            'XSL0205': 'T2 Mobile Anti-Air',
            'DELK002': 'T3 Mobile Anti-Air',
            'DSLK004': 'T3 Mobile Anti-Air',
            'DRLK001': 'T3 Mobile Anti-Air',
            'DALK003': 'T3 Mobile Anti-Air',
            'UAS0102': 'T1 Anti-Air Boat',
            'XRS0204': 'T2 Submarine',
            'XAS0204': 'T2 Submarine',
            'XSB5202': 'T2 Air Staging Facility',
            'URA0303': 'T3 Air-Superiority Fighter',
            'XAA0305': 'T3 Anti-Air Gunship',
            'XSB2304': 'T3 Anti-Air SAM Launcher',
            'XSB3104': 'T3 Omni Sensor Array',
        },
        gdiBaseClassificationLookupAndOrder = {
            'Construction - Buildpower': ['T1 Engineer','T2 Engineer','T2 Field Engineer','T2 Engineering Station','T1 Engineering Drone','T3 Engineer','T3 Engineering Station','T3 Support Armored Command Unit','Armored Command Unit','ACU Engineering Drone'],

            'Land': ['T1 Bot/Tank','T1 Light Assault Bot','T1 Mobile Light Artillery','T1 Mobile Anti-Air','T1 Land Scout','T2 Heavy Tank','T2 Amphibious/Hover Tank','T2 Bot','T2 Mobile Missile Launcher','T2 Mobile Anti-Air','T2 Mobile Shield Generator','T2 Mobile Stealth Field System','T2 Mobile Bomb','T2 Crab Egg (Flak)','T3 Main Assault Bot/Tank','T3 Assault Bot','T3 Sniper Bot','T3 Mobile Heavy Artillery','T3 Mobile Missile Platform','T3 Mobile Anti-Air','T3 Mobile Shield Generator','T3 Shield Disruptor','T3 Crab Egg (Engineer)','T3 Crab Egg (Brick)','T3 Crab Egg (Artillery)'],

            'Air': ['T1 Interceptor','T1 Attack Bomber','T1 Light Gunship','T1 Air Scout','T1 Light Air Transport','T2 Combat Fighter','T2 Fighter/Bomber','T2 Gunship','T2 Torpedo Bomber','T2 Guided Missile','T2 Air Transport','T3 Air-Superiority Fighter','T3 Strategic Bomber','T3 Heavy Gunship','T3 Anti-Air Gunship','T3 Torpedo Bomber','T3 Spy Plane','T3 Heavy Air Transport'],

            'Naval': ['T1 Attack Submarine','T1 Frigate','T1 Anti-Air Boat','T2 Submarine','T2 Destroyer','T2 Cruiser','T2 Torpedo Boat','T2 Shield Boat','T2 Counter-Intelligence Boat','T3 Submarine Hunter','T3 Battleship','T3 Strategic Missile Submarine','T3 Aircraft Carrier','T3 Battlecruiser','T3 Missile Ship'],

            'Experimental' : ['Direct Fire Experimental', 'Air Experimental', 'Naval Experimental', 'Indirect Fire Experimental', 'Other Experimental'],

            'Structures - Weapons': ['T1 Point Defense','T1 Anti-Air Turret','T1 Torpedo Launcher','T2 Point Defense','T2 Anti-Air Flak Artillery','T2 Torpedo Launcher','T2 Artillery Installation','T2 Tactical Missile Launcher','T2 Tactical Missile Defense','T3 Heavy Point Defense','T3 Anti-Air SAM Launcher','T3 Torpedo Ambushing System','T3 Heavy Artillery Installation','T3 Rapid-Fire Artillery Installation','T3 Strategic Missile Launcher','T3 Strategic Missile Defense'],

            'Structures - Support': ['T1 Wall Section','T2 Air Staging Facility','T2 Shield Generator','T2 Shield Generator: ED2','T2 Shield Generator: ED3','T2 Shield Generator: ED4','T2 Shield Generator: ED5','T3 Heavy Shield Generator'],

            'Structures - Intelligence': ['T1 Radar System','T1 Sonar System','T2 Radar System','T2 Sonar System','T2 Stealth Field Generator','T3 Omni Sensor Array','T3 Sonar Platform','T3 Perimeter Monitoring System','T3 Quantum Optics Facility'],

            'Structures - Economy': ['T1 Mass Extractor','T1 Power Generator','T1 Hydrocarbon Power Plant','T1 Energy Storage','T1 Mass Storage','T2 Mass Extractor','T2 Power Generator','T2 Mass Fabricator','T3 Mass Extractor','T3 Power Generator','T3 Mass Fabricator'],

            'Structures - Factorys': ['T1 Land Factory','T1 Air Factory','T1 Naval Factory','T2 Land Factory HQ','T2 Land Factory','T2 Air Factory HQ','T2 Air Factory','T2 Naval Factory HQ','T2 Naval Factory','T3 Land Factory HQ','T3 Land Factory','T3 Air Factory HQ','T3 Air Factory','T3 Naval Factory HQ','T3 Naval Factory','T3 Quantum Gateway'],

        },
        getTech = function(bp) {
            var x = _.intersection(bp.Categories, _.keys(techLookup));
            return x.length === 1 ? techLookup[x[0]] : '';
        },
        fullName = function(u) {
            return (u.name ? u.name + ': ' : '') + (u.tech === 'EXP' ? '' : u.tech + ' ') + u.description;
        },
        weaponStats = function(weapon) {
            var shots = weapon.ManualFire ? 1 : 0, //weapon.MuzzleSalvoSize, // number of projectiles
                   rate = weapon.RateOfFire,
                   //delay = weapon.RackSalvoChargeTime||0 + weapon.RackSalvoReloadTime||0,
                   cycle = 1 / rate, // + delay,  how long it takes between shots
                   ppf = weapon.ProjectilesPerOnFire ? weapon.ProjectilesPerOnFire : 1,
                   salvoSize = typeof weapon.MuzzleSalvoSize !== 'undefined' ? weapon.MuzzleSalvoSize : 1,
                   salvoDelay = typeof weapon.MuzzleSalvoDelay !== 'undefined' ? weapon.MuzzleSalvoDelay : 1,
                   dotPulse = typeof weapon.DoTPulses !== 'undefined' ? weapon.DoTPulses : 1,
                   rackCount = weapon.RackBones ? weapon.RackBones.length : 1,
                   damage = weapon.Damage * ppf * dotPulse,
                      // this thing is needed to properly calculate split projectiles. Unfortunately the numbers hardcoded here are not available in the blueprint,
                      // but specified in the .lua files for corresponding projectiles.
                   projectileMultiplierLookup = {
                      '/projectiles/TIFFragmentationSensorShell01/TIFFragmentationSensorShell01_proj.bp': 5, // Lobo
                      '/projectiles/SIFThunthoArtilleryShell01/SIFThunthoArtilleryShell01_proj.bp': 6, // Zthuee
                      '/projectiles/AIFFragmentationSensorShell01/AIFFragmentationSensorShell01_proj.bp': 36, // Zthuee
                   };

            salvoDelay = salvoDelay === 0 ? 0 : salvoDelay - 0.1;

            var x = Math.pow(10, 1 || 0);
            cycle = Math.round((cycle || 0) * x) / x;
            salvoDelay = Math.round((salvoDelay || 0) * x) / x;
            salvoSize = Math.round((salvoSize || 0) * x) / x;

            if (weapon.MuzzleSalvoDelay === 0) {
                shots += weapon.RackBones[0].MuzzleBones.length;
            }

            if ( ( (typeof weapon.ProjectileId !== 'undefined') ||  (typeof weapon.ProjectileLifetimeUsesMultiplier !== 'undefined') ) && typeof weapon.ForceSingleFire === 'undefined' ) {

                //var muzzleDelay = salvoDelay === 0 ? 0 : salvoDelay - 0.1;

                if (salvoDelay === 0) {
                    shots = weapon.RackBones[0].MuzzleBones.length;
                    if (weapon.RackFireTogether)
                        shots = shots * rackCount;
                } else {
                    shots = salvoSize;
                    if (weapon.RackFireTogether)
                        shots = shots * rackCount;
                }

                 if (projectileMultiplierLookup[weapon.ProjectileId])
                    shots = projectileMultiplierLookup[weapon.ProjectileId];

                if (weapon.RateOfFire !== 1) {
                    cycle = weapon.WeaponCategory === 'Kamikaze' ? 1 : cycle;
                } else if (weapon.RackSalvoReloadTime !== 0) {
                    var reloadCharge = weapon.RackSalvoChargeTime !== 0 ? Math.floor(weapon.RackSalvoReloadTime/weapon.RackSalvoChargeTime) : 0;
                    var salvoReload = weapon.RackSalvoChargeTime > weapon.RackSalvoReloadTime ? weapon.RackSalvoChargeTime : reloadCharge + weapon.RackSalvoReloadTime;
                    cycle = salvoReload + rate + salvoDelay * shots;
                } else {
                    cycle = weapon.RackSalvoChargeTime + weapon.RateOfFire;
                }
            }

            return { shots: shots, cycle: cycle, damage: damage, salvoDelay: salvoDelay, salvoSize: salvoSize, dotPulse: dotPulse };
        },
        fireCycle = function(weapon) {
            var stats = weaponStats(weapon);
            switch (weapon.BeamLifetime) {
                case 1:
                    return stats.shots + ' beam(s) every ' + stats.cycle + 's, ' + (9 * weapon.Damage) * stats.shots + ' damage total';
                case 0:
                    return 'continuous beam: ' + (weapon.Damage * stats.shots);// + ' #' + (weapon.Damage * 2) + ' damage';
            }

            if (stats.salvoDelay !== 0) {
                var projectiles = stats.shots;
                var x = Math.pow(10, 1 || 0);
                var reload = Math.round(((stats.cycle - ((projectiles - 1) * stats.salvoDelay)) || 0) * x) / x;
                return projectiles + ' times 1 projectile every ' + stats.salvoDelay + ' seconds + ' +
                reload + ' seconds reload ' +
                '= ' + stats.cycle + ' seconds total, ' + weapon.Damage * projectiles + ' damage total';
            }
            return stats.shots + ' shot' + (stats.shots > 1 ? 's' : '') + ' every ' + ( stats.cycle === 1 ? '' : Math.round(stats.cycle * 10)/10 ) + ' sec for ' + (weapon.Damage * stats.shots) + ' total damage';
        },
        beamCycle = function(weapon) {
            if (weapon.BeamCollisionDelay > 0.1) {
                var shots = Math.round(weapon.BeamLifetime/(0.1 + weapon.BeamCollisionDelay));
                var shotText = '';
                if (shots > 1)
                    shotText = 'every ' + weapon.BeamCollisionDelay + 0.1 + ' seconds ';
                return shots + ' times ' + weapon.Damage +
                ' damage ' + shotText +
                '<b>' + weapon.Damage * shots + '</b> damage total';
            } else if (weapon.BeamLifetime === 1) {
                return '9 times every 0.1 seconds ' + weapon.Damage + ' damage = ' + (9 * weapon.Damage) + ' damage total, 0.8 seconds total';
            } else {
                if (weapon.DoTPulses) {
                    return weapon.DoTPulses + ' times ' + weapon.Damage + ' damage every ' +
                    (weapon.DoTTime/10) + ' seconds = ' + (weapon.damage * weapon.DoTPulses) + ' total ' +
                    (weapon.DoTTime/10 * weapon.DoTPulses - 0.1) + ' seconds total';
                } else {
                    return weapon.Damage + ' damage';
                }
            }
        },
        getDps = function(weapon) {
            var stats = weaponStats(weapon);

            if (weapon.ForceSingleFire)
                return null;

            return unitDb.dpsCalculator.dps(weapon, stats);
        },
        isTML = function(weapon) {
            if (weapon.ForceSingleFire)
                return true;

            return false;
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
            fireCycle: fireCycle,
            beamCycle: beamCycle
        };

        self.fullName = fullName(self);

        // additional stats for weapons
        for(var i in blueprint.Weapon) {
            _.extend(blueprint.Weapon[i], {
                dps: getDps(blueprint.Weapon[i]),
                isTML: isTML(blueprint.Weapon[i])
            });
        }

    return _.extend(self, blueprint);
};
