import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
// import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { nomeCompleto } from '../common/validators';

interface Perfil {
  value: string;
  viewValue: string;
}

export interface CadastroUsuarios {
  nome: string;
  matricula: number;
  nomeDeGuerra: string;
  email: string;
  perfilAcesso: string;

}

const ELEMENT_DATA: CadastroUsuarios[] = [
  {nome: 'Fulano Ciclano Beltrano', matricula: 99999, nomeDeGuerra: 'Sgt. Beltrano', email:'fulano@bombeiros.com',  perfilAcesso: 'Monitoramento'},
];

@Component({
  selector: 'app-tela-usuario',
  templateUrl: './tela-usuario.component.html',
  styleUrls: ['./tela-usuario.component.scss']
})
export class TelaUsuarioComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'matricula', 'nomeDeGuerra', 'email', 'perfilAcesso'];
  dataSource = new MatTableDataSource<CadastroUsuarios>(ELEMENT_DATA);
  clickedRows = new Set<CadastroUsuarios>();

  formGroup = new FormGroup({
    nomeCompleto: new FormControl('', [Validators.required, nomeCompleto()]),
    matricula: new FormControl('', [Validators.required]),
    nomeDeGuerra: new FormControl(''),
    senha: new FormControl('', [Validators.minLength(6), Validators.required]),
    confirmacaoSenha: new FormControl('', [Validators.minLength(6), Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    perfilAcesso: new FormControl('', [Validators.required]),
  });

  perfis: Perfil[] = [
    {value: 'admin-0', viewValue: 'Administrador'},
    {value: 'cobom-1', viewValue: 'Cobom'},
    {value: 'monitoramento-2', viewValue: 'Monitoramento'}
  ];

  cadastrar() {
    if(this.formGroup.value.senha != this.formGroup.value.confirmacaoSenha) {
      alert("As senhas não coincidem!")
    } else if (this.formGroup.value.senha == "" && this.formGroup.value.confirmacaoSenha == "") {
      alert("Os campos de senha devem ser preenchidos.")
    } else if (this.formGroup.valid){
      alert("Usuário cadastrado com sucesso.")
      console.log(this.formGroup.value);
    }
  }

  hide = true;


  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  length = 500;
  pageSize = 4;
  pageIndex = 0;
  // pageSizeOptions = [3,4,5];
  showFirstLastButtons = true;

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }


}
