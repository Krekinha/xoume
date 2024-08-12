"use server";

import { baseUrl } from "@/utils/constants";
import type { ResponseAction, Transporte } from "@/utils/types";
import { revalidateTag } from "next/cache";
import { z, type ZodIssue } from "zod";

const local_add = "http://localhost:3333/transportes/add";

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
	prevState: any,
	formData: FormData,
): Promise<ResponseAction> {
	const url = baseUrl("/transportes/add");

	const data = Object.fromEntries(formData);
	console.log(data);

	// define o schema de validação dos dados recebidos pelo form cliente
	const schema = z.object({
		empresaId: z.coerce
			.number()
			.positive({ message: "Selecione uma opção válida" }),
		motoristaId: z.coerce
			.number()
			.positive({ message: "Selecione uma opção válida" }),
	});

	// valida os dados usando o schema criado anteriormente
	const validation = schema.safeParse({
		empresaId: formData.get("empresaId"),
		motoristaId: formData.get("motoristaId"),
		tomadorId: formData.get("tomadorId"),
	});

	if (validation.success) {
		// se a validação foi bem sucedida, envia os dados para a api
		console.log(validation.data);
		try {
			// faz o fetch que envia os dados para a api
			const response = await fetch(url, {
				method: "POST",
				cache: "no-store",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(validation.data),
			});

			// capatura a resposta do servidor
			const res = await response.json();

			// se houver erros no servidor envia a resposta e o status da requisição
			if (!response.ok) {
				const responseServer: ResponseAction = {
					errors: [],
					message: {
						type: "error",
						text: `HTTP error! status: ${response.status} resposta: ${res}`,
					},
				};
				return responseServer;
			}

			// atualiza a requisição no cache
			revalidateTag("transportes");

			const responseServer: ResponseAction = {
				errors: [],
				message: {
					type: "success",
					text: "Transporte adicionado com sucesso",
					response: res,
				},
			};

			return responseServer;
		} catch (error) {
			// lança um erro se houver erros na requisição
			const response: ResponseAction = {
				errors: [],
				message: {
					type: "error",
					text: `Erro ao adicionar o transporte: : ${error}`,
				},
			};
			console.log(validation.data);
			return response;
		}
	} else {
		// se a validação falhar retorna um array de erros
		const response: ResponseAction = {
			errors: validation.error.issues,
			message: {},
		};
		console.log(validation);
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
