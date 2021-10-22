import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  url: string = `${environment.urlApi}/usuarios"`;

  constructor(private http: HttpClient) {}

  async create(usuario: Usuario): Promise<Usuario> {
    return this.http
      .post<Usuario>(this.url, usuario)
      .toPromise();
  }

  async read(id: number): Promise<Usuario> {
    return this.http.get<Usuario>(`${this.url}/${id}`).toPromise();
  }

  async update(usuario: Usuario): Promise<Usuario> {
    return this.http
      .put<Usuario>(`${this.url}/${usuario.id}`, usuario)
      .toPromise();
  }

  async delete(id: number) {
    this.http.delete(`${this.url}/${id}`).toPromise();
  }

  async list(): Promise<Usuario[]> {
    return this.http.get<Usuario[]>(this.url).toPromise();
  }
}
