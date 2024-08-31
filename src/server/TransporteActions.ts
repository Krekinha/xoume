"use server";

import { baseUrl } from "@/utils/constants";
import { Prisma, PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

const prisma = new PrismaClient();
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

export const addTransporte = createServerAction()
	.input(
		z.object({
			empresaId: z.coerce
				.number()
				.positive({ message: "Selecione uma opção válida" }),
			motoristaId: z.coerce
				.number()
				.positive({ message: "Selecione uma opção válida" }),
			tomadorId: z.coerce
				.number()
				.positive({ message: "Selecione uma opção válida" })
				.optional(),
		}),
	)
	.handler(async ({ input }) => {
		console.log(input);

		try {
			const novoTransporte = await prisma.transporte.create({
				data: {
					empresaId: input.empresaId,
					motoristaId: input.motoristaId,
					tomadorId: input.tomadorId,
					// notas: body.notas,
					// cte: body.cte,
					// uf_origem: body.uf_origem,
					// cidade_origem: body.cidade_origem,
					// uf_destino: body.uf_destino,
					// cidade_destino: body.cidade_destino,
					// peso: body.peso,
					// val_tonelada: body.val_tonelada,
					// val_frete: body.val_frete,
					// val_cte: body.val_cte,
					// aliquota_icms: body.aliquota_icms,
					// val_icms: body.val_icms,
					// empresaId: body.empresaId,
					// motoristaId: body.motoristaId,
					// tomadorId: body.tomadorId,
				},
			});

			// atualiza a requisição no cache
			revalidateTag("transportes");

			return "Transporte adicionado com sucesso";
		} catch (error: unknown) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError ||
				error instanceof Prisma.PrismaClientUnknownRequestError
			) {
				console.log(error.message);
				throw error;
			}
			console.log(error);
			throw error;
		}
	});
