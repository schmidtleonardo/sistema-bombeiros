import { ViacepService } from './../services/viacep.service';
import { Usuario } from './../models/Usuario';
import { UsuariosService } from './../services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { nomeCompleto } from '../common/validators';

@Component({
  selector: 'app-bombeiros',
  templateUrl: './bombeiros.component.html',
  styleUrls: ['./bombeiros.component.scss'],
})
export class BombeirosComponent implements OnInit {
  cep: string = "";
  bombeiros: Usuario[] = [];

  formGroup = new FormGroup({
    nomeCompleto: new FormControl('', [Validators.required, nomeCompleto()]),
    matricula: new FormControl('', [Validators.required]),
    nomeDeGuerra: new FormControl(''),
    senha: new FormControl('', [Validators.minLength(6), Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cep: new FormControl('', [Validators.required]),
    rua: new FormControl('', [Validators.required]),
    perfilAcesso: new FormControl('', [Validators.required]),
  });

  constructor(private bombeiroService: UsuariosService, private cepService: ViacepService) {}

  ngOnInit(): void {
  }

  async listarBombeiros() {
    this.bombeiros = await this.bombeiroService.list();
  }

  async criarBombeiro() {
    const bombeiro: Usuario = this.formGroup.value;
    console.log(bombeiro);
    await this.bombeiroService.create(bombeiro);
    await this.listarBombeiros();
    alert("Usuário cadastrado com sucesso!")
  }

  async getEnderecoPeloCep() {
    const endereco = await this.cepService.read(this.formGroup.value.cep);
    this.formGroup.controls.rua.setValue(endereco.logradouro)
  }
}
