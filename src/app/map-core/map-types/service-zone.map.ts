import esri = __esri;
import { EsriTypeFactory } from '../esri-type.factory';
import { EsriModuleLoader } from '../esri-module.loader';
import { EsriModuleEnum, LatLng, Polygon } from '../map.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ServiceZoneMap {
    activeZones: Polygon[] = [];
    surroundingZones: Polygon[] = [];
    graphicsLayer: esri.GraphicsLayer;

    constructor(private esriModuleLoader: EsriModuleLoader, private esriTypeFactory: EsriTypeFactory) {
    }

    async init(map: esri.Map, activeZones: Polygon[], surroundingZones: []) {
        await this.esriModuleLoader.loadModules([
            EsriModuleEnum.Map,
            EsriModuleEnum.MapView,
            EsriModuleEnum.GraphicsLayer,
            EsriModuleEnum.Graphic
        ]);
        this.graphicsLayer = this.esriTypeFactory.create(EsriModuleEnum.GraphicsLayer);
        this.drawPolygons(this.activeZones);

    }

    drawPolygons(polygons: Polygon[]) {
        
    }


}
