import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss']
})
export class TelaLoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  usuario: string = "";
  senha: string = "";

  entrar() {
    if(this.usuario == "admin" && this.senha == "admin") {
      this.usuario = "";
      this.senha = "";
      this.router.navigate(['/home']);

    } else if (this.usuario == "" || this.senha == "") {
      alert("Preencha usuário e senha!");
    } else {
      alert("Usuário ou senha incorreta!");
    }
  }
}
