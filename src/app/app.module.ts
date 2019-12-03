import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapCoreModule } from './map-core/map-core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MapCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
