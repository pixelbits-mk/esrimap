import esri = __esri;
import { EsriTypeFactory } from './esri-type.factory';
import { EsriModuleLoader } from './esri-module.loader';
import { EsriModuleEnum, LatLng, Polygon } from './map.model';
import { Injectable } from '@angular/core';
import { EsriUtility } from './esri.utility';

@Injectable()
export class EsriMap {
    map: esri.Map;
    mapView: esri.MapView;
    pin: esri.Graphic;
    graphicsLayer: esri.GraphicsLayer;
    sketch: esri.Sketch;
    polygons: Polygon[] = [];
    constructor(private esriModuleLoader: EsriModuleLoader, private esriTypeFactory: EsriTypeFactory, private esriUtility: EsriUtility) {

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

        // this.sketch = this.esriTypeFactory.create<esri.Sketch>(
        //     EsriModuleEnum.Sketch, {
        //     layer: this.graphicsLayer,
        //     view: this.mapView,
        //     availableCreateTools: ['polygon']
        // });

        // const tmp = {
        //     type: 'polygon',
        //     rings: [
        //         [-12247861.549207836, 8400327.368091738],
        //         [-11357523.04374234, 8400327.368091738],
        //         [-11285774.053664627, 6273950.983063497],
        //         [-12247861.549207836, 6277212.395797711],
        //         [-12247861.549207836, 8400327.368091738]],
        //         // [-49.628891944872386, 67.69832908568742],
        //         //  [4.746093749998766, 63.02175012898493],
        //         // [-19.62889909743754, 23.02581046180808],
        //         // [-82.44140624997861, 34.885930940745325],
        //         // [-49.628891944872386, 67.69832908568742]],
        //     spatialReference: {
        //             wkid:  3857
        //     }
        // };
        // const graphic = this.esriTypeFactory.create<esri.Graphic>(EsriModuleEnum.Graphic, {
        //     geometry: tmp,
        //     symbol: {
        //         type: 'simple-fill', // autocasts as new SimpleFillSymbol()
        //         color: [117, 150, 248, 0.38],
        //         outline: {
        //           // autocasts as new SimpleLineSymbol()
        //           color: [117, 150, 248],
        //           width: 1
        //         }
        //     }
        // });
        // this.graphicsLayer.graphics.push(graphic);

        // this.mapView.ui.add(this.sketch, 'top-right');
        // setTimeout(() => {
        //     this.sketch.viewModel.update(graphic, { tool: 'transform'});
        // }, 2000);

        // Listen to sketch widget's create event.
        // this.sketch.on('create', (event) => {
        //     // check if the create event's state has changed to complete indicating
        //     // the graphic create operation is completed.
        //     if (event.state === 'complete') {
        //         const esriPolygon = event.graphic.geometry as esri.Polygon;
        //         event.graphic.symbol = {
        //             type: 'simple-fill', // autocasts as new SimpleFillSymbol()
        //             color: [117, 150, 248, 0.38],
        //             outline: {
        //               // autocasts as new SimpleLineSymbol()
        //               color: [117, 150, 248],
        //               width: 1
        //             }
        //         } as any;

        //         const polygon = new Polygon();
        //         polygon.paths = esriPolygon.rings[0].map(t => this.esriUtility.xyToLngLat(t[0], t[1]));
        //         polygon.coordinates = this.esriUtility.getCoordinates(this.mapView, esriPolygon);
        //         this.polygons.push(polygon);
        //         console.log(this.polygons);
        //     }
        // });
        return this;

    }


    destroy() {
        this.map.destroy();
        this.mapView.destroy();
    }
    add(component: string | esri.Widget | HTMLElement | esri.UIAddComponent, position?: string | esri.UIAddPosition) {
        this.mapView.ui.add(component, position);
    }

}
