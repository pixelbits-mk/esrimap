import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapCoreModule } from './map-core/map-core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BasemapComponent } from './basemap/basemap.component';

@NgModule({
   declarations: [
      AppComponent,
      BasemapComponent
   ],
   imports: [
      BrowserModule,
      MapCoreModule,
      MaterialModule,
      BrowserAnimationsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
