import type { ReactNode } from "react";
import type { Decimal } from "@prisma/client/runtime/library";
import type { ZodIssue } from "zod";

// USER TYPES
export type User = {
	id?: string;
	nome?: string;
	email?: string;
	senha?: string;
	roles?: Role[];
};

enum Role {
	ADMIN = 0,
	DEV = 1,
	COLAB = 2,
	FINANCE = 3,
}

export type ILogin = {
	email: string;
	senha: string;
};

export type Session = {
	user?: User;
	token?: string;
};

// ATENDIMENTO TYPES
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
	ENCERRADO = 0,
	ANDAMENTO = 1,
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
	PFISICA = 0,
	PJURIDICA = 1,
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
	CONCLUIDO = 0,
	ANDAMENTO = 1,
}

// TRANSPORTE TYPES

export type Transporte = {
	id?: number;

	notas?: number[];
	cte?: number;
	uf_origem?: string;
	cidade_origem?: string;
	uf_destino?: string;
	cidade_destino?: string;
	peso?: Decimal;
	val_tonelada?: Decimal;
	val_cte?: Decimal;
	reducao_bc_icms?: Decimal;
	aliquota_icms?: Decimal;
	val_icms?: Decimal;
	emissao_cte?: Date;
	criadoEm?: Date;
	atualizadoEm?: Date;

	cteComplementar?: CteComplementar;
	empresa?: Empresa;
	motorista?: Motorista;
	tomador?: Tomador;

	empresaId?: number;
	motoristaId?: number;
	tomadorId?: number;
};

export interface CteComplementar {
	id: number;
	cte?: number;
	peso?: Decimal;
	val_tonelada?: Decimal;
	val_cte?: Decimal;
	reducao_bc_icms?: Decimal;
	aliquota_icms?: Decimal;
	emissao_cte?: Date;

	criadoEm?: Date;
	atualizadoEm?: Date;

	// Relacionamentos
	transporte?: Transporte;
	// Chave
	transporteId?: number;
}

export interface Motorista {
	id?: number;
	nome?: string;
	cpf?: string;

	empresas: Empresa[];
	transportes: Transporte[];
}

export interface Empresa {
	id?: number;
	razaoNome?: string;
	cnpjCpf?: string;

	motoristas?: Motorista[];
	transporteEmpresa?: Transporte[];
}

export interface Tomador {
	id?: number;
	razaoNome?: string;
	cnpjCpf?: string;

	transporteTomador: Transporte[];
}

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

export type Message = {
	type?: TipoMessage;
	text?: string;
	status?: number;
	response?: object;
};
export type ResponseAction = {
	errors: ZodIssue[];
	message?: Message;
};

export type ErrorResponse = {
	code?: string;
	name?: string;
	data?: string;
	message?: string;
};

export enum TipoMessage {
	SUCCESS = 0,
	ERROR = 1,
}

export interface SelectItemProps {
	label?: string;
	value?: unknown;
}
