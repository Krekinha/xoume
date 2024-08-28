"use server";

import { baseUrl } from "@/utils/constants";
import {
	TipoMessage,
	type ResponseAction,
	type Transporte,
} from "@/utils/types";
import { revalidateTag } from "next/cache";

const local_add = "http://localhost:3333/transportes/add";
interface ErrorDetails {
	cause?: {
		errors?: Array<{
			message: string;
		}>;
	};
}
export async function getTransportes() {
	const res = await fetch(`${process.env.API_TRANSMANAGER_URL}/transportes`, {
		next: { tags: ["transportes"] },
	});

	const response = await res.json();
	const transportes = response.transportes;
	//console.log(transportes);
	return transportes;
}

export async function addTransporte(
	transporte: Transporte,
): Promise<ResponseAction> {
	const url = baseUrl("/transportes/add");

	console.log(transporte);

	try {
		// faz o fetch que envia os dados para a api
		const response = await fetch(url, {
			method: "POST",
			cache: "no-store",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(transporte),
		});

		const status = response.status;

		console.log(status);

		if (status === 500) {
			const message = await response.text();
			console.log(message);
			const responseServer: ResponseAction = {
				errors: [],
				message: {
					type: TipoMessage.ERROR,
					text: `Erro ao adicionar transporte!\nstatus: ${status}\nresposta: ${message}`,
					status: status,
				},
			};

			return responseServer;
		}

		// capatura a resposta do servidor
		const res = await response.json();

		console.log(res);

		// se houver erros no servidor envia a resposta e o status da requisição
		if (!response.ok) {
			const responseServer: ResponseAction = {
				errors: [],
				message: {
					type: TipoMessage.ERROR,
					text: `HTTP error! status: ${response.status} resposta: ${res.error} | ${res.message}`,
					status: res.statusCode,
				},
			};

			console.log(res);
			return responseServer;
		}

		// atualiza a requisição no cache
		revalidateTag("transportes");

		const responseServer: ResponseAction = {
			errors: [],
			message: {
				type: TipoMessage.SUCCESS,
				text: "Transporte adicionado com sucesso",
				response: res,
			},
		};

		return responseServer;
	} catch (error) {
		const errorMessage =
			(error as ErrorDetails).cause?.errors?.[1]?.message ?? error;
		// lança um erro se houver erros na requisição
		const response: ResponseAction = {
			errors: [],
			message: {
				type: TipoMessage.ERROR,
				text: `Erro ao adicionar o transporte: : ${errorMessage}`,
			},
		};
		return response;
	}
}

export async function delTransporte(id: number) {
	console.log(id);
	const url = baseUrl(`/transportes/del/${id}`);
	const local_del = `http://localhost:3333/transportes/del/${id}`;

	try {
		const res = await fetch(url, {
			method: "DELETE",
		});

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const data = await res.json();
		console.log(data);

		revalidateTag("transportes");

		return data;
	} catch (error) {
		console.log("Erro ao deletar o transporte:", error);
		throw error;
	}
}

export async function getEmpresas() {
	const res = await fetch(`${process.env.API_TRANSMANAGER_URL}/empresas`, {
		next: { tags: ["empresas"] },
	});

	const response = await res.json();
	const empresas = response.empresas;
	//console.log(empresas);
	return empresas;
}

export async function getMotoristas() {
	const res = await fetch(`${process.env.API_TRANSMANAGER_URL}/motoristas`, {
		next: { tags: ["motoristas"] },
	});

	const response = await res.json();
	const motoristas = response.motoristas;
	//console.log(motoristas);
	return motoristas;
}

export async function getTomadores() {
	const res = await fetch(`${process.env.API_TRANSMANAGER_URL}/tomadores`, {
		next: { tags: ["tomadores"] },
	});

	const response = await res.json();
	const tomadores = response.tomadores;

	return tomadores;
}

export async function getMunicipiosByUf(uf: string) {
	const res = await fetch(
		`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome&&view=nivelado`,
		{
			next: { tags: ["municipios"] },
		},
	);

	const municipios = await res.json();
	console.log(municipios);
	//const municipios = response.tomadores;

	const municipiosMap = municipioItems(municipios);
	console.log(municipiosMap);

	return municipiosMap;
}

export async function getEstados() {
	const res = await fetch(
		"https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome",
		{
			next: { tags: ["estados"] },
		},
	);

	const estados = await res.json();
	console.log(estados);
	//const municipios = response.tomadores;

	const municipiosMap = estadoItems(estados);
	console.log(municipiosMap);

	return municipiosMap;
}

const municipioItems = (municipios: any) => {
	if (municipios) {
		return municipios.map((municipio: any) => ({
			label: municipio["municipio-nome"],
			value: Number.parseInt(municipio["municipio-id"], 10),
		}));
	}
	return [];
};

const estadoItems = (estados: any) => {
	if (estados) {
		return estados.map((municipio: any) => ({
			label: municipio.sigla,
			value: municipio.id,
		}));
	}
	return [];
};
