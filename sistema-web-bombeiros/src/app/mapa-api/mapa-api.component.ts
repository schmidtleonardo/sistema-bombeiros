import { Extintor } from './../models/Extintor';
import { Valvula } from './../models/Valvula';
import { Hidrante } from './../models/Hidrante';
import { Mangueira } from './../models/Mangueira';
import { Edificacao } from './../models/Edificacao';
import { ExtintoresService } from './../services/extintores.service';
import { ValvulasService } from './../services/valvulas.service';
import { HidrantesService } from './../services/hidrantes.service';
import { MangueirasService } from './../services/mangueiras.service';
import { EdificacoesService } from './../services/edificacoes.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Feature, View } from 'ol';
import Map from 'ol/Map';
import { XYZ, OSM, Cluster, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import * as Proj from 'ol/proj.js';
import Point from 'ol/geom/Point';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import { boundingExtent } from 'ol/extent';
import Overlay from 'ol/Overlay';

@Component({
  selector: 'app-mapa-api',
  templateUrl: './mapa-api.component.html',
  styleUrls: ['./mapa-api.component.scss'],
})
export class MapaApiComponent implements OnInit {
  @ViewChild('popup') element!: ElementRef;
  popup!: Overlay;
  display: string = 'none';

  constructor(
    private edificacoesService: EdificacoesService,
    private mangueirasService: MangueirasService,
    private hidrantesService: HidrantesService,
    private valvulasService: ValvulasService,
    private extintoresService: ExtintoresService
  ) {}
  pontos: any;

  async ngAfterViewInit() {
    this.pontos = await this.edificacoesService.list();
    const mangueiras = await this.mangueirasService.list();
    const hidrantes = await this.hidrantesService.list();
    const valvulas = await this.valvulasService.list();
    const extintores = await this.extintoresService.list();
    this.pontos.forEach((edificacao: Edificacao) => {
      const data = [
        ...mangueiras
          .filter((m: Mangueira) => m.edificacao.id! == edificacao.id!)
          .map((m: Mangueira) => new Date(m.validade)),
        ...hidrantes
          .filter((h: Hidrante) => h.edificacao.id! == edificacao.id!)
          .map((h: Hidrante) => new Date(h.validade)),
        ...valvulas
          .filter((v: Valvula) => v.edificacao.id! == edificacao.id!)
          .map((v: Valvula) => new Date(v.validade)),
        ...extintores
          .filter((e: Extintor) => e.edificacao.id! == edificacao.id!)
          .map((e: Extintor) => new Date(e.dataValidade)),
      ].sort()[0];
      const hoje = new Date();
      let hojeMais30 = new Date(hoje.setDate(hoje.getDate() + 30))
      if (data < new Date(hoje.setDate(hoje.getDate() + 30))) {
        edificacao.nivel = 2;
      } else if (data > new Date(hoje.setDate(hoje.getDate() + 30)) && data < new Date(hoje.setDate(hoje.getDate() + 60))) {
        edificacao.nivel = 1;
      } else {
        edificacao.nivel = 0;
      }
    });
    this.popup = new Overlay({ element: this.element.nativeElement });
    const map = this.criarMapa();
    this.addCluster(map);
  }

  async ngOnInit() {}

  private addCluster(map: Map) {
    let features: any[] = [];
    const colors = ['#f2e718', '#ffa719', '#fc0303'];
    for (let j = 0; j < 3; j++) {
      features = [];
      this.pontos
        .filter((p: any) => p.nivel == j)
        .forEach((p: any) => {
          const feature = new Feature(
            new Point(Proj.fromLonLat([p.longitude, p.latitude]))
          );
          feature.set('data', p);
          features.push(feature);
        });

      const clustersR = this.createCluster(features, colors[j]);
      map.addLayer(clustersR);

      map.on('click', (e) => {
        this.display = 'none';
        clustersR
          .getFeatures(e.pixel)
          .then((clickedFeatures: any) =>
            this.clickCluster(e, clickedFeatures, map)
          );
      });
    }
  }

  private clickCluster(evt: any, clickedFeatures: any, map: Map) {
    if (clickedFeatures.length) {
      const features = clickedFeatures[0].get('features');
      if (features.length > 1) {
        const extent = boundingExtent(
          features.map((r: any) => r.getGeometry().getCoordinates())
        );
        map
          .getView()
          .fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });
      } else if (features.length == 1) {
        this.insertOverlay(evt, features[0].get('data'));
      }
    }
  }

  private criarMapa() {
    const raster = new TileLayer({
      source: new XYZ({
        url: 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}&apistyle=s.t%3A1%7Cp.v%3Aon%2Cs.t%3A21%7Cs.e%3Al.i%7Cp.v%3Aon%2Cs.t%3A2%7Cp.v%3Aoff%2Cs.t%3A2%7Cs.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A33%7Cp.v%3Aoff%2Cs.t%3A33%7Cs.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A51%7Cs.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A4%7Cp.v%3Aoff',
      }),
    });

    const map = new Map({
      layers: [raster],
      target: 'map',
      view: new View({
        center: Proj.fromLonLat([-48.635454, -27.617852]),
        zoom: 14,
      }),
      overlays: [this.popup],
    });

    return map;
  }

  private createCluster(features: any, color: string) {
    const source = new VectorSource({
      features,
    });

    const clusterSource = new Cluster({
      distance: 80,
      source: source,
    });

    const styleCache: any = {};

    const clusters = new VectorLayer({
      source: clusterSource,
      style: function (feature) {
        const size = feature.get('features').length;
        let style = styleCache[size];
        if (!style) {
          style = new Style({
            image: new CircleStyle({
              radius: 15,
              stroke: new Stroke({
                color: '#000',
              }),
              fill: new Fill({
                color,
              }),
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: '#000',
              }),
              font: '15px sans-serif',
            }),
          });
          styleCache[size] = style;
        }
        return style;
      },
    });
    return clusters;
  }

  private insertOverlay(evt: any, data: Record<string, any>) {
    this.display = 'block';
    const element = this.popup.getElement()!;
    const coordinate = evt.coordinate;
    element.innerHTML = `<div><span>Nome: ${data.nome}</span><br><span>Rua: ${data.endereco}</span><br><span>Cep: ${data.cep}</span><br><span>Telefone: ${data.telefone1}</span></div>`;
    this.popup.setPosition(coordinate);
  }
}
