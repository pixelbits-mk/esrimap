import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { MapFactory } from './map-core/map.factory';
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

  constructor() {
  }
  ngOnInit() {


  }

}
