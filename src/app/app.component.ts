import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MapService } from './map-core/map.service';
import esri = __esri;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('map', { static: true, read: ElementRef  })
  map: ElementRef;
  title = 'map';
  constructor(private mapService: MapService) {
  }
  async ngOnInit() {
    const esriMap = await this.mapService.createMap(this.map.nativeElement);
    const map = esriMap.get<esri.Map>('map');
    const mapView = esriMap.get<esri.MapView>('mapView');
  
    this.mapService.createPolygonEditMap(map.);
  }
}
