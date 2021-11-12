import { DadosRelatorio } from './../models/DadosRelatorio';
import { ValidadeEdificacoesService } from './../services/validade-edificacoes.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EdificacoesService } from '../services/edificacoes.service';
import { ExtintoresService } from '../services/extintores.service';
import { HidrantesService } from '../services/hidrantes.service';
import { MangueirasService } from '../services/mangueiras.service';
import { ValvulasService } from '../services/valvulas.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tela-relatorios',
  templateUrl: './tela-relatorios.component.html',
  styleUrls: ['./tela-relatorios.component.scss']
})
export class TelaRelatoriosComponent implements OnInit {
  @ViewChild("relatorio") relatorio!: ElementRef

  hide = true;
  dados: any;
  edificacoes: any;
  objetos: any;
  dadosRelatorio: DadosRelatorio[] = [];
  dataSource = new MatTableDataSource<DadosRelatorio>([]);
  displayedColumns: string[] = [
    'nome',
    'endereco',
    'telefone1',
    'tipoEdificacao',
    'validadeMangueira',
    'validadeExtintor',
    'validadeValvula',
    'validadeHidrante',
  ];


  constructor(
    private edificacoesService: EdificacoesService,
    private extintoresService: ExtintoresService,
    private hidrantesService: HidrantesService,
    private mangueirasService: MangueirasService,
    private valvulasService: ValvulasService,
    private validadeEdificacoesService: ValidadeEdificacoesService
  ) { }

  ngOnInit(): void {
    this.getDados();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  exportAsExcel() {
      const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.dataSource.data, );//converts a DOM TABLE element to a worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Planilha1');

      /* save to file */
      XLSX.writeFile(wb, `relatorio_.xlsx`);

    }

  async getDados() {
    const validadeEdificacoes = await this.validadeEdificacoesService.list();
    console.log(validadeEdificacoes);

    for (let i = 0; i < validadeEdificacoes.length-1; i++) {
      this.dadosRelatorio[i] = {} as any;
      this.dadosRelatorio[i]["nome"] = validadeEdificacoes[i].extintor.edificacao.nome;
      this.dadosRelatorio[i]["endereco"] = `${validadeEdificacoes[i].extintor.edificacao.endereco}, ${validadeEdificacoes[i].extintor.edificacao.numeroEndereco}, ${validadeEdificacoes[i].extintor.edificacao.bairro}, ${validadeEdificacoes[i].extintor.edificacao.cidade}`;
      this.dadosRelatorio[i]["telefone"] = validadeEdificacoes[i].extintor.edificacao.telefone1;
      this.dadosRelatorio[i]["tipoEdificacao"] = validadeEdificacoes[i].extintor.edificacao.tipoEdificacao;
      this.dadosRelatorio[i]["validadeExtintor"] = validadeEdificacoes[i].extintor.dataValidade;
      this.dadosRelatorio[i]["validadeHidrante"] = validadeEdificacoes[i].hidrante.validade;
      this.dadosRelatorio[i]["validadeValvula"] = validadeEdificacoes[i].valvula.validade;
      this.dadosRelatorio[i]["validadeMangueira"] = validadeEdificacoes[i].mangueira.validade;
    }

    this.dataSource = new MatTableDataSource(this.dadosRelatorio)

  }

}
