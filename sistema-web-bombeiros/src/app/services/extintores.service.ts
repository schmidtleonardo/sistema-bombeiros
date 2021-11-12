import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Extintor } from '../models/Extintor';

@Injectable({
  providedIn: 'root'
})
export class ExtintoresService {
  url: string = `${environment.backendUrl}/extintores`;

  constructor(private http: HttpClient) {}

  async findByEdificacao(id: number) {
    return this.http.get<Extintor[]>(`${this.url}/findByEdificacao/${id}`).toPromise();
  }

  async create(extintor: Extintor): Promise<Extintor> {
    return this.http
      .post<Extintor>(this.url, extintor)
      .toPromise();
  }

  async read(id: number): Promise<Extintor> {
    return this.http.get<Extintor>(`${this.url}/${id}`).toPromise();
  }

  async update(extintor: Extintor): Promise<Extintor> {
    return this.http
      .put<Extintor>(`${this.url}/${extintor.id}`, extintor)
      .toPromise();
  }

  async delete(id: number) {
    this.http.delete(`${this.url}/${id}`).toPromise();
  }

  async list(): Promise<Extintor[]> {
    return this.http.get<Extintor[]>(this.url).toPromise();
  }
}
