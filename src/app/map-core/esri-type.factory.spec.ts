/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { MapService } from './map.service';
import { EsriModuleEnum } from './map.model';
import { EsriTypeFactory } from './esri-type.factory';
import { EsriModuleLoader } from './esri-module.loader';

describe('Service: EsriTypeFactory', () => {
    
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EsriTypeFactory
      ]
    });
  });
  it('should create module', inject([EsriTypeFactory], async (factory: EsriTypeFactory) => {

    let Map = jest.fn();
    let args = {};

    const modules = {
        'esri/Map': Map
    };

    //GIVEN the factory is initialized with a module
    factory.init(modules)

    //WHEN create is called
    factory.create(EsriModuleEnum.Map, args);
    
    //THEN the module's constructor should be called
    expect(Map).toHaveBeenCalledTimes(1);
    expect(Map).toHaveBeenCalledWith(args);

  }));

});