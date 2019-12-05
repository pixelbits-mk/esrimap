import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapCoreModule } from './map-core/map-core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BasemapComponent } from './basemap/basemap.component';
import { OrdersComponent } from './orders/orders.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TestComponent } from './test/test.component';
import { TippyModule } from 'ng-tippy';
import { PillSelectComponent } from './pill-select/pill-select.component';

@NgModule({
   declarations: [
      AppComponent,
      BasemapComponent,
      OrdersComponent,
      SidenavComponent,
      TestComponent,
      PillSelectComponent
   ],
   imports: [
      BrowserModule,
      MapCoreModule,
      MaterialModule,
      BrowserAnimationsModule,
      TippyModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
