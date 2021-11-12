import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {
  url: string = 'https://viacep.com.br/ws'
  constructor(private http: HttpClient) { }

  async read(cep: string): Promise<any>{
    const endereco = await this.http.get(`${this.url}/${cep}/json`).toPromise();
    // console.log(endereco);
    return endereco;
  }
}
