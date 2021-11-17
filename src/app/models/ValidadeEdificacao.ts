import { Valvula } from './Valvula';
import { Hidrante } from './Hidrante';
import { Mangueira } from './Mangueira';
import { Extintor } from './Extintor';

export interface ValidadeEdificacao {
  extintor: Extintor;
  mangueira: Mangueira;
  hidrante: Hidrante;
  valvula: Valvula;
}
