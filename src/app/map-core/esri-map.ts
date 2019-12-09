import esri = __esri;
import { EsriTypeFactory } from './esri-type.factory';
import { EsriModuleLoader } from './esri-module.loader';
import { EsriModuleEnum, LatLng } from './map.model';
import { Injectable } from '@angular/core';

@Injectable()
export class EsriMap {
    map: esri.Map;
    mapView: esri.MapView;
    pin: esri.Graphic;
    graphicsLayer: esri.GraphicsLayer;
    constructor(private esriModuleLoader: EsriModuleLoader, private esriTypeFactory: EsriTypeFactory) {

    }
    get<T>(property: string) {
        if (!this[property]) {
            throw new Error(`property ${property} does not exist on type EsriMap`);
        }
        return this[property] as T;
    }

    async init(container: HTMLElement, properties: any) {
        await this.esriModuleLoader.loadModules([
            EsriModuleEnum.Map,
            EsriModuleEnum.MapView,
            EsriModuleEnum.GraphicsLayer,
            EsriModuleEnum.Graphic
        ]);


        this.map = this.esriTypeFactory.create<esri.Map>(
            EsriModuleEnum.Map,
            Object.assign({ basemap: 'streets-navigation-vector' }, properties));

        this.mapView = this.esriTypeFactory.create<esri.MapView>(
            EsriModuleEnum.MapView,
            Object.assign(properties, { map: this.map, container }));
        this.graphicsLayer = this.esriTypeFactory.create<esri.GraphicsLayer>(
            EsriModuleEnum.GraphicsLayer);
        this.map.layers.add(this.graphicsLayer);
        if (properties.point) {
            this.setPoint(properties.point as LatLng);
            this.center();
        }


        return this;

    }
    setPoint(point: LatLng) {
        const iconPath = 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z';
        const simpleMarkerSymbol = {
            type: 'simple-marker',
            path: iconPath,
            color: 'red',
            size: '30px',  // pixels
            outline: {  // autocasts as new SimpleLineSymbol()
                color: 'red',
                width: 0  // points
            }
        };


        // do something with the result graphic
        const mapPoint = { type: 'point', latitude: point.lat, longitude: point.lng };
        this.pin = this.esriTypeFactory.create<esri.Graphic>(
            EsriModuleEnum.Graphic, { geometry: mapPoint, symbol: simpleMarkerSymbol });

        this.graphicsLayer.graphics.removeAll();
        this.graphicsLayer.graphics.add(this.pin);

        return this;
    }
    center() {
        if (this.pin) {
            this.mapView.goTo(this.pin);
        }
    }

    destroy() {
        this.map.destroy();
        this.mapView.destroy();
    }
    add(component: string | esri.Widget | HTMLElement | esri.UIAddComponent, position?: string | esri.UIAddPosition) {
        this.mapView.ui.add(component, position);
    }
}
