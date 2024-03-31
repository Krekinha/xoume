import { ReactNode } from "react";

export type User = {
  id?: string;
  nome?: string;
  email?: string;
  senha?: string;
  roles?: Role[];
};

enum Role {
  ADMIN,
  DEV,
  COLAB,
  FINANCE,
}

export type ILogin = {
  email: string;
  senha: string;
};

export type Sidemenu = {
  modulo?: string;
  menu?: MenuSideList[];
};

export type MenuSideList = {
  label?: string;
  icon?: ReactNode;
  notificacao?: number;
  link: string;
};

export interface Atendimento {
  id?: string;
  ordem: number;
  titulo: string;
  descricao?: string;
  prazo?: Date;
  extra?: boolean;
  situacao?: SituacaoAtendimento[];
  proximaAtuacao?: Date;

  criadoEm: Date;
  atualizadoEm?: Date;

  // Relacionamentos
  cliente?: Cliente;
  responsavel: User[];
  evolucao: EvolucaoAtendimento;
  criadoPor: User;
  atualizadoPor: User;
}

enum SituacaoAtendimento {
  ENCERRADO,
  ANDAMENTO,
}

export interface Cliente {
  tipoCliente?: TipoCliente;
  razaoNome: string;
  nome?: string;
  cnpjCpf?: string;
  estadoCivilPf?: string;
  rgPf?: string;
  dnPf?: Date;
  logradouroPj?: string;
  numeroLogradouroPj?: string;
  bairroPj?: string;
  complementoPj?: string;
  cepPj?: string;
  cidadePj?: string;
  ufPj?: string;
  telefonePj?: string;
  nomeResponsavel?: string;
  cpfResponsavel?: string;
  estadoCivilResponsavel?: string;
  rgResponsavel?: string;
  dnResponsavel?: Date;
  logradouroResponsavel?: string;
  numeroLogradouroResponsavel?: string;
  bairroResponsavel?: string;
  cepResponsavel?: string;
  cidadeResponsavel?: string;
  ufResponsavel?: string;
  telefoneResponsavel?: string;
  email?: string;
  codigoSimples?: string;
  codigoEcac?: string;
  pasta?: string;
  criadoEm?: Date;
  atualizadoEm?: Date;

  criadoPor: User;
  atualizadoPor: User;
  atendimentoCliente: Atendimento[];
}

enum TipoCliente {
  PFISICA,
  PJURIDICA,
}

export interface EvolucaoAtendimento {
  ordem: number;

  eventos: EventoEvolucaoAtendimento[];
  atendimento: Atendimento;
}

export interface EventoEvolucaoAtendimento {
  descricao: string;
  situacao: SituacaoEventoEvolucaoAtendimento;
  dataEvento: Date;

  // Relacionamentos
  evolucaoAtendimento: EvolucaoAtendimento;
}

export enum SituacaoEventoEvolucaoAtendimento {
  CONCLUIDO,
  ANDAMENTO,
}
