import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { MapService } from './map-core/map.service';
import { EsriMap } from './map-core/esri-map';
import { MatSelectChange } from '@angular/material/select';
import { EsriDynamicTypeFactory } from './map-core/esri-dynamic-type.factory';

import esri = __esri;
import { EsriModuleEnum } from './map-core/map.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('map', { static: true, read: ElementRef })
  map: ElementRef;

  @ViewChild('basemapSelector', { static: true, read: ElementRef })
  basemapSelector: ElementRef;

  @ViewChild('ordersList', { static: true, read: ElementRef })
  ordersList: ElementRef;

  @ViewChild('sidenav', { static: true, read: ElementRef })
  sidenav: ElementRef;

  esriMap: EsriMap;

  constructor(private mapService: MapService, private factory: EsriDynamicTypeFactory) {
  }
  async ngOnInit() {
    this.esriMap = await this.mapService.createMap(this.map.nativeElement, { basemap: 'topo' });
    this.esriMap.mapView.ui.components = ['attribution'];
    this.esriMap.add(this.ordersList.nativeElement, 'top-left');
    this.esriMap.add(this.basemapSelector.nativeElement, 'top-right');
    this.esriMap.add(this.sidenav.nativeElement, 'manual');
    const zoom = await this.factory.create<esri.Zoom>(EsriModuleEnum.Zoom, { view: this.esriMap.mapView });
    this.esriMap.add(zoom, 'bottom-right');

  }

  test() {
    alert('hey');
  }

}
