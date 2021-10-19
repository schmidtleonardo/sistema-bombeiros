import { MoradoresService } from './../services/moradores.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
// import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { nomeCompleto } from '../common/validators';
import { ViacepService } from '../services/viacep.service';

interface Tipo {
  value: string;
  viewValue: string;
}

export interface CadastroMoradores {
  endereco: string;
  nome: string;
  telefone: number;
  numMoradores: number;
  tipoEdificacao: string;
  temBotijao: string;
  qtdBotijao: number;
}

const ELEMENT_DATA: CadastroMoradores[] = [
  {
    nome: 'Leonardo Schmidt',
    endereco: 'Rua Qualquer, 32',
    telefone: 5548991919199,
    numMoradores: 4,
    tipoEdificacao: 'Residencial',
    temBotijao: 'Sim',
    qtdBotijao: 1,
  },
  {
    nome: 'Leonardo Nascimento',
    endereco: 'Rua Qualquer, 32',
    telefone: 5548991919199,
    numMoradores: 4,
    tipoEdificacao: 'Residencial',
    temBotijao: 'Sim',
    qtdBotijao: 1,
  },
  {
    nome: 'Martin Ferreira',
    endereco: 'Rua Qualquer, 32',
    telefone: 5548991919199,
    numMoradores: 4,
    tipoEdificacao: 'Residencial',
    temBotijao: 'Sim',
    qtdBotijao: 1,
  },
  {
    nome: 'Fulano',
    endereco: 'Rua Qualquer, 32',
    telefone: 5548991919199,
    numMoradores: 4,
    tipoEdificacao: 'Residencial',
    temBotijao: 'Sim',
    qtdBotijao: 1,
  },
  {
    nome: 'Fulano',
    endereco: 'Rua Qualquer, 32',
    telefone: 5548991919199,
    numMoradores: 4,
    tipoEdificacao: 'Residencial',
    temBotijao: 'Sim',
    qtdBotijao: 1,
  },
  {
    nome: 'Fulano',
    endereco: 'Rua Qualquer, 32',
    telefone: 5548991919199,
    numMoradores: 4,
    tipoEdificacao: 'Residencial',
    temBotijao: 'Sim',
    qtdBotijao: 1,
  },
  {
    nome: 'Fulano',
    endereco: 'Rua Qualquer, 32',
    telefone: 5548991919199,
    numMoradores: 4,
    tipoEdificacao: 'Residencial',
    temBotijao: 'Sim',
    qtdBotijao: 1,
  },
  {
    nome: 'Fulano',
    endereco: 'Rua Qualquer, 32',
    telefone: 5548991919199,
    numMoradores: 4,
    tipoEdificacao: 'Residencial',
    temBotijao: 'Sim',
    qtdBotijao: 1,
  },
];

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.scss'],
})
export class TelaCadastroComponent implements OnInit {
  displayedColumns: string[] = [
    'nome',
    'endereco',
    'telefone',
    'numMoradores',
    'tipoEdificacao',
    'temBotijao',
    'qtdBotijao',
  ];
  clickedRows = new Set<CadastroMoradores>();
  serializedDate = new FormControl(new Date().toISOString());
  cep: string = "";
  clicado: boolean = false;
  moradores: any;
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private cepService: ViacepService, private moradoresService: MoradoresService) {}

  ngOnInit() {
    this.getMoradores();
  }

  formGroup = new FormGroup({
    nomeCompleto: new FormControl('', [Validators.required, nomeCompleto()]),
    cep: new FormControl('', [Validators.required]),
    endereco: new FormControl('', [Validators.required]),
    numero: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    telefone1: new FormControl('', [Validators.required]),
    telefone2: new FormControl(''),
    cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    numMoradores: new FormControl('', [Validators.required]),
    tipoEdificacao: new FormControl('', [Validators.required]),
    objeto: new FormControl('', [Validators.required]),
    validade: new FormControl('', [Validators.required]),
    temBotijao: new FormControl('', [Validators.required]),
    qtdBotijao: new FormControl(''),
    tamanhoMangueira: new FormControl('', [Validators.required]),
    modeloMangueira: new FormControl('', [Validators.required]),
    validadeMangueira: new FormControl('', [Validators.required]),
    validadeValvula: new FormControl('', [Validators.required]),
    validadeHidrante: new FormControl('', [Validators.required]),
    numeroPatrimonio: new FormControl('', [Validators.required]),
    ultimoTeste: new FormControl('', [Validators.required]),
    statusAtividade: new FormControl('', [Validators.required]),
    validadeExtintor: new FormControl('', [Validators.required]),
    modeloExtintor: new FormControl('', [Validators.required]),
    seloInmetro: new FormControl('', [Validators.required]),
    pesoExtintor: new FormControl('', [Validators.required]),
    anoExpecao: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  async getEnderecoPeloCep() {
    const endereco = await this.cepService.read(this.formGroup.value.cep);
    this.formGroup.controls.endereco.setValue(endereco.logradouro);
    this.formGroup.controls.bairro.setValue(endereco.bairro);
    this.formGroup.controls.cidade.setValue(endereco.localidade);
  }

  async getMoradores() {
    this.moradores = await this.moradoresService.list();
    console.log(this.moradores);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  async ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  length = 500;
  pageSize = 4;
  pageIndex = 0;
  showFirstLastButtons = true;

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  criarUsuario() {
    this.clicado = true;
  }

  i!: number;

  tipos: Tipo[] = [
    { value: 'comercial-0', viewValue: 'Comercial' },
    { value: 'residencial-1', viewValue: 'Residencial' },
  ];

  botijoes: Tipo[] = [
    { value: 'nao-0', viewValue: 'Não' },
    { value: 'sim-1', viewValue: 'Sim' },
  ];

  selosInmetro: Tipo[] = [
    { value: 'nao-0', viewValue: 'Não' },
    { value: 'sim-1', viewValue: 'Sim' },
  ];

  objetos: Tipo[] = [
    { value: 'mangueira', viewValue: 'Mangueira' },
    { value: 'valvula', viewValue: 'Válvula' },
  ];

  modelosExtintor: Tipo[] = [
    { value: 'ext-0', viewValue: 'Água' },
    { value: 'ext-1', viewValue: 'Espuma Mecânica' },
    { value: 'ext-2', viewValue: 'Dióxido de Carbono (CO2)' },
    { value: 'ext-3', viewValue: 'Pó Químico ABC' },
    { value: 'ext-4', viewValue: 'Pó Químico BC' },
    { value: 'ext-5', viewValue: 'Halogenados (Halon)' },
    { value: 'ext-6', viewValue: 'Classe D' },
    { value: 'ext-7', viewValue: 'Classe K' },
  ];
}
