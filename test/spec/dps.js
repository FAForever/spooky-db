'use strict';

describe('unitDb.dpsCalculator is defined', function() {
  it('is defined', function() {
    expect(unitDb.dpsCalculator).toBeDefined();
  });
});

describe('dps', function () {
  it('mantis (URL0107)', function () {
    var weapon = {
        'Damage': 8,
        'DamageRadius': 0,
        'DamageType': 'Normal',
        'DisplayName': 'Light Pulse Laser',
        'MaxRadius': 18,
        'MuzzleSalvoSize': 1,
        'ProjectileId': '/projectiles/CDFLaserHeavy01/CDFLaserHeavy01_proj.bp',
        'ProjectilesPerOnFire': 1,
        'RackSalvoChargeTime': 0,
        'RateOfFire': 3,
        'TurretPitch': 0,
        'TurretPitchRange': 45,
        'TurretPitchSpeed': 100,
        'TurretYaw': 0,
        'TurretYawRange': 180,
        'TurretYawSpeed': 100,
        'WeaponCategory': 'Direct Fire'
    };
    var dps = unitDb.dpsCalculator.dps(weapon);
    expect(dps).toBeCloseTo(26.67);
  });

  it('Exodus Class (UAS0201) - Oblivion Cannon', function () {
    var weapon = {
        'Damage': 1060,
        'DamageRadius': 1,
        'DamageType': 'Normal',
        'DisplayName': 'Oblivion Cannon',
        'MaxRadius': 80,
        'MuzzleSalvoSize': 1,
        'ProjectileId': '/projectiles/ADFOblivionCannon01/ADFOblivionCannon01_proj.bp',
        'RackSalvoChargeTime': 0,
        'RateOfFire': 0.2,
        'TurretPitch': 10,
        'TurretPitchRange': 40,
        'TurretPitchSpeed': 30,
        'TurretYaw': 0,
        'TurretYawRange': 160,
        'TurretYawSpeed': 100,
        'WeaponCategory': 'Direct Fire Naval'
    };
    var dps = unitDb.dpsCalculator.dps(weapon);
    expect(dps).toBeCloseTo(212);
  });

  it('Uashavoh (XSS0201) - Ultrachromatic Beam Generator 1', function () {
    var weapon = {
        'BeamCollisionDelay': 0,
        'BeamLifetime': 1,
        'Damage': 50,
        'DamageRadius': 1,
        'DamageType': 'Normal',
        'DisplayName': 'Ultrachromatic Beam Generator',
        'MaxRadius': 60,
        'MuzzleSalvoSize': 1,
        'RackSalvoChargeTime': 0,
        'RateOfFire': 0.25,
        'TurretPitch': 10,
        'TurretPitchRange': 20,
        'TurretPitchSpeed': 30,
        'TurretYaw': 0,
        'TurretYawRange': 120,
        'TurretYawSpeed': 60,
        'WeaponCategory': 'Direct Fire Naval'
    };
    var dps = unitDb.dpsCalculator.dps(weapon);
    expect(dps).toBeCloseTo(125);
  });

  it('Uashavoh (XSS0201) - Ultrachromatic Beam Generator 2', function () {
    var weapon = {
        'BeamCollisionDelay': 0,
        'BeamLifetime': 1,
        'Damage': 26,
        'DamageRadius': 1,
        'DamageType': 'Normal',
        'DisplayName': 'Ultrachromatic Beam Generator',
        'MaxRadius': 60,
        'MuzzleSalvoSize': 1,
        'RackSalvoChargeTime': 0,
        'RateOfFire': 0.25,
        'TurretPitch': 10,
        'TurretPitchRange': 20,
        'TurretPitchSpeed': 30,
        'TurretYaw': 0,
        'TurretYawRange': 140,
        'TurretYawSpeed': 60,
        'WeaponCategory': 'Direct Fire Naval'
    };
    var dps = unitDb.dpsCalculator.dps(weapon);
    expect(dps).toBeCloseTo(65);
  });

  it('Valiant Class (UES0201) - Gauss Cannon', function () {
        var weapon = {
            'Damage': 275,
            'DamageRadius': 1,
            'DamageType': 'Normal',
            'DisplayName': 'Gauss Cannon',
            'MaxRadius': 60,
            'MuzzleSalvoSize': 1,
            'ProjectileId': '/projectiles/TDFGauss01/TDFGauss01_proj.bp',
            'ProjectilesPerOnFire': 1,
            'RackSalvoChargeTime': 0,
            'RateOfFire': 0.25,
            'TurretPitch': 10,
            'TurretPitchRange': 20,
            'TurretPitchSpeed': 30,
            'TurretYaw': 0,
            'TurretYawRange': 140,
            'TurretYawSpeed': 90,
            'WeaponCategory': 'Direct Fire Naval'
        };
        var dps = unitDb.dpsCalculator.dps(weapon);
        expect(dps).toBeCloseTo(68.75);
    });

  it('Cooper (XES0102) - Angler Torpedo', function () {
    var weapon = {
        'Damage': 80,
        'DamageType': 'Normal',
        'DisplayName': 'Angler Torpedo',
        'MaxRadius': 50,
        'MuzzleSalvoSize': 4,
        'ProjectileId': '/projectiles/TANAnglerTorpedo02/TANAnglerTorpedo02_proj.bp',
        'RackSalvoChargeTime': 0,
        'RateOfFire': 0.3,
        'TurretPitch': 0,
        'TurretPitchRange': 0,
        'TurretPitchSpeed': 0,
        'TurretYaw': 0,
        'TurretYawRange': 0,
        'TurretYawSpeed': 0,
        'WeaponCategory': 'Anti Navy'
    };
    var dps = unitDb.dpsCalculator.dps(weapon);
    expect(dps).toBeCloseTo(96.97);
  });

  it('Vesper (XAS0204) - Chrono Torpedo', function () {
    var weapon = {
        'Damage': 90,
        'DamageType': 'Normal',
        'DisplayName': 'Chrono Torpedo',
        'MaxRadius': 45,
        'MuzzleSalvoSize': 4,
        'ProjectileId': '/projectiles/AANTorpedo01/AANTorpedo01_proj.bp',
        'RackSalvoChargeTime': 0,
        'RateOfFire': 0.25,
        'TurretPitch': 0,
        'TurretPitchRange': 0,
        'TurretPitchSpeed': 0,
        'TurretYaw': 0,
        'TurretYawRange': 0,
        'TurretYawSpeed': 0,
        'WeaponCategory': 'Anti Navy'
    };
    var dps = unitDb.dpsCalculator.dps(weapon);
    expect(dps).toBeCloseTo(90);
  });

  it('Lobo (UEL0103) - Fragmentation Artillery', function () {
    var weapon = {
        'Damage': 100,
        'DamageRadius': 1,
        'DamageType': 'Normal',
        'DisplayName': 'Fragmentation Artillery',
        'MaxRadius': 30,
        'MinRadius': 5,
        'MuzzleSalvoSize': 1,
        'ProjectileId': '/projectiles/TIFFragmentationSensorShell01/TIFFragmentationSensorShell01_proj.bp',
        'RackSalvoChargeTime': 0,
        'RateOfFire': 0.12,
        'TurretPitch': 45,
        'TurretPitchRange': 90,
        'TurretPitchSpeed': 70,
        'TurretYaw': 0,
        'TurretYawRange': 180,
        'TurretYawSpeed': 70,
        'WeaponCategory': 'Artillery'
    };
    var dps = unitDb.dpsCalculator.dps(weapon);
    expect(dps).toBeCloseTo(48.19);
  });

  it('Zthuee (XSL0103) - Thuntho Artillery Cannon', function () {
    var weapon = {
        'Damage': 45,
        'DamageRadius': 1.5,
        'DamageType': 'Normal',
        'DisplayName': 'Thuntho Artillery Cannon',
        'MaxRadius': 30,
        'MinRadius': 8,
        'MuzzleSalvoSize': 1,
        'ProjectileId': '/projectiles/SIFThunthoArtilleryShell01/SIFThunthoArtilleryShell01_proj.bp',
        'ProjectilesPerOnFire': 5,
        'RackSalvoChargeTime': 0,
        'RateOfFire': 0.35,
        'TurretPitch': 45,
        'TurretPitchRange': 90,
        'TurretPitchSpeed': 70,
        'TurretYaw': 0,
        'TurretYawRange': 45,
        'TurretYawSpeed': 60,
        'WeaponCategory': 'Artillery'
    };
    var dps = unitDb.dpsCalculator.dps(weapon);
    expect(dps).toBeCloseTo(77.59);
  });

  it('Wailer (XRA0305) - Disintegrator Pulse Laser', function () {
    var weapon = {
        'Damage': 140,
        'DamageType': 'Normal',
        'DisplayName': 'Disintegrator Pulse Laser',
        'MaxRadius': 25,
        'MinRadius': 2,
        'MuzzleSalvoSize': 1,
        'ProjectileId': '/projectiles/CDFLaserDisintegrator04/CDFLaserDisintegrator04_proj.bp',
        'ProjectilesPerOnFire': 1,
        'RackSalvoChargeTime': 0,
        'RateOfFire': 1.6,
        'TurretPitch': -20,
        'TurretPitchRange': 80,
        'TurretPitchSpeed': 180,
        'TurretYaw': 0,
        'TurretYawRange': 180,
        'TurretYawSpeed': 180,
        'WeaponCategory': 'Direct Fire'
    };
    var dps = unitDb.dpsCalculator.dps(weapon);
    expect(dps).toBeCloseTo(233.33);
  });

  it('Zeus (URA0103) - Neutron Cluster Bomb', function () {
    var weapon = {
        'Damage': 50,
        'DamageRadius': 3,
        'DamageType': 'Normal',
        'DisplayName': 'Neutron Cluster Bomb',
        'MaxRadius': 40,
        'MuzzleSalvoSize': 6,
        'ProjectileId': '/projectiles/CIFNeutronClusterBomb01/CIFNeutronClusterBomb01_proj.bp',
        'ProjectilesPerOnFire': 6,
        'RackSalvoChargeTime': 0,
        'RateOfFire': 0.25,
        'TurretPitch': 0,
        'TurretPitchRange': 0,
        'TurretPitchSpeed': 0,
        'TurretYaw': 0,
        'TurretYawRange': 0,
        'TurretYawSpeed': 0,
        'WeaponCategory': 'Bomb'
    };
    var dps = unitDb.dpsCalculator.dps(weapon);
    expect(dps).toBeCloseTo(75);
  });

  it('Shimmer (UAA0103) - Graviton Bomb', function () {
    var weapon = {
        'Buffs': [ {} ],
        'Damage': 200,
        'DamageRadius': 4,
        'DamageType': 'Normal',
        'DisplayName': 'Graviton Bomb',
        'MaxRadius': 40,
        'MuzzleSalvoSize': 1,
        'ProjectileId': '/projectiles/AIFBombGraviton01/AIFBombGraviton01_proj.bp',
        'ProjectilesPerOnFire': 1,
        'RackSalvoChargeTime': 0,
        'RateOfFire': 0.25,
        'WeaponCategory': 'Bomb'
    };
    var dps = unitDb.dpsCalculator.dps(weapon);
    expect(dps).toBeCloseTo(50);
  });

  it('Sinnve (XSA0103) - Othe Tactical Bomb', function () {
    var weapon = {
        'Damage': 250,
        'DamageRadius': 4,
        'DamageType': 'Normal',
        'DisplayName': 'Othe Tactical Bomb',
        'MaxRadius': 40,
        'MuzzleSalvoSize': 1,
        'ProjectileId': '/projectiles/SBOOtheTacticalBomb01/SBOOtheTacticalBomb01_proj.bp',
        'ProjectilesPerOnFire': 1,
        'RackSalvoChargeTime': 0,
        'RateOfFire': 0.25,
        'WeaponCategory': 'Bomb'
    };
    var dps = unitDb.dpsCalculator.dps(weapon);
    expect(dps).toBeCloseTo(62.5);
  });

});
