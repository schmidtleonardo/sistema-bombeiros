export interface Edificacao {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
  telefone1: string;
  telefone2: string;
  cep: string;
  endereco: string;
  numeroEndereco: string;
  bairro: string;
  cidade: string;
  tipoEdificacao: string;
  numeroMoradores: number;
  temBotijao: string;
  qtdBotijao: number;
  longitude: string;
  latitude: string;
  nivel?: number;
}
