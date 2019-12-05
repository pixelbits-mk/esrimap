import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { EsriMap } from '../map-core/esri-map';
import { Basemap } from './basemap.model';

@Component({
  selector: 'app-basemap',
  templateUrl: './basemap.component.html',
  styleUrls: ['./basemap.component.css']
})
export class BasemapComponent implements OnInit {
  @ViewChild('changeMaps', { static: true, read: ElementRef })
  changeMaps: ElementRef;

  @Input()
  set initialBasemap(value: string) {
    this.selectedIndex = this.basemaps.findIndex(t => t.key === value);
  }
  get basemap(): Basemap {
    return this.selectedIndex >= 0 ? this.basemaps[this.selectedIndex] : null;
  }

  @Input()
  esriMap: EsriMap;

  selectedIndex: number;

  basemaps: Basemap[] = [
    { key: 'topo', label: 'Topology', imageUrl: 'https://js.arcgis.com/4.13/esri/images/basemap/topo.jpg' },
    { key: 'streets', label: 'Streets', imageUrl: 'https://js.arcgis.com/4.13/esri/images/basemap/streets.jpg' },
    { key: 'satellite', label: 'Satellite', imageUrl: 'https://js.arcgis.com/4.13/esri/images/basemap/satellite.jpg' },
    { key: 'hybrid', label: 'Hybrid', imageUrl: 'https://js.arcgis.com/4.13/esri/images/basemap/hybrid.jpg' },
    { key: 'streets-navigation-vector', label: 'Navigation', imageUrl: 'https://js.arcgis.com/4.13/esri/images/basemap/streets.jpg' }
  ];


  constructor() { }

  ngOnInit() {
    if (this.esriMap && this.basemap) {
      this.selectedIndex = this.basemaps.findIndex(t => t.key === this.basemap.key);
      this.esriMap.map.basemap = this.basemap as any;
    }
  }

  onToggleBasemap() {
    const nextIndex = (this.selectedIndex + 1) % this.basemaps.length;
    this.setBasemap(this.basemaps[nextIndex].key);
  }

  setBasemap(key: string) {
    if (this.esriMap) {
      this.esriMap.map.basemap = key as any;
      this.selectedIndex = this.basemaps.findIndex(t => t.key === key);
    }
  }

}
