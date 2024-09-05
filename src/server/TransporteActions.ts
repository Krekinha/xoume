"use server";

import { baseUrl } from "@/utils/constants";
import { Prisma, PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

const prisma = new PrismaClient();

export const getTransportes = createServerAction().handler(async () => {
	try {
		/**
		 * É necessário que o include seja feita em todos os relacionamentos
		 * entre os objetos, do contrário, os elementos sem o include não
		 * irão aparecer em componentes visuais como lista e tabelas
		 */
		const transportes = await prisma.transporte.findMany({
			include: {
				empresa: true,
				motorista: true,
				tomador: true,
				cteComplementar: true,
			},
		});
		return JSON.parse(JSON.stringify(transportes));
	} catch (error: unknown) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError ||
			error instanceof Prisma.PrismaClientUnknownRequestError
		) {
			console.log("Erro conhecido do Prisma:", error.message);
			return new Error(error.message);
		}
		throw error;
	}
});

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
			uf_origem: z
				.string({ message: "UF: O valo esperado é uma string" })
				.optional(),
			cidade_origem: z
				.string({ message: "Cidade: O valo esperado é uma string" })
				.optional(),
			uf_destino: z
				.string({ message: "UF: O valo esperado é uma string" })
				.optional(),
			cidade_destino: z
				.string({ message: "Cidade: O valo esperado é uma string" })
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
					uf_origem: input.uf_origem,
					cidade_origem: input.cidade_origem,
					uf_destino: input.uf_destino,
					cidade_destino: input.cidade_destino,
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

export const delTransporte = createServerAction()
	.input(
		z.object({
			id: z.coerce
				.number()
				.positive({ message: "O Id informado não é um número válido" }),
		}),
	)
	.handler(async ({ input }) => {
		console.log(input.id);

		try {
			const transporte = await prisma.transporte.delete({
				where: {
					id: input.id,
				},
				select: {
					cte: true,
					notas: true,
				},
			});
			console.log(transporte);
			return {
				message: `Transporte referente ao CT-e "${transporte.cte ?? "(não informado)"}", nota(s) "${transporte.notas.length > 0 ? transporte.notas : "(não informado)"}" excluído com sucesso!`,
			};
		} catch (error: unknown) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError ||
				error instanceof Prisma.PrismaClientUnknownRequestError
			) {
				console.log("Erro conhecido do Prisma:", error.message);
				throw error;
			}
			throw error;
		}
	});
