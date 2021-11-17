import { Edificacao } from '../models/Edificacao';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EdificacoesService {
  url: string = `${environment.backendUrl}/cadastros`;
  urlBack: string = `${environment.backendUrl}/cadastros`;

  constructor(private http: HttpClient) {}

  async create(edificacao: Edificacao): Promise<Edificacao> {
    return this.http.post<Edificacao>(this.url, edificacao).toPromise();
  }

  async read(id: number): Promise<Edificacao> {
    return this.http.get<Edificacao>(`${this.url}/${id}`).toPromise();
  }

  async update(edificacao: Edificacao): Promise<Edificacao> {
    return this.http
      .put<Edificacao>(`${this.url}/${edificacao.id}`, edificacao)
      .toPromise();
  }

  async delete(id: number) {
    this.http.delete(`${this.url}/${id}`).toPromise();
  }

  async list(): Promise<Edificacao[]> {
    return this.http.get<Edificacao[]>(`${this.url}`).toPromise();
  }
}
