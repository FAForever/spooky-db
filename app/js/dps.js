'use strict';
unitDb = unitDb || {};

// dps fun
unitDb.DpsCalculator = {
    next : null,
    canCalculate: function() { return false; },
    _dps: function() { },
    dps: function(weapon, stats, isSpecial) {
        if (this.canCalculate(weapon))
            return this._dps(weapon, stats, isSpecial);
        else if (this.next && this.next.dps) {
            return this.next.dps(weapon, stats, isSpecial);
        }
    }
};

// the old way
// unitDb.DpsCalculator = {
//     next : null,
//     canCalculate: function() { return false; },
//     _dps: function() { },
//     rateInverse: function(w) {
//         return Math.round(10 / w.RateOfFire) / 10;
//     },
//     dps: function(w,s) {
//         if (this.canCalculate(w))
//             return this._dps(w,s);
//         else if (this.next && this.next.dps) {
//             return this.next.dps(w,s);
//         }
//     }
// };
// unitDb.DefaultDpsCalculator = angular.extend({}, unitDb.DpsCalculator, {
//     canCalculate: function() {
//         return true;
//     },
//     _dps: function(w,s) {
//         return (s.shots * w.Damage * s.dotPulse) / s.cycle;
//     }
// });
// unitDb.BeamDpsCalculator = angular.extend({}, unitDb.DpsCalculator, {
//     next: unitDb.DefaultDpsCalculator,
//     canCalculate: function(w) {
//         return w.BeamLifetime;
//     },
//     _dps: function(w,s) {
//         var dps = 0;

//         switch (w.BeamLifetime) {
//             case 1:
//                 dps = 9 * w.Damage * (1/s.cycle) * s.shots;
//                 break;
//             case 0:
//                 dps = w.Damage/(0.1 + w.BeamCollisionDelay);
//                 break;
//             case w.BeamLifetime > 1:
//                 dps = w.Damage * (w.BeamLifetime/(0.1 + w.BeamCollisionDelay))/s.cycle;
//                 break;
//             default:
//                 dps = Math.round(w.BeamLifetime/(0.1 + w.BeamCollisionDelay))*w.Damage/s.cycle;
//                 dps = dps * s.shots;
//                 break;
//         }

//         var x = Math.pow(10, 2 || 0);
//             dps = Math.round((dps || 0) * x) / x;

//         return dps;
//     }
// });
// unitDb.ContinousBeamDpsCalculator = angular.extend({}, unitDb.DpsCalculator, {
//     next: unitDb.BeamDpsCalculator,
//     canCalculate: function(w) {
//         return w.ContinuousBeam;
//     },
//     _dps: function(w) {
//         return (w.Damage * 10) / (w.BeamCollisionDelay === 0 ? 1 : 2);
//     }
// });
// unitDb.DoTDpsCalculator = angular.extend({}, unitDb.DpsCalculator, {
//     next: unitDb.ContinousBeamDpsCalculator,
//     canCalculate: function(w) {
//         return w.DoTPulses;
//     },
//     _dps: function(w,s) {
//         var initial = unitDb.DefaultDpsCalculator._dps(w,s);
//         return w.Damage * (w.DoTPulses || 1) + (initial || 0);
//     }
// });
// unitDb.dpsCalculator = unitDb.DoTDpsCalculator;

// the new way
unitDb.StubDpsCalculator = angular.extend({}, unitDb.DpsCalculator, {
    canCalculate: function() { return true; },
    _dps: function() {
        return -1;
    }
});

// this is retarded - literally, exotic_retard sent this in :P
unitDb.NotNukeDpsCalculator = angular.extend({}, unitDb.DpsCalculator, {
    next: unitDb.StubDpsCalculator,
    canCalculate: function(w) { return !w.NukeWeapon; },
    _dps: function(w, s, isSpecial) {
        // fall back to the old calculation formula for the special snowflakes
        if (isSpecial) {
            return (s.shots * w.Damage * s.dotPulse) / s.cycle;
        }

        var trueReload = Math.max(0.1*Math.floor((10 / w.RateOfFire) + 0.5), 0.1); //the rof is rounded to the nearest tick since the game runs in ticks.
        // some weapons also have separate charge and reload times which results in them firing less often. yeah.
        // in theory if your total MuzzleSalvoDelay is longer than the reload time your weapon waits for the reload time twice, but thats pretty much a bug so not taken into account here
        trueReload = Math.max((w.RackSalvoChargeTime || 0) + (w.RackSalvoReloadTime || 0) + (w.MuzzleSalvoDelay || 0)*((w.MuzzleSalvoSize || 1)-1), trueReload);

        var trueSalvoSize = 1;
        if ((w.MuzzleSalvoDelay || 0) > 0) { // if theres no muzzle delay, all muzzles fire at the same time. yeah.
            trueSalvoSize = (w.MuzzleSalvoSize || 1);
        } else if (w.RackBones && w.RackBones.length > 0) { // dummy weapons dont have racks
            if (w.RackFireTogether) {
              trueSalvoSize = w.RackBones.length * w.RackBones[0].MuzzleBones.length;
            } else {
              trueSalvoSize = w.RackBones[0].MuzzleBones.length;
            }
        }

        var trueDamage = w.Damage*(w.DoTPulses || 1) + (w.InitialDamage || 0);
        // beam weapons are a thing and do their own thing. yeah good luck working out that.
        trueDamage = Math.max((Math.floor((w.BeamLifetime || 0) / ((w.BeamCollisionDelay || 0)+0.1))+1)*w.Damage, trueDamage);
        var salvoDamage = trueSalvoSize * trueDamage * (isSpecial ? w.ProjectilesPerOnFire || 1 : 1);
        var trueDPS = (salvoDamage / trueReload);

        return trueDPS;
    }
});

unitDb.dpsCalculator = unitDb.NotNukeDpsCalculator;
