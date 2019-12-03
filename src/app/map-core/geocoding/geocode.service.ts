import { Injectable, Inject } from '@angular/core';
import { API_KEY_TOKEN } from '../map.model';
import { HttpClient } from '@angular/common/http';
import { GeocodeResult } from './geocode.model';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  constructor(
    @Inject(API_KEY_TOKEN) private apiToken: string, private http: HttpClient) {
  }

  findAddresses(query: string) {
    const parms = `outFields=Addr_type,Match_addr,StAddr,City,State,Country,Postal,PostalExt,Territory,Region,Subregion`;
    return this.http.get<GeocodeResult>(
    `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates` +
      `?${parms}&singleLine=${query}&forStorage=true&token=${this.apiToken}&f=json`);
  }

}
