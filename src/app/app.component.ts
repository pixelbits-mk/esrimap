import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MapService } from './map-core/map.service';

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
  ngOnInit() {
    this.mapService.createMap(this.map.nativeElement);
  }
}
