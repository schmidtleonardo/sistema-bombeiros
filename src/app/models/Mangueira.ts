import { Edificacao } from './Edificacao';
export interface Mangueira {
  id?: number;
  modelo: string;
  validade: string;
  tamanho: string;
  edificacao: Edificacao;
}
