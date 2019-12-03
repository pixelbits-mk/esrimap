import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MapService } from './map-core/map.service';
import { EsriMap } from './map-core/esri-map';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('map', { static: true, read: ElementRef  })
  map: ElementRef;

  @ViewChild('basemapSelector', { static: true, read: ElementRef})
  basemapSelector: ElementRef;

  @ViewChild('ordersList', { static: true, read: ElementRef})
  ordersList: ElementRef;

  esriMap: EsriMap;

  constructor(private mapService: MapService) {
  }
  async ngOnInit() {
    this.esriMap =  await this.mapService.createMap(this.map.nativeElement, { basemap: 'topo'});
    this.esriMap.mapView.ui.components = ['attribution'];
    this.esriMap.mapView.ui.add(this.ordersList.nativeElement, 'top-left');
    this.esriMap.mapView.ui.add(this.basemapSelector.nativeElement, 'top-right');
  }


}
