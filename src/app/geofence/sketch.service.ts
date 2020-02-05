import { Injectable } from '@angular/core';
import { EsriModuleLoader } from '../map-core/esri-module.loader';
import { EsriModuleEnum } from '../map-core/map.model';
import esri = __esri;
import { EsriTypeFactory } from '../map-core/esri-type.factory';

@Injectable()
export class SketchService {
    private _map: esri.Map = null;
    private _mapView: esri.MapView = null;

    constructor(private esriModuleLoader: EsriModuleLoader, private esriTypeFactory: EsriTypeFactory) {
    }
    async init(map: esri.Map, mapView: esri.MapView) {
        this._map = map;
        this._mapView = mapView;
        await this.esriModuleLoader.loadModules([
            EsriModuleEnum.Sketch
        ]);
    }
    startNewPolygon() {
        
    }
}
