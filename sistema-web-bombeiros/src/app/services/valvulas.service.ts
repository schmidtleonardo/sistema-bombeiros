import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Valvula } from '../models/Valvula';

@Injectable({
  providedIn: 'root'
})
export class ValvulasService {
  url: string = `${environment.backendUrl}/valvulas`;

  constructor(private http: HttpClient) {}

  async findByEdificacao(id: number) {
    return this.http.get<Valvula[]>(`${this.url}/findByEdificacao/${id}`).toPromise();
  }

  async create(valvula: Valvula): Promise<Valvula> {
    return this.http
      .post<Valvula>(this.url, valvula)
      .toPromise();
  }

  async read(id: number): Promise<Valvula> {
    return this.http.get<Valvula>(`${this.url}/${id}`).toPromise();
  }

  async update(valvula: Valvula): Promise<Valvula> {
    return this.http
      .put<Valvula>(`${this.url}/${valvula.id}`, valvula)
      .toPromise();
  }

  async delete(id: number) {
    this.http.delete(`${this.url}/${id}`).toPromise();
  }

  async list(): Promise<Valvula[]> {
    return this.http.get<Valvula[]>(this.url).toPromise();
  }
}
