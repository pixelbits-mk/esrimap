/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { MapService } from './map.service';
import { EsriModuleEnum } from './map.model';
import { EsriTypeFactory } from './esri-type.factory';
import { EsriModuleLoader } from './esri-module.loader';
jest.mock('./map-types/location-select.map');
import { LocationSelectMap } from './map-types/location-select.map';

describe('Service: Map', () => {
  let mockEsriLoader: any;
  let mockEsriTypeFactory: any;

  beforeEach(() => {
    mockEsriLoader = {
      loadCss: jest.fn(),
      loadModules: jest.fn(),
      moduleLookup: { 'esri/Map': {}, 'esri/views/MapView': {} }
    };
    mockEsriTypeFactory = {
      init: jest.fn()
    }

    TestBed.configureTestingModule({
      providers: [
        MapService,
        { provide: EsriTypeFactory, useValue: mockEsriTypeFactory },
        { provide: EsriModuleLoader, useValue: mockEsriLoader }
      ]
    });
  });

  it('should create service', inject([MapService], (service: MapService) => {
    expect(service).toBeTruthy();
  }));

  it('should create location map and call init', inject([MapService], async (service: MapService) => {
    const mockLocationSelectMap = LocationSelectMap as jest.Mock<any>;
    mockLocationSelectMap.mockImplementation(() => {
      return {
        init: jest.fn()
      };
    });
    mockLocationSelectMap.mockReset();

    const container = {} as HTMLElement;
    const args = {};

    await service.createLocationSelectMap(container, args);

    expect(mockLocationSelectMap).toHaveBeenLastCalledWith(mockEsriLoader, mockEsriTypeFactory);
    expect(mockLocationSelectMap.mock.instances[0].init).toHaveBeenLastCalledWith(container, args);

  }));

});
