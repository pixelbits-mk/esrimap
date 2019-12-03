import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { EsriMap } from '../map-core/esri-map';

@Component({
  selector: 'app-basemap',
  templateUrl: './basemap.component.html',
  styleUrls: ['./basemap.component.css']
})
export class BasemapComponent implements OnInit {
  @ViewChild('changeMaps', { static: true, read: ElementRef })
  changeMaps: ElementRef;

  @Input()
  basemap: string;

  @Input()
  esriMap: EsriMap;


  constructor() { }

  ngOnInit() {
    if (this.esriMap && this.basemap) {
      this.esriMap.map.basemap = this.basemap as any;
    }
  }

  onSelectionChange(map: MatSelectChange) {
    if (this.esriMap) {
      this.esriMap.map.basemap = map.value as any;
    }
  }
}
