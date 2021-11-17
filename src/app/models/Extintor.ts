import { Edificacao } from './Edificacao';
export interface Extintor {
  id?: number;
  dataValidade: string;
  modelo: string;
  seloInmetro: string;
  peso: number;
  anoInspecao: string;
  edificacao: Edificacao;
}
