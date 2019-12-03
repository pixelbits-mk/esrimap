import { loadModules, loadCss } from 'esri-loader';
import { InjectionToken, Injectable } from '@angular/core';
import { EsriTypeFactory } from './esri-type.factory';

@Injectable({
    providedIn: 'root'
})
export class EsriModuleLoader {
    public moduleLookup: { [key: string]: any };
    constructor(private esriTypeFactory: EsriTypeFactory) {
        this.moduleLookup = {};
    }
    async loadModules(modules: string[]): Promise<any[]> {
        const newModules = modules.filter(t => Object.keys(this.moduleLookup).indexOf(t) === -1);
        const esriModules = await loadModules(newModules);
        const moduleLookup = newModules.reduce((p, c, i) => {
            p[c.toString()] = esriModules[i];
            return p;
        }, {});

        this.moduleLookup = Object.assign(this.moduleLookup, moduleLookup);
        this.esriTypeFactory.init(this.moduleLookup);
        return modules.map(t => this.moduleLookup[t]);

    }
    loadCss() {
        loadCss();
    }
}
