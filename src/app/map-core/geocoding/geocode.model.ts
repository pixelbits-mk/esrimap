import { InjectionToken } from '@angular/core';
import { LatLng } from '../map.model';

export class GeocodeResult {
    spatialReference: SpatialReference;
    candidates: Candidate[];
}

export class SpatialReference {
    wkid: number;
    latestWkid: number;
}

export class Candidate {
    address: string;
    location: Location;
    score: number;
    extent: Extent;
    attributes: { [key: string]: any };
}

export class Location {
    x: number;
    y: number;
}

export class Extent {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
}
