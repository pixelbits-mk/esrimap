import { Injectable, Inject, ElementRef } from '@angular/core';
import { EsriModuleEnum, Polygon } from './map.model';
import { loadModules } from 'esri-loader';
import esri = __esri;
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { EsriTypeFactory } from './esri-type.factory';
import { EsriModuleLoader } from './esri-module.loader';
import { filter, shareReplay, share, refCount } from 'rxjs/operators';
import { EsriMap } from './esri-map';
import { LocationSelectMap } from './map-types/location-select.map';
import { PolygonEditorMap } from './map-types/polygon-editor.map';
import { EsriUtility } from './esri.utility';
import { PolygonViewMap } from './map-types/polygon-view.map';
import { ServiceZoneMap } from './map-types/service-zone.map';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private esriModuleLoader: EsriModuleLoader, private esriTypeFactory: EsriTypeFactory, private esriUtility: EsriUtility) {
  }

  async createMap(container: HTMLElement, properties: any = {}) {
    this.esriModuleLoader.loadCss();
    return await new EsriMap(this.esriModuleLoader, this.esriTypeFactory).init(container, properties);
  }

  async createLocationSelectMap(container: HTMLElement, properties: any = {}) {
    this.esriModuleLoader.loadCss();
    return await new LocationSelectMap(this.esriModuleLoader, this.esriTypeFactory).init(container, properties);
  }
  async createPolygonEditorMap(container: HTMLElement, properties: any = {}) {
    this.esriModuleLoader.loadCss();
    return await new PolygonEditorMap(this.esriModuleLoader, this.esriTypeFactory, this.esriUtility).init(container, properties);
  }

  async createPolygonViewMap(container: HTMLElement, properties: any = {}) {
    this.esriModuleLoader.loadCss();
    return await new PolygonViewMap(this.esriModuleLoader, this.esriTypeFactory).init(container, properties);

  }
  async createServiceZoneMap(graphicsLayer: esri.GraphicsLayer, activePolygons: Polygon[], surroundingPolygons: Polygon[]) {
    return await new ServiceZoneMap(this.esriModuleLoader, this.esriTypeFactory);
  }
}
