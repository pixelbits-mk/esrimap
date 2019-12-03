import esri = __esri;
import { EsriMap } from '../esri-map';
import { EsriTypeFactory } from '../esri-type.factory';
import { EsriModuleEnum, LatLng } from '../map.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { EsriModuleLoader } from '../esri-module.loader';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class LocationSelectMap {
    map: esri.Map;
    mapView: esri.MapView;
    graphicsLayer: esri.GraphicsLayer;
    editing: boolean;
    pin: esri.Graphic;

    pointSubject: BehaviorSubject<LatLng>;
    public pointChange$: Observable<LatLng>;

    constructor(private esriModuleLoader: EsriModuleLoader, private esriTypeFactory: EsriTypeFactory) {
        this.pointSubject = new BehaviorSubject<LatLng>(null);
        this.pointChange$ = this.pointSubject.asObservable().pipe(filter(t => t != null));
        this.editing = false;
    }

    async init(container: HTMLElement, properties: any) {
        this.map = properties.map;
        this.mapView = properties.mapView;


        await this.esriModuleLoader.loadModules([
            EsriModuleEnum.Graphic,
            EsriModuleEnum.GraphicsLayer,
            EsriModuleEnum.SimpleMarkerSymbol,
            EsriModuleEnum.PopupTemplate
        ]);
        this.graphicsLayer = this.esriTypeFactory.create<esri.GraphicsLayer>(
            EsriModuleEnum.GraphicsLayer);


        this.map.layers.add(this.graphicsLayer);
        this.mapView.on('immediate-click', (evt: any) => {
            if (this.editing) {
                evt.stopPropagation();
                const screenPoint = evt;
                this.mapView.hitTest(screenPoint)
                    .then((response) => {
                        const mapPoint = response.results[0].mapPoint;
                        this.setPoint({ lat: mapPoint.latitude, lng: mapPoint.longitude });

                        // this.mapView.whenLayerView(this.graphicsLayer).then((layerView) => {
                        // });
                    });
            }
        });

        this.mapView.on('drag', (evt) => {
            if (this.editing) {
                evt.stopPropagation();
                const screenPoint = {
                    x: evt.x,
                    y: evt.y
                };

                this.mapView.hitTest(screenPoint).then((response) => {
                    const graphic = response.results[0].graphic;

                    if (graphic) {

                        const mapPoint = response.results[0].mapPoint;
                        const point = { lat: mapPoint.latitude, lng: mapPoint.longitude };

                        this.setPoint(point);
                    }
                });
            }
        });

        if (properties.point) {
            this.setPoint(properties.point);
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
        this.pointSubject.next({ lat: mapPoint.latitude, lng: mapPoint.longitude });
        return this;
    }
    center() {
        if (this.pin) {
            this.mapView.goTo(this.pin);
        }
    }

    startEditor() {
        this.editing = true;
    }
    stopEditor() {
        this.editing = false;
    }

    destroy() {
        if (this.graphicsLayer) {
            this.map.layers.remove(this.graphicsLayer);
            this.graphicsLayer.destroy();
        }
        this.map.destroy();
        this.mapView.destroy();
    }

}
