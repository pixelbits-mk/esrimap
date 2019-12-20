import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { MapService } from './map-core/map.service';
import { EsriMap } from './map-core/esri-map';
import { MatSelectChange } from '@angular/material/select';
import { EsriDynamicTypeFactory } from './map-core/esri-dynamic-type.factory';

import esri = __esri;
import { EsriModuleEnum } from './map-core/map.model';
import { ServiceZoneMap } from './map-core/map-types/service-zone.map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('map', { static: true, read: ElementRef })
  map: ElementRef;

  @ViewChild('calendar', { static: true, read: ElementRef })
  calendar: ElementRef;


  @ViewChild('topbar', { static: true, read: ElementRef })
  topbar: ElementRef;

  @ViewChild('basemapSelector', { static: true, read: ElementRef })
  basemapSelector: ElementRef;

  @ViewChild('ordersList', { static: true, read: ElementRef })
  ordersList: ElementRef;

  @ViewChild('vehiclesList', { static: true, read: ElementRef })
  vehiclesList: ElementRef;

  @ViewChild('sidenav', { static: true, read: ElementRef })
  sidenav: ElementRef;

  esriMap: EsriMap;
  serviceZoneMap: ServiceZoneMap;

  constructor(private mapService: MapService, private factory: EsriDynamicTypeFactory) {
  }
  async ngOnInit() {
    this.esriMap = await this.mapService.createMap(this.map.nativeElement, { basemap: 'topo' });
    this.esriMap.mapView.ui.components = ['attribution'];
    this.serviceZoneMap = await this.mapService.createServiceZoneMap(this.esriMap.map.graphicsLayer, )

    const zoom = await this.factory.create<esri.Zoom>(EsriModuleEnum.Zoom, { view: this.esriMap.mapView });
    this.esriMap.add(zoom, { position: 'bottom-right', index: 0 });
    this.esriMap.add(this.topbar.nativeElement, { position: 'manual', index: 0 });
    this.esriMap.add(this.ordersList.nativeElement, { position: 'top-left', index: 1 });
    this.esriMap.add(this.vehiclesList.nativeElement, { position: 'top-right', index: 2 });
    this.esriMap.add(this.basemapSelector.nativeElement, { position: 'top-right', index: 3 });
    this.esriMap.add(this.sidenav.nativeElement, { position: 'manual', index: 4 });
    this.esriMap.add(this.calendar.nativeElement, { position: 'manual', index: 5});

  }

}
