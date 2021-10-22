import { Morador } from '../models/morador';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoradoresService {
  url: string = `${environment.urlApi}/moradores`;

  constructor(private http: HttpClient) {}

  async create(morador: Morador): Promise<Morador> {
    return this.http
      .post<Morador>(this.url, morador)
      .toPromise();
  }

  async read(id: number): Promise<Morador> {
    return this.http.get<Morador>(`${this.url}/${id}`).toPromise();
  }

  async update(morador: Morador): Promise<Morador> {
    return this.http
      .put<Morador>(`${this.url}/${morador.id}`, morador)
      .toPromise();
  }

  async delete(id: number) {
    this.http.delete(`${this.url}/${id}`).toPromise();
  }

  async list(): Promise<Morador[]> {
    return this.http.get<Morador[]>(`${this.url}`).toPromise();
  }
}
