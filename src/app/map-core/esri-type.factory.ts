import { EsriModuleEnum } from './map.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EsriTypeFactory {
    private modules: { [key: string]: any};

    constructor() {
        this.modules = {};
    }

    init(modules: { [key: string]: any}) {
        this.modules = modules;
    }

    getType<T>(type: EsriModuleEnum) {
        return this.getModule(type) as T;
    }
    create<T>(type: EsriModuleEnum, args: any = {}): T {
        const ModuleType = this.getModule(type);
        return new ModuleType(args) as T;
    }

    private getModule(type: EsriModuleEnum) {
        if (!this.modules[type.toString()]) {
            throw new Error(`Module ${type} has not been loaded`);
        }
        return this.modules[type.toString()];
    }
}
