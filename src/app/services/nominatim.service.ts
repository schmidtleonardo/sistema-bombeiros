import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  constructor(private http: HttpClient) { }

  async getAddressFromLatLon(
    latitude: number,
    longitude: number
  ): Promise<any> {
    return this.http.get('https://nominatim.openstreetmap.org/reverse', {
      params: { lat: latitude, lon: longitude, format: 'json'},
    }).toPromise();
  }

  async getLatLonFromAddress(
    logradouro: string,
    bairro: string,
    municipio: string,
    estado: string
  ): Promise<any> {
    const query = `${logradouro} ${bairro} ${municipio} ${estado}`;
    return this.http.get('https://nominatim.openstreetmap.org/search', {
      params: {q: query, format: 'json'},
    }).toPromise();
  }
}
