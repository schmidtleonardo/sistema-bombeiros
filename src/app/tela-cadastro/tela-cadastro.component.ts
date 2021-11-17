import { NominatimService } from './../services/nominatim.service';
import { ValvulasService } from './../services/valvulas.service';
import { MangueirasService } from './../services/mangueiras.service';
import { HidrantesService } from './../services/hidrantes.service';
import { ExtintoresService } from './../services/extintores.service';
import { EdificacoesService } from '../services/edificacoes.service';
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

export interface CadastroEdificacoes {
  endereco: string;
  nome: string;
  telefone: number;
  numMoradores: number;
  tipoEdificacao: string;
  temBotijao: string;
  qtdBotijao: number;
}

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.scss'],
})
export class TelaCadastroComponent implements OnInit {
  displayedColumns: string[] = [
    'nome',
    'endereco',
    'telefone1',
    'numeroMoradores',
    'tipoEdificacao',
    'temBotijao',
    'qtdBotijao',
  ];
  clickedRows = new Set<CadastroEdificacoes>();
  serializedDate = new FormControl(new Date().toISOString());
  cep: string = '';
  clicado: boolean = false;
  edificacoes: any;
  dataSource = new MatTableDataSource([]);
  editar: boolean = false;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private cepService: ViacepService,
    private edificacoesService: EdificacoesService,
    private extintoresService: ExtintoresService,
    private hidrantesService: HidrantesService,
    private mangueirasService: MangueirasService,
    private valvulasService: ValvulasService,
    private nominatimService: NominatimService
  ) {}

  ngOnInit() {
    this.getEdificacoes();
  }

  formGroup = new FormGroup({
    id: new FormControl(),
    nome: new FormControl('', [Validators.required, nomeCompleto()]),
    cep: new FormControl('', [Validators.required]),
    endereco: new FormControl('', [Validators.required]),
    numeroEndereco: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    estado: new FormControl(''),
    telefone1: new FormControl('', [Validators.required]),
    telefone2: new FormControl(''),
    cpf: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    numeroMoradores: new FormControl('', [Validators.required]),
    tipoEdificacao: new FormControl('', [Validators.required]),
    temBotijao: new FormControl('', [Validators.required]),
    qtdBotijao: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl('')
  });

  formValvula = new FormGroup({
    id: new FormControl(),
    validade: new FormControl('', [Validators.required]),

  });

  formMangueira = new FormGroup({
    id: new FormControl(),
    modelo: new FormControl('', [Validators.required]),
    tamanho: new FormControl('', [Validators.required]),
    validade: new FormControl('', [Validators.required]),
  });

  formHidrante = new FormGroup({
    id: new FormControl(),
    validade: new FormControl('', [Validators.required]),
    numeroPatrimonio: new FormControl('', [Validators.required]),
    dataUltimoTeste: new FormControl('', [Validators.required]),
    statusAtividade: new FormControl('', [Validators.required]),
  });

  formExtintor = new FormGroup({
    id: new FormControl(),
    dataValidade: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
    seloInmetro: new FormControl('', [Validators.required]),
    peso: new FormControl('', [Validators.required]),
    anoInspecao: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  async getEnderecoPeloCep() {
    const endereco = await this.cepService.read(this.formGroup.value.cep);
    this.formGroup.controls.endereco.setValue(endereco.logradouro);
    this.formGroup.controls.bairro.setValue(endereco.bairro);
    this.formGroup.controls.cidade.setValue(endereco.localidade);
    this.formGroup.controls.estado.setValue(endereco.uf);
  }

  async getEdificacoes() {
    this.edificacoes = await this.edificacoesService.list();
    this.dataSource = new MatTableDataSource(this.edificacoes);
    // console.log(this.edificacoes);
  }

  async cadastrar() {
    if (this.formGroup.valid) {
      alert('Usuário cadastrado com sucesso.');
      const latLon = await this.nominatimService.getLatLonFromAddress(this.formGroup.value.endereco, this.formGroup.value.bairro, this.formGroup.value.cidade, this.formGroup.value.estado)
      console.log(latLon)
      this.formGroup.controls.latitude.setValue(latLon[0].lat);
      this.formGroup.controls.longitude.setValue(latLon[0].lon)
      const edificacao = await this.edificacoesService.create(this.formGroup.value);
      const extintor = this.formExtintor.value;
      const hidrante = this.formHidrante.value;
      const mangueira = this.formMangueira.value;
      const valvula = this.formValvula.value;
      extintor.edificacao = edificacao;
      hidrante.edificacao = edificacao;
      mangueira.edificacao = edificacao;
      valvula.edificacao = edificacao;
      const cons = await this.extintoresService.create(extintor);
      await this.hidrantesService.create(hidrante);
      await this.mangueirasService.create(mangueira);
      await this.valvulasService.create(valvula);
      window.location.reload();
    }
  }

  async salvarCadastro() {
    await this.edificacoesService.update(this.formGroup.value);
    this.editar = false;
    window.location.reload();
  }

  async deletar() {
    console.log(this.formGroup.controls.id.value)
    if (confirm("Deseja realmente excluir o cadastro?")) {
      await this.edificacoesService.delete(this.formGroup.controls.id.value);
      await this.mangueirasService.delete(this.formMangueira.controls.id.value);
      await this.valvulasService.delete(this.formValvula.controls.id.value);
      await this.extintoresService.delete(this.formExtintor.controls.id.value);
      await this.hidrantesService.delete(this.formHidrante.controls.id.value);
      this.editar = false;
      window.location.reload();
    }
  }

  async carregaNaTela(row: any) {
    this.editar = true;
    const mangueiraFind = await this.mangueirasService.findByEdificacao(row.id);
    const valvulaFind = await this.valvulasService.findByEdificacao(row.id);
    const hidranteFind = await this.hidrantesService.findByEdificacao(row.id);
    const extintorFind = await this.extintoresService.findByEdificacao(row.id);

    this.formGroup.controls.id.setValue(row.id);
    this.formGroup.controls.nome.setValue(row.nome);
    this.formGroup.controls.cep.setValue(row.cep);
    this.formGroup.controls.endereco.setValue(row.endereco);
    this.formGroup.controls.numeroEndereco.setValue(row.numeroEndereco);
    this.formGroup.controls.bairro.setValue(row.bairro);
    this.formGroup.controls.cidade.setValue(row.cidade);
    this.formGroup.controls.telefone1.setValue(row.telefone1);
    this.formGroup.controls.telefone2.setValue(row.telefone2);
    this.formGroup.controls.cpf.setValue(row.cpf);
    this.formGroup.controls.email.setValue(row.email);
    this.formGroup.controls.numeroMoradores.setValue(row.numeroMoradores);
    this.formGroup.controls.tipoEdificacao.setValue(row.tipoEdificacao);
    this.formGroup.controls.temBotijao.setValue(row.temBotijao);
    this.formGroup.controls.qtdBotijao.setValue(row.qtdBotijao);
    this.formMangueira.controls.id.setValue(mangueiraFind[0].id);
    this.formMangueira.controls.tamanho.setValue(mangueiraFind[0].tamanho);
    this.formMangueira.controls.modelo.setValue(mangueiraFind[0].modelo);
    this.formMangueira.controls.validade.setValue(mangueiraFind[0].validade);
    this.formValvula.controls.id.setValue(valvulaFind[0].id);
    this.formValvula.controls.validade.setValue(valvulaFind[0].validade);
    this.formHidrante.controls.id.setValue(hidranteFind[0].id);
    this.formHidrante.controls.validade.setValue(hidranteFind[0].validade);
    this.formHidrante.controls.numeroPatrimonio.setValue(hidranteFind[0].numeroPatrimonio);
    this.formHidrante.controls.dataUltimoTeste.setValue(hidranteFind[0].dataUltimoTeste);
    this.formHidrante.controls.statusAtividade.setValue(hidranteFind[0].statusAtividade);
    this.formExtintor.controls.id.setValue(extintorFind[0].id);
    this.formExtintor.controls.dataValidade.setValue(extintorFind[0].dataValidade);
    this.formExtintor.controls.modelo.setValue(extintorFind[0].modelo);
    this.formExtintor.controls.seloInmetro.setValue(extintorFind[0].seloInmetro);
    this.formExtintor.controls.peso.setValue(extintorFind[0].peso);
    this.formExtintor.controls.anoInspecao.setValue(extintorFind[0].anoInspecao);

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

  i!: number;

  tipos: Tipo[] = [
    { value: 'Comercial', viewValue: 'Comercial' },
    { value: 'Residencial', viewValue: 'Residencial' },
  ];

  botijoes: Tipo[] = [
    { value: 'Não', viewValue: 'Não' },
    { value: 'Sim', viewValue: 'Sim' },
  ];

  selosInmetro: Tipo[] = [
    { value: 'Não', viewValue: 'Não' },
    { value: 'Sim', viewValue: 'Sim' },
  ];

  modelosMangueira: Tipo[] = [
    { value: 'Mangueira Plástica', viewValue: 'Mangueira Plástica' },
    { value: 'Mangueira de Aço', viewValue: 'Mangueira de Aço' },
  ];

  modelosExtintor: Tipo[] = [
    { value: 'Água', viewValue: 'Água' },
    { value: 'Espuma Mecânica', viewValue: 'Espuma Mecânica' },
    {
      value: 'Dióxido de Carbono (CO2)',
      viewValue: 'Dióxido de Carbono (CO2)',
    },
    { value: 'Pó Químico ABC', viewValue: 'Pó Químico ABC' },
    { value: 'Pó Químico BC', viewValue: 'Pó Químico BC' },
    { value: 'Halogenados (Halon)', viewValue: 'Halogenados (Halon)' },
    { value: 'Classe D', viewValue: 'Classe D' },
    { value: 'Classe K', viewValue: 'Classe K' },
  ];
}
