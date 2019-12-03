

import { TestBed, inject } from '@angular/core/testing';
import { PolygonViewMap } from './polygon-view.map';
import { EsriTypeFactory } from '../esri-type.factory';
import { EsriModuleLoader } from '../esri-module.loader';

describe('Service: PolygonViewMap', () => {
    const esriModuleLoader = {
    };
    const esriTypeFactory = {
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PolygonViewMap,
                { provide: EsriModuleLoader, useValue: esriModuleLoader },
                { provide: EsriTypeFactory, useValue: esriTypeFactory }
            ]
        });
    });
    it ('should create map', inject([EsriModuleLoader], (map: EsriModuleLoader) => {
        // when map is created
        // map should be created successfully
        expect(map).toBeTruthy();
    }));

    
});
