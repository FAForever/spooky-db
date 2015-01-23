'use strict';
unitDb = unitDb || {};

// dps fun
unitDb.DpsCalculator = {
    next : null,
    canCalculate: function() { return false; },
    _dps: function() { },
    rateInverse: function(w) {
        return Math.round(10 / w.RateOfFire) / 10;
    },
    dps: function(w) {
        if (this.canCalculate(w))
            return this._dps(w);
        else if (this.next && this.next.dps) {
            return this.next.dps(w);
        }
    }
};
unitDb.DefaultDpsCalculator = angular.extend({}, unitDb.DpsCalculator, {
    canCalculate: function() {
        return true;
    },
    _dps: function(w) {
        var projectileMultiplier = 1,
            // this thing is needed to properly calculate split projectiles. Unfortunately the numbers hardcoded here are not available in the blueprint,
            // but specified in the .lua files for corresponding projectiles.
            projectileMultiplierLookup = {
                '/projectiles/TIFFragmentationSensorShell01/TIFFragmentationSensorShell01_proj.bp': 4, // Lobo
                '/projectiles/SIFThunthoArtilleryShell01/SIFThunthoArtilleryShell01_proj.bp': 5 // Zthuee
        };

        if (w.ProjectileId)
            projectileMultiplier = projectileMultiplierLookup[w.ProjectileId] || 1;

        return (projectileMultiplier * w.Damage * w.MuzzleSalvoSize) / unitDb.DpsCalculator.rateInverse(w);
    }
});
unitDb.BeamDpsCalculator = angular.extend({}, unitDb.DpsCalculator, {
    next: unitDb.DefaultDpsCalculator,
    canCalculate: function(w) {
        return w.BeamLifetime;
    },
    _dps: function(w) {
        return w.Damage * w.BeamLifetime * (w.BeamCollisionDelay || 1) * 10 / unitDb.DpsCalculator.rateInverse(w);
    }
});
unitDb.ContinousBeamDpsCalculator = angular.extend({}, unitDb.DpsCalculator, {
    next: unitDb.BeamDpsCalculator,
    canCalculate: function(w) {
        return w.ContinuousBeam;
    },
    _dps: function(w) {
        return (w.Damage * 10) / (w.BeamCollisionDelay === 0 ? 1 : 2);
    }
});
unitDb.DoTDpsCalculator = angular.extend({}, unitDb.DpsCalculator, {
    next: unitDb.ContinousBeamDpsCalculator,
    canCalculate: function(w) {
        return w.DoTPulses;
    },
    _dps: function(w) {
        var initial = unitDb.DefaultDpsCalculator._dps(w);
        return (initial + w.Damage * w.DoTPulses * w.MuzzleSalvoSize) /  unitDb.DpsCalculator.rateInverse(w);
    }
});

unitDb.dpsCalculator = unitDb.DoTDpsCalculator;
