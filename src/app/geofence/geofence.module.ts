import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MapCoreModule } from '../map-core/map-core.module';
import { MaterialModule } from '../material/material.module';


import { GeofenceComponent } from './geofence.component';
import { CommonModule } from '@angular/common';

@NgModule({
   declarations: [
      GeofenceComponent
   ],
   imports: [
      CommonModule,
      MapCoreModule,
      MaterialModule
   ],
   exports: [
      GeofenceComponent
   ],
   providers: [],

})
export class GeofenceModule { }
