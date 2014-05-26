'use strict';

describe('unitDb is defined', function() {
  it('is defined', function() {
    expect(unitDb).toBeDefined();
  });

  it('returns the module on start', function(){
    var module = unitDb.start('unitDb', {});
    expect(module).toBeDefined();
  });
});

describe('Controller: homeCtrl', function () {

  // load the controller's module
  beforeEach(module('unitDb'));

  var homeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    homeCtrl = $controller('homeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of factions, to the scope', function () {
    expect(scope.factions).toBeDefined();
  });

  it('should attach a list of kinds, to the scope', function () {
    expect(scope.kinds).toBeDefined();
  });

  it('should attach a list of tech, to the scope', function () {
    expect(scope.tech).toBeDefined();
  });
});
