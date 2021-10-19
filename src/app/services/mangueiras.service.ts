import { Mangueira } from '../models/Mangueira';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MangueirasService {
  url: string = `${environment.urlApi}/mangueiras"`;

  constructor(private http: HttpClient) {}

  async create(mangueira: Mangueira): Promise<Mangueira> {
    return this.http
      .post<Mangueira>(this.url, mangueira)
      .toPromise();
  }

  async read(id: number): Promise<Mangueira> {
    return this.http.get<Mangueira>(`${this.url}/${id}`).toPromise();
  }

  async update(mangueira: Mangueira): Promise<Mangueira> {
    return this.http
      .put<Mangueira>(`${this.url}/${mangueira.id}`, mangueira)
      .toPromise();
  }

  async delete(id: number) {
    this.http.delete(`${this.url}/${id}`).toPromise();
  }

  async list(): Promise<Mangueira[]> {
    return this.http.get<Mangueira[]>(this.url).toPromise();
  }
}
