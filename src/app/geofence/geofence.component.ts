import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MapFactory } from '../map-core/map.factory';
import { EsriDynamicTypeFactory } from '../map-core/esri-dynamic-type.factory';
import { EsriMap } from '../map-core/esri-map';
import { EsriModuleEnum } from '../map-core/map.model';
import esri = __esri;
import { SketchService } from './sketch.service';

@Component({
  selector: 'app-geofence',
  templateUrl: './geofence.component.html',
  styleUrls: ['./geofence.component.css'],
  providers: [
    SketchService
  ]
})
export class GeofenceComponent implements OnInit {
  @ViewChild('map', { static: true, read: ElementRef })
  map: ElementRef;

  @ViewChild('addButton', { static: true, read: ElementRef })
  addButton: ElementRef;

  @ViewChild('editButton', { static: true, read: ElementRef })
  editButton: ElementRef;

  esriMap: EsriMap;

  constructor(private sketchService: SketchService, private mapFactory: MapFactory, private factory: EsriDynamicTypeFactory) { }

  async ngOnInit() {
    this.esriMap = await this.mapFactory.createMap(this.map.nativeElement, { basemap: 'topo' });
    this.esriMap.mapView.ui.components = ['attribution'];

    const zoom = await this.factory.create<esri.Zoom>(EsriModuleEnum.Zoom, { view: this.esriMap.mapView });
    this.esriMap.add(zoom, { position: 'bottom-right', index: 0 });
    this.esriMap.add(this.addButton.nativeElement, { position: 'top-right', index: 0});
    this.esriMap.add(this.editButton.nativeElement, { position: 'top-right', index: 1});

    await this.sketchService.init(this.esriMap.map, this.esriMap.mapView);
  }
  onAddGeofence() {
    this.sketchService.startNewPolygon();
  }
}
