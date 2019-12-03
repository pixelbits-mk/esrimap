
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
}
