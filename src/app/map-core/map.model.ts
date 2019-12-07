import esri = __esri;
import { InjectionToken } from '@angular/core';

export const API_KEY_TOKEN = new InjectionToken('Map API key access token');

export class MapConfig {
    apiKey: string;
}

export enum EsriModuleEnum {
    Circle = 'esri/geometry/Circle',
    Draw = 'esri/views/draw/Draw',
    Graphic = 'esri/Graphic',
    GraphicsLayer = 'esri/layers/GraphicsLayer',
    Map = 'esri/Map',
    MapView = 'esri/views/MapView',
    Polyline = 'esri/geometry/Polyline',
    SimpleMarkerSymbol = 'esri/symbols/SimpleMarkerSymbol',
    SimpleLineSymbol = 'esri/symbols/SimpleLineSymbol',
    Editor = 'esri/widgets/Editor',
    PopupTemplate = 'esri/PopupTemplate',
    Search = 'esri/widgets/Search',
    Sketch = 'esri/widgets/Sketch',
    WebMercatorUtils = 'esri/geometry/support/webMercatorUtils',
    Zoom = 'esri/widgets/Zoom'
}

export class LatLng {
    lat: number;
    lng: number;
}

export enum MapItemEnum {
    vehicle = 'vehicle',
    order = 'order',
    containerStorages= 'containerStorages',
    temporaryContainerStorages= 'temporaryContainerStorages',
    disposalSites = 'disposalSites',
    garages = 'garages',
    zones= 'zones'
}

export enum MapItemPathEnum {
    vehicleHeavy = 'assets/vehicle-heavy-load.svg',
    vehicleLight = 'assets/vehicle-light-load.svg',
    vehicleMed = 'assets/vehicle-med-load.svg',
    order = 'assets/order-green.svg',
    vehicle = 'assets/vehicle-heavy-load.svg',
    orderBlue = 'assets/order-blue.svg',
    orderGreen = 'assets/order-green.svg',
    orderRed =  'assets/order-red.svg',
    orderYellow = 'assets/order-yellow.svg',
    containerStorages= 'assets/container-storage.svg',
    temporaryContainerStorages= 'assets/container-storage-grey.svg',
    ContainerStoragesInactive= 'assets/container-storage-grey.svg',
    disposalSites = 'assets/disposal-site.svg',
    disposalSitesInactive = 'assets/disposal-site-grey.svg',
    garages = 'assets/garage.svg'
}


export interface MapItem {
    type: MapItemEnum;
    path: MapItemPathEnum;
    height: any;
    width: any;
}
export class Polygon {
    attributes: { [key: string]: any };
    paths: LatLng[];
}
