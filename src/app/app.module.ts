import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapCoreModule } from './map-core/map-core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BasemapComponent } from './basemap/basemap.component';
import { OrdersComponent } from './orders/orders.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TippyModule } from 'ng-tippy';
import { NgxPopperModule } from 'ngx-popper';
import { VehiclesComponent } from './vehicles/vehicles.component';

@NgModule({
   declarations: [
      AppComponent,
      BasemapComponent,
      OrdersComponent,
      SidenavComponent,
      VehiclesComponent
   ],
   imports: [
      BrowserModule,
      MapCoreModule,
      MaterialModule,
      BrowserAnimationsModule,
      TippyModule,
      NgxPopperModule.forRoot()
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
