import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtRequest } from '../models/JwtRequest';
import { Token } from './../models/Token';
import { Usuario } from './../models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  url = `${environment.backendUrl}/login`;

  async createToken(request: JwtRequest) {
    const authentication = await this.http.post<Token>(this.url, request).toPromise();
    this.storeToken(authentication);
    this.saveUser(authentication.user);

    return authentication;
  }

  isAdmin(user: Usuario) {
    return user.perfilAcesso.toUpperCase() == 'ADMINISTRADOR';
  }

  isMonitor(user: Usuario) {
    return user.perfilAcesso.toUpperCase() == 'MONITORAMENTO';
  }

  isCobom(user: Usuario) {
    return user.perfilAcesso.toUpperCase() == 'COBOM';
  }

  isLogged() {
    if (this.getStoredToken()) return true;
    else return false;
  }

  saveUser(user: Usuario) {
    sessionStorage.setItem('swb-user', JSON.stringify(user));
  }

  getUser(): Usuario {
    try {
      const str = sessionStorage.getItem('swb-user');
      if (!str) return {} as Usuario;
      return JSON.parse(str) as Usuario;
    } catch (err) {
      return {} as Usuario;
    }
  }

  storeToken(response: Token) {
    sessionStorage.setItem('swb-token', JSON.stringify(response));
  }

  getStoredToken() {
    try {
      const str = sessionStorage.getItem('swb-token');
      if (!str) return undefined;
      return JSON.parse(str) as Token;
    } catch (err) {
      return undefined;
    }
  }

  logout() {
    sessionStorage.removeItem('swb-token');
    sessionStorage.removeItem('swb-user');
  }
}
