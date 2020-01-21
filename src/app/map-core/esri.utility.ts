
import { EsriModuleLoader } from './esri-module.loader';
import { Injectable } from '@angular/core';
import { EsriTypeFactory } from './esri-type.factory';
import { EsriModuleEnum, LatLng } from './map.model';
import esri = __esri;

@Injectable({
    providedIn: 'root'
})
export class EsriUtility {
    get WebMercatorUtils() {
        return this.esriTypeFactory.getType<esri.webMercatorUtils>(EsriModuleEnum.WebMercatorUtils);
    }
    constructor(private esriTypeFactory: EsriTypeFactory) {
    }
    xyToLngLat(x: number, y: number): LatLng {
      const points = this.WebMercatorUtils.xyToLngLat(x, y);
      return  {
        lng: points[0],
        lat: points[1]
      };
    }
    lngLatToXy(lng: number, lat: number): number[] {
      return this.WebMercatorUtils.lngLatToXY(lng, lat);
    }

    getCoordinates(mapView: esri.MapView, esriPolygon: esri.Polygon) {
      return {
        map: esriPolygon.rings[0].map(t => this.xyToLngLat(t[0], t[1])),
        geographic: esriPolygon.rings[0],
        screen:
            esriPolygon.rings[0]
            .map(t => ({
                type: 'point',
                x: t[0],
                y: t[1],
                spatialReference: {
                    wkid: 3857
                }
            } as esri.Point))
            .map(x => mapView.toScreen(x))
            .map(t => ({ top: t.y, left: t.x }))
      };
    }
}
