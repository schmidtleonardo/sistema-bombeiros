import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DadosService {
  constructor(private http: HttpClient) {}

  async list() {
    return this.http.get(`${environment.urlApi}/dados`).toPromise();
  }
}
