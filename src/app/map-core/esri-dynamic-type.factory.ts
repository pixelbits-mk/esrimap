import { EsriModuleEnum } from './map.model';
import { Injectable } from '@angular/core';
import { EsriModuleLoader } from './esri-module.loader';

@Injectable({
    providedIn: 'root'
})
export class EsriDynamicTypeFactory {
    constructor(private loader: EsriModuleLoader) {

    }

    async getType<T>(type: EsriModuleEnum): Promise<T> {
        return await this.getModule(type) as T;
    }
    async create<T>(type: EsriModuleEnum, args: any = {}): Promise<T> {
        const ModuleType = await this.getModule(type);
        return new ModuleType(args) as T;
    }

    private async getModule(type: EsriModuleEnum) {
        const modules = await this.loader.loadModules([type]);
        return modules[0];
    }
}
