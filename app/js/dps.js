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
    dps: function(w,s) {
        if (this.canCalculate(w))
            return this._dps(w,s);
        else if (this.next && this.next.dps) {
            return this.next.dps(w,s);
        }
    }
};
unitDb.DefaultDpsCalculator = angular.extend({}, unitDb.DpsCalculator, {
    canCalculate: function() {
        return true;
    },
    _dps: function(w,s) {
        return (s.shots * w.Damage * s.dotPulse) / s.cycle;
    }
});
unitDb.BeamDpsCalculator = angular.extend({}, unitDb.DpsCalculator, {
    next: unitDb.DefaultDpsCalculator,
    canCalculate: function(w) {
        return w.BeamLifetime;
    },
    _dps: function(w,s) {
        var dps = 0;

        switch (w.BeamLifetime) {
            case 1:
                dps = 9 * w.Damage * (1/s.cycle) * s.shots;
                break;
            case 0:
                dps = w.Damage/(0.1 + w.BeamCollisionDelay);
                break;
            case w.BeamLifetime > 1:
                dps = w.Damage * (w.BeamLifetime/(0.1 + w.BeamCollisionDelay))/s.cycle;
                break;
            default:
                dps = Math.round(w.BeamLifetime/(0.1 + w.BeamCollisionDelay))*w.Damage/s.cycle;
                dps = dps * s.shots;
                break;
        }

        var x = Math.pow(10, 2 || 0);
            dps = Math.round((dps || 0) * x) / x;

        return dps;
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
    _dps: function(w,s) {
        var initial = unitDb.DefaultDpsCalculator._dps(w,s);
        return w.Damage * (w.DoTPulses || 1) + (initial || 0);
    }
});

unitDb.dpsCalculator = unitDb.DoTDpsCalculator;
