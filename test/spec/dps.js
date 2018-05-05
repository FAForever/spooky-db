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
    var stats = {
        'shots':1,
        'cycle':0.3,
        'damage':8,
        'salvoDelay':0,
        'salvoSize':1,
        'dotPulse':1
    };
    var dps = unitDb.dpsCalculator.dps(weapon, stats);
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
    var stats = {
        'shots':1,
        'cycle':5,
        'damage':1060,
        'salvoDelay':0,
        'salvoSize':1,
        'dotPulse':1
     };
    var dps = unitDb.dpsCalculator.dps(weapon, stats);
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
    var stats = {
        'shots':1,
        'cycle':4,
        'damage':50,
        'salvoDelay':0,
        'salvoSize':1,
        'dotPulse':1
    };
    var dps = unitDb.dpsCalculator.dps(weapon, stats);
    expect(dps).toBeCloseTo(112.5);
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
    var stats = {
        'shots':1,
        'cycle':4,
        'damage':26,
        'salvoDelay':0,
        'salvoSize':1,
        'dotPulse':1
    };
    var dps = unitDb.dpsCalculator.dps(weapon, stats);
    expect(dps).toBeCloseTo(58.5);
  });

  it('Valiant Class (UES0201) - Gauss Cannon', function () {
        var weapon = {
            'DamageRadius': 1,
            'FiringRandomness': 0.35,
            'RateOfFire': 0.25,
            'ProjectilesPerOnFire': 1,
            'TurretYaw': 0,
            'RackBones': [
                {'MuzzleBones': ['Front_Turret01_Muzzle01'] },
                {'MuzzleBones': ['Front_Turret01_Muzzle02'] }
            ],
            'Damage': 275,
            'DamageType': 'Normal',
            'TurretPitch': 10,
            'TurretPitchRange': 20,
            'DisplayName': 'Gauss Cannon',
            'TurretPitchSpeed': 30,
            'MaxRadius': 60,
            'ProjectileId': '/projectiles/TDFGauss01/TDFGauss01_proj.bp',
            'MuzzleVelocity': 30,
            'RackFireTogether': true,
            'RackSalvoChargeTime': 0,
            'MuzzleSalvoSize': 1,
            'TurretYawSpeed': 90,
            'MuzzleSalvoDelay': 0,
            'FiringTolerance': 2,
            'RackSalvoReloadTime': 0,
            'TurretYawRange': 140,
            'WeaponCategory': 'Direct Fire Naval',
            'WeaponNumber': 2
        };
        var stats = {
            'shots':2,
            'cycle':4,
            'damage':275,
            'salvoDelay':0,
            'salvoSize':1,
            'dotPulse':1
        };
        var dps = unitDb.dpsCalculator.dps(weapon, stats);
        expect(dps).toBeCloseTo(137.5);
    });

  it('Cooper (XES0102) - Angler Torpedo', function () {
    var weapon = {
        'RateOfFire': 0.3,
        'TurretYaw': 0,
        'RackBones': [
            {'MuzzleBones': ['Projectile01'] }
        ],
        'Damage': 80,
        'ProjectileLifetime': 7,
        'DamageType': 'Normal',
        'TurretPitch': 0,
        'TurretPitchRange': 0,
        'DisplayName': 'Angler Torpedo',
        'TurretPitchSpeed': 0,
        'MaxRadius': 50,
        'ProjectileId': '/projectiles/TANAnglerTorpedo02/TANAnglerTorpedo02_proj.bp',
        'MuzzleVelocity': 5,
        'RackFireTogether': false,
        'RackSalvoChargeTime': 0,
        'MuzzleSalvoDelay': 0.4,
        'RackSalvoReloadTime': 0,
        'TurretYawSpeed': 0,
        'TurretYawRange': 0,
        'FiringTolerance': 2,
        'WeaponCategory': 'Anti Navy',
        'MuzzleSalvoSize': 4
    };
    var stats = {
        'shots':4,
        'cycle':3.3,
        'damage':80,
        'salvoDelay':0.3,
        'salvoSize':4,
        'dotPulse':1
    };
    var dps = unitDb.dpsCalculator.dps(weapon, stats);
    expect(dps).toBeCloseTo(96.97);
  });

  it('Vesper (XAS0204) - Chrono Torpedo', function () {
    var weapon = {
        'RateOfFire': 0.25,
        'TurretYaw': 0,
        'RackBones': [
            {'MuzzleBones': ['Projectile_Front_Right', 'Projectile_Front_Left'] }
        ],
        'Damage': 90,
        'ProjectileLifetime': 7,
        'DamageType': 'Normal',
        'TurretPitch': 0,
        'TurretPitchRange': 0,
        'DisplayName': 'Chrono Torpedo',
        'TurretPitchSpeed': 0,
        'MaxRadius': 45,
        'ProjectileId': '/projectiles/AANTorpedo01/AANTorpedo01_proj.bp',
        'MuzzleVelocity': 5,
        'RackFireTogether': false,
        'RackSalvoChargeTime': 0,
        'MuzzleSalvoSize': 4,
        'MuzzleSalvoDelay': 0.4,
        'RackSalvoReloadTime': 0,
        'TurretYawRange': 0,
        'FiringTolerance': 2,
        'TurretYawSpeed': 0,
        'WeaponCategory': 'Anti Navy'
    };
    var stats = {
        'shots':4,
        'cycle':4,
        'damage':90,
        'salvoDelay':0.3,
        'salvoSize':4,
        'dotPulse':1
    };
    var dps = unitDb.dpsCalculator.dps(weapon, stats);
    expect(dps).toBeCloseTo(90);
  });

  it('Lobo (UEL0103) - Fragmentation Artillery', function () {
    var weapon = {
        'DamageRadius': 1,
        'FiringRandomness': 0.5,
        'TurretYaw': 0,
        'RackBones': [
            {'MuzzleBones': ['Turret_Muzzle'] }
        ],
        'Damage': 100,
        'DamageType': 'Normal',
        'TurretPitch': 45,
        'TurretPitchRange': 90,
        'DisplayName': 'Fragmentation Artillery',
        'TurretPitchSpeed': 70,
        'MinRadius': 5,
        'MaxRadius': 30,
        'ProjectileId': '/projectiles/TIFFragmentationSensorShell01/TIFFragmentationSensorShell01_proj.bp',
        'MuzzleVelocity': 14,
        'RackSalvoReloadTime': 0,
        'RackSalvoChargeTime': 0,
        'MuzzleSalvoSize': 1,
        'MuzzleSalvoDelay': 0,
        'TurretYawSpeed': 70,
        'TurretYawRange': 180,
        'FiringTolerance': 2,
        'RateOfFire': 0.12,
        'WeaponCategory': 'Artillery'
    };
    var stats = {
        'shots':5,
        'cycle':8.3,
        'damage':100,
        'salvoDelay':0,
        'salvoSize':1,
        'dotPulse':1
    };
    var dps = unitDb.dpsCalculator.dps(weapon, stats);
    expect(dps).toBeCloseTo(12.05);
  });

  it('Zthuee (XSL0103) - Thuntho Artillery Cannon', function () {
    var weapon = {
        'DamageRadius': 1.5,
        'FiringRandomness': 1,
        'RateOfFire': 0.35,
        'TurretYaw': 0,
        'RackBones': [
            {'MuzzleBones': ['Turret_Muzzle'] }
        ],
        'Damage': 45,
        'DamageType': 'Normal',
        'TurretPitch': 45,
        'TurretPitchRange': 90,
        'DisplayName': 'Thuntho Artillery Cannon',
        'TurretPitchSpeed': 70,
        'MinRadius': 8,
        'MaxRadius': 30,
        'ProjectileId': '/projectiles/SIFThunthoArtilleryShell01/SIFThunthoArtilleryShell01_proj.bp',
        'MuzzleVelocity': 14,
        'RackFireTogether': false,
        'RackSalvoChargeTime': 0,
        'MuzzleSalvoSize': 1,
        'TurretYawSpeed': 70,
        'MuzzleSalvoDelay': 0,
        'TurretYawRange': 45,
        'FiringTolerance': 1,
        'RackSalvoReloadTime': 0,
        'WeaponCategory': 'Artillery'
    };
    var stats = {
        'shots':6,
        'cycle':2.9,
        'damage':45,
        'salvoDelay':0,
        'salvoSize':1,
        'dotPulse':1
    };
    var dps = unitDb.dpsCalculator.dps(weapon, stats);
    expect(dps).toBeCloseTo(15.52);
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
    var stats = {
      'shots':1,
      'cycle':0.6,
      'damage':140,
      'salvoDelay':0,
      'salvoSize':1,
      'dotPulse':1
      };
    var dps = unitDb.dpsCalculator.dps(weapon, stats);
    expect(dps).toBeCloseTo(233.33);
  });

  it('Zeus (URA0103) - Neutron Cluster Bomb', function () {
    var weapon = {
        'DamageRadius': 3,
        'RateOfFire': 0.2,
        'RackBones': [
            {'MuzzleBones': ['Muzzle_L03', 'Muzzle_R03', 'Muzzle_L02', 'Muzzle_R02', 'Muzzle_L01', 'Muzzle_R01']}
        ],
        'Damage': 50,
        'DamageType': 'Normal',
        'TurretPitch': 0,
        'DisplayName': 'Neutron Cluster Bomb',
        'TurretPitchSpeed': 0,
        'MaxRadius': 40,
        'ProjectileId': '/projectiles/CIFNeutronClusterBomb01/CIFNeutronClusterBomb01_proj.bp',
        'MuzzleVelocity': 0,
        'RackFireTogether': false,
        'RackSalvoChargeTime': 0,
        'MuzzleSalvoSize': 6,
        'MuzzleSalvoDelay': 0.2,
        'TurretYawRange': 0,
        'TurretPitchRange': 0,
        'RackSalvoReloadTime': 0,
        'FiringTolerance': 6,
        'TurretYaw': 0,
        'TurretYawSpeed': 0,
        'WeaponCategory': 'Bomb'
    };
    var stats = {
        'shots':6,
        'cycle':5,
        'damage':50,
        'salvoDelay':0.1,
        'salvoSize':6,
        'dotPulse':1
    };
    var dps = unitDb.dpsCalculator.dps(weapon, stats);
    expect(dps).toBeCloseTo(60);
  });

  it('Shimmer (UAA0103) - Graviton Bomb', function () {
    var weapon = {
        'DamageRadius': 4,
        'FiringRandomness': 0,
        'RateOfFire': 0.2,
        'ProjectilesPerOnFire': 1,
        'RackBones': [
            {'MuzzleBones': ['UAA0103']}
        ],
        'Damage': 200,
        'DamageType': 'Normal',
        'DisplayName': 'Graviton Bomb',
        'MaxRadius': 40,
        'ProjectileId': '/projectiles/AIFBombGraviton01/AIFBombGraviton01_proj.bp',
        'MuzzleVelocity': 0,
        'RackFireTogether': false,
        'RackSalvoChargeTime': 0,
        'MuzzleSalvoSize': 1,
        'MuzzleSalvoDelay': 0,
        'RackSalvoReloadTime': 0,
        'FiringTolerance': 6,
        'Buffs': [{}],
        'WeaponCategory': 'Bomb'
    };
    var stats = {
        'shots':1,
        'cycle':5,
        'damage':200,
        'salvoDelay':0,
        'salvoSize':1,
        'dotPulse':1
    };
    var dps = unitDb.dpsCalculator.dps(weapon, stats);
    expect(dps).toBeCloseTo(40);
  });

  it('Sinnve (XSA0103) - Othe Tactical Bomb', function () {
    var weapon = {
        'DamageRadius': 4,
        'RateOfFire': 0.2,
        'ProjectilesPerOnFire': 1,
        'RackBones': [
            {'MuzzleBones': ['Center_Projectile']}
        ],
        'Damage': 250,
        'DamageType': 'Normal',
        'DisplayName': 'Othe Tactical Bomb',
        'MaxRadius': 40,
        'ProjectileId': '/projectiles/SBOOtheTacticalBomb01/SBOOtheTacticalBomb01_proj.bp',
        'MuzzleVelocity': 0,
        'RackFireTogether': false,
        'RackSalvoChargeTime': 0,
        'MuzzleSalvoSize': 1,
        'MuzzleSalvoDelay': 0,
        'RackSalvoReloadTime': 0,
        'FiringTolerance': 6,
        'FiringRandomness': 0,
        'WeaponCategory': 'Bomb'
    };
    var stats = {
        'shots':1,
        'cycle':5,
        'damage':250,
        'salvoDelay':0,
        'salvoSize':1,
        'dotPulse':1
    };
    var dps = unitDb.dpsCalculator.dps(weapon, stats);
    expect(dps).toBeCloseTo(50);
  });

});
