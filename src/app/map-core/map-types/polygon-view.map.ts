import esri = __esri;
import { EsriTypeFactory } from '../esri-type.factory';
import { EsriModuleLoader } from '../esri-module.loader';
import { EsriModuleEnum, LatLng, Polygon } from '../map.model';
import { Injectable } from '@angular/core';

@Injectable()
export class PolygonViewMap {
    map: esri.Map;
    mapView: esri.MapView;
    pin: esri.Graphic;
    graphicsLayer: esri.GraphicsLayer;
    polygons: Polygon[] = [];

    hoverGraphic: esri.Graphic;
    zoneLabel: HTMLElement;
    zoneToggle: HTMLInputElement;

    get defaultSymbol() {
        return {
            type: 'simple-fill', // autocasts as new SimpleFillSymbol()
            color: [117, 150, 248, 0.38],
            outline: {
                // autocasts as new SimpleLineSymbol()
                color: [117, 150, 248],
                width: 1,
                style: 'short-dot'
            }
        };
    }
    get highlightSymbol() {
        return {
            type: 'simple-fill', // autocasts as new SimpleFillSymbol()
            color: [255, 158, 108, 0.42],
            outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 158, 108],
                width: 1,
                style: 'short-dot'
            }
        };
    }

    constructor(private esriModuleLoader: EsriModuleLoader, private esriTypeFactory: EsriTypeFactory) {

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
            { basemap: 'streets-navigation-vector' });

        this.mapView = this.esriTypeFactory.create<esri.MapView>(
            EsriModuleEnum.MapView,
            Object.assign(properties, { map: this.map, container }));

        this.graphicsLayer = this.esriTypeFactory.create<esri.GraphicsLayer>(
            EsriModuleEnum.GraphicsLayer);

        this.map.layers.add(this.graphicsLayer);

        if (properties.polygons) {
            this.polygons = properties.polygons;
        }
        this.zoneLabel = document.createElement('div');
        this.zoneLabel.id = 'zone-name';
        container.appendChild(this.zoneLabel);

        this.zoneToggle = document.getElementById('zoneLayer') as HTMLInputElement;
        this.zoneToggle.addEventListener('change', () => {
            this.graphicsLayer.graphics.forEach(t => {
                t.visible = this.zoneToggle.checked;
            });
            if (this.zoneToggle.checked) {
                this.zoom(this.polygons);
            }
          });
        const layerToggle = document.getElementById('layerToggle');
        this.mapView.ui.add(layerToggle, 'top-right');

        this.mapView.on('pointer-move', (evt) => {
            evt.stopPropagation();
            const screenPoint = {
                x: evt.x,
                y: evt.y
            };

            this.mapView.hitTest(screenPoint).then((response) => {
                const graphic = response.results[0].graphic;
                this.highlightGraphic(graphic);
            });
        });

        return this;

    }
    highlightGraphic(graphic: esri.Graphic) {
        this.graphicsLayer.graphics.forEach(t => {
            t.symbol = this.defaultSymbol as any;
            if (!this.zoneToggle.checked) {
                t.visible = false;
            }
        });
        if (graphic.geometry != null) {
            const scrPoint = this.mapView.toScreen((graphic.geometry as esri.Polygon).centroid as esri.Point);
            if (scrPoint && graphic.attributes.title) {
                this.zoneLabel.style.left = scrPoint.x + 'px';
                this.zoneLabel.style.top = scrPoint.y + 'px';
                this.zoneLabel.classList.add('show');
                this.zoneLabel.classList.remove('hide');
                this.zoneLabel.innerHTML = `<span class="label label-primary">${graphic.attributes.title}</span>`;
            }


            this.hoverGraphic = graphic;
            this.hoverGraphic.symbol = this.highlightSymbol as any;
            if (!this.zoneToggle.checked) {
                this.hoverGraphic.visible = true;
            }
        } else {
            this.zoneLabel.classList.remove('show');
            this.zoneLabel.classList.add('hide');
            this.hoverGraphic.symbol = this.defaultSymbol as any;
            this.hoverGraphic = null;
        }
    }

    render() {
        this.polygons.forEach(t => {
            // Create a polygon geometry
            const polygon = {
                type: 'polygon', // autocasts as new Polygon()
                rings: [t.paths.map(x => [x.lng, x.lat])]
            };

            // Add the geometry and symbol to a new graphic
            const graphic = this.esriTypeFactory.create<esri.Graphic>(
                EsriModuleEnum.Graphic, {
                geometry: polygon,
                symbol: this.defaultSymbol,
                attributes: Object.assign({ polygon: t }, t.attributes)
            });

            this.graphicsLayer.graphics.add(graphic);
        });
    }
    highlight(polygon: Polygon) {
        const graphic = this.graphicsLayer.graphics.toArray().find(t => t.attributes.polygon === polygon);
        if (graphic) {
            this.highlightGraphic(graphic);
        }
    }

    zoom(polygons: Polygon[] = []) {
        const graphics = this.graphicsLayer.graphics.toArray().filter(t => polygons.indexOf(t.attributes.polygon) >= 0);
        return this.mapView.goTo({ target: graphics });
    }


    destroy() {
        this.map.destroy();
        this.mapView.destroy();
        if (this.graphicsLayer) {
            this.map.layers.remove(this.graphicsLayer);
            this.graphicsLayer.destroy();
        }
    }

}
