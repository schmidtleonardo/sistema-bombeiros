import { Hidrante } from '../models/Hidrante';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HidrantesService {
  url: string = `${environment.backendUrl}/hidrantes`;

  constructor(private http: HttpClient) {}

  async findByEdificacao(id: number) {
    return this.http.get<Hidrante[]>(`${this.url}/findByEdificacao/${id}`).toPromise();
  }

  async create(hidrante: Hidrante): Promise<Hidrante> {
    return this.http
      .post<Hidrante>(this.url, hidrante)
      .toPromise();
  }

  async read(id: number): Promise<Hidrante> {
    return this.http.get<Hidrante>(`${this.url}/${id}`).toPromise();
  }

  async update(hidrante: Hidrante): Promise<Hidrante> {
    return this.http
      .put<Hidrante>(`${this.url}/${hidrante.id}`, hidrante)
      .toPromise();
  }

  async delete(id: number) {
    this.http.delete(`${this.url}/${id}`).toPromise();
  }

  async list(): Promise<Hidrante[]> {
    return this.http.get<Hidrante[]>(this.url).toPromise();
  }
}
