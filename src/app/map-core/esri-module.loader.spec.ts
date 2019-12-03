/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { MapService } from './map.service';
import { EsriModuleEnum } from './map.model';
import { EsriTypeFactory } from './esri-type.factory';
import { EsriModuleLoader } from './esri-module.loader';
jest.mock('esri-loader');
import { loadModules, loadCss } from 'esri-loader';

describe('Service: EsriModuleLoader', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                EsriModuleLoader
            ]
        });
    });
    it('should initialize with empty modules', inject([EsriModuleLoader], async (loader: EsriModuleLoader) => {
        expect(loader).toBeTruthy();
        expect(loader.moduleLookup).toEqual({});
    }));
    it('should load modules when initially empty', inject([EsriModuleLoader], async (loader: EsriModuleLoader) => {
        const map = {};
        const mockLoadModules = loadModules as jest.Mock<any>;

        // GIVEN loadModules can resolve Map
        mockLoadModules.mockReset();
        mockLoadModules.mockResolvedValue([map]);

        // WHEN loadModules is called with a Map module
        const [loadedMap] = await loader.loadModules(['esri/Map']);

        // THEN the map should be loaded
        expect(loadedMap).toBeTruthy();
        expect(loadedMap).toEqual(map);

        // AND so should the lookup
        expect(loader.moduleLookup['esri/Map']).toBe(loadedMap);
    }));

    it('should load modules when initially populated', inject([EsriModuleLoader], async (loader: EsriModuleLoader) => {
        const map = {};
        const mapView = {};
        // GIVEN loader is initially populated
        loader.moduleLookup = {
            'esri/Map': map
        };

        // AND loadModules can resolve MapView
        const mockLoadModules = loadModules as jest.Mock<any>;
        mockLoadModules.mockReset();
        mockLoadModules.mockResolvedValue([mapView]);

        // WHEN loader.loadModules is called with a module that has already been loaded
        const [loadedMap, loadedMapView] = await loader.loadModules(['esri/Map', 'esri/views/MapView']);

        // THEN loadedMap and loadedMapView should be set
        expect(loadedMap).toBe(map);
        expect(loadedMapView).toBe(mapView);
        expect(mockLoadModules).toHaveBeenCalledTimes(1);
        expect(mockLoadModules).toHaveBeenCalledWith(['esri/views/MapView']);
    }));

    it('should load css module', inject([EsriModuleLoader], async (loader: EsriModuleLoader) => {
        const mockLoadCss = loadCss as jest.Mock<any>;
        mockLoadCss.mockReset();

        // WHEN loader.loadModules is called with a module that has already been loaded
        await loader.loadCss();

        // THEN loadedMap and loadedMapView should be set
        expect(mockLoadCss).toHaveBeenCalledTimes(1);
    }));
});
