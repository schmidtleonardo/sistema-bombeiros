import { ValidadeEdificacao } from './../models/ValidadeEdificacao';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidadeEdificacoesService {
  url: string = `${environment.backendUrl}/relatorios`;

  constructor(private http: HttpClient) { }

  async list(): Promise<ValidadeEdificacao[]> {
    return this.http.get<ValidadeEdificacao[]>(`${this.url}`).toPromise();
  }
}
