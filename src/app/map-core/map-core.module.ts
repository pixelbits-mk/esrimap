import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from './map.service';
import { EsriTypeFactory } from './esri-type.factory';
import { EsriModuleLoader } from './esri-module.loader';
import { MapConfig, API_KEY_TOKEN } from './map.model';
import { HttpClientModule } from '@angular/common/http';
import { EsriUtility } from './esri.utility';

@NgModule({
  imports: [
  ],
  declarations: [
  ],
  providers: [
  ]
})
export class MapCoreModule {
  static forRoot(config: MapConfig): ModuleWithProviders {
    return {
      ngModule: MapCoreModule,
      providers: [
        MapService,
        EsriTypeFactory,
        EsriModuleLoader,
        EsriUtility,
        { provide: API_KEY_TOKEN, useValue: config.apiKey }
      ]
    };
  }
}
