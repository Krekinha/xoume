"use server";

import { baseUrl } from "@/utils/constants";
import { Prisma, PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

const prisma = new PrismaClient();

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
