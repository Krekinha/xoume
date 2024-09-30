"use server";

import type { SelectItemProps } from "@/utils/types";
import { z } from "zod";
import { createServerAction } from "zsa";

export const getMunicipiosByUf = createServerAction()
	.input(
		z.object({
			uf: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		// console.log(input.uf);

		try {
			const response = await fetch(
				`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${input.uf}/municipios?orderBy=nome&&view=nivelado`,
				{
					next: { tags: ["municipios"] },
				},
			);

			const municipios = await response.json();

			const municipiosMap = municipioItems(municipios);
			// console.log(municipiosMap);

			return municipiosMap;
		} catch (error: unknown) {
			console.log(error);
			throw new Error(`Falha ao buscar municípios: ${String(error)}`);
		}
	});

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
		const municipiosMap: SelectItemProps[] = municipios.map(
			(municipio: any) => ({
				label: String(municipio["municipio-nome"]).toUpperCase(),
				value: Number.parseInt(municipio["municipio-id"], 10),
			}),
		);
		return municipiosMap;
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
