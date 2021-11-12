import { Edificacao } from './Edificacao';
export interface Hidrante {
  id?: number;
  validade: string;
  numeroPatrimonio: string;
  dataUltimoTeste: string;
  statusAtividade: string;
  edificacao: Edificacao;
}
