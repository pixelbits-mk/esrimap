import esri = __esri;
import { EsriModuleLoader } from '../esri-module.loader';
import { EsriTypeFactory } from '../esri-type.factory';
import { EsriModuleEnum, LatLng, Polygon } from '../map.model';
import { Subject, Observable } from 'rxjs';
import { EsriUtility } from '../esri.utility';
import { Injectable } from '@angular/core';

@Injectable()
export class PolygonEditMap {
    originalLayer: esri.GraphicsLayer;
    editLayer: esri.GraphicsLayer;

    constructor(private esriModuleLoader: EsriModuleLoader, private esriTypeFactory: EsriTypeFactory, private esriUtility: EsriUtility) {
    }
    async init(layer: esri.GraphicsLayer, properties: { [key: string]: any }) {
        this.originalLayer = layer;

        await this.esriModuleLoader.loadModules([
            EsriModuleEnum.Sketch,
            EsriModuleEnum.GraphicsLayer
        ]);

        this.originalLayer.visible = false;
        this.editLayer = this.esriTypeFactory.create(EsriModuleEnum.GraphicsLayer, properties);
        this.originalLayer.graphics.forEach(t => {
            this.editLayer.graphics.add(t.clone());
        });
        const map = this.originalLayer.get('map');
        alert(map);

    }
}
