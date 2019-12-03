import esri = __esri;
import { EsriModuleLoader } from '../esri-module.loader';
import { EsriTypeFactory } from '../esri-type.factory';
import { EsriModuleEnum, LatLng, Polygon } from '../map.model';
import { Subject, Observable } from 'rxjs';
import { EsriUtility } from '../esri.utility';
import { Injectable } from '@angular/core';

@Injectable()
export class PolygonEditorMap {
    map: esri.Map;
    mapView: esri.MapView;
    sketch: esri.Sketch;
    graphicsLayer: esri.GraphicsLayer;
    editing: boolean;
    graphics: esri.Graphic[];
    graphicsSubject: Subject<esri.Graphic[]>;
    graphics$: Observable<esri.Graphic[]>;
    properties: any;

    constructor(private esriModuleLoader: EsriModuleLoader, private esriTypeFactory: EsriTypeFactory, private esriUtility: EsriUtility) {
        this.editing = false;
        this.graphicsSubject = new Subject<esri.Graphic[]>();
        this.graphics$ = this.graphicsSubject.asObservable();
    }
    async init(container: HTMLElement, properties: any) {
        this.map = properties.map;
        this.mapView = properties.mapView;
        this.graphics = [];
        this.properties = properties;

        await this.esriModuleLoader.loadModules([
            EsriModuleEnum.GraphicsLayer,
            EsriModuleEnum.Sketch,
            EsriModuleEnum.WebMercatorUtils
        ]);

        this.graphicsLayer = this.esriTypeFactory.create<esri.GraphicsLayer>(EsriModuleEnum.GraphicsLayer);
        this.map.layers.add(this.graphicsLayer);

        return this;
    }


    startEditor() {
        if (!this.editing) {
            this.graphicsLayer.graphics.removeAll();
            if (this.properties.graphicsLayer) {
                this.properties.graphicsLayer.graphics.forEach(t => {
                    if (t.geometry.type === 'polygon') {
                        this.graphics.push(t.clone());
                    }
                });
            }
            this.sketch = this.esriTypeFactory.create<esri.Sketch>(
                EsriModuleEnum.Sketch, {
                layer: this.graphicsLayer,
                view: this.mapView
            });
            // Listen to sketch widget's create event.
            this.sketch.on('create', (event) => {
                // check if the create event's state has changed to complete indicating
                // the graphic create operation is completed.
                if (event.state === 'complete') {
                    if (event.graphic.geometry.type === 'polygon') {
                        this.graphics.push(event.graphic);
                    }
                }
            });
            this.sketch.on('update', (event) => {
                if (event.state === 'complete') {

                }
            });
            this.editing = true;
        }

    }
    exitEditor() {
        if (this.editing) {
            this.graphicsLayer.graphics.forEach(t => {
                t.destroy();
            });
            this.graphicsLayer.removeAll();

            if (this.sketch) {
                this.sketch.cancel();
                this.sketch.destroy();
                this.sketch = null;
            }
            this.editing = false;
        }
    }
    startPolygon() {
        setTimeout(() => {
            this.sketch.create('polygon');
        });
    }

    exitPolygon() {
        this.sketch.cancel();
    }

    completePolygon() {
        if (this.sketch) {
            this.graphicsSubject.next(this.graphics);
        }
    }

    getPolygon() {

        const coordinates = this.graphics
            .map(t => t.geometry as esri.Polygon)
            .map(t => t.rings[0].map(x => this.esriUtility.xyToLngLat(x[0], x[1])));
        return coordinates;
    }

    destroy() {
        if (this.graphicsLayer) {
            this.map.layers.remove(this.graphicsLayer);
            this.graphicsLayer.destroy();
        }
    }
}
