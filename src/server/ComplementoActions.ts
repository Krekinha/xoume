"use server";

import { complementoSchema } from "@/utils/schemas";
import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";
import { createServerAction, ZSAError } from "zsa";

const prisma = new PrismaClient();

export const addComplemento = createServerAction()
	.input(complementoSchema)
	.handler(async ({ input }) => {
		console.log(input);

		try {
			const novoCteComplementar = await prisma.cteComplementar.create({
				data: {
					cte: input.cte,
					peso: input.peso,
					val_tonelada: input.val_tonelada,
					val_cte: input.val_cte,
					reducao_bc_icms: input.reducao_bc_icms,
					aliquota_icms: input.aliquota_icms,
					emissao_cte: input.emissao_cte,
					transporte: {
						connect: { id: input.transporteId },
					},
				},
			});

			return "Complemento adicionado com sucesso";
		} catch (error: unknown) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError ||
				error instanceof Prisma.PrismaClientUnknownRequestError
			) {
				console.log(error.message);
				throw error;
			}
			if (error instanceof ZSAError) {
				console.log(error);
				throw new ZSAError("INPUT_PARSE_ERROR", {
					cause: error.cause,
					code: error.code,
					name: error.name,
					data: error.data,
					message: error.message,
					inputParseErrors: error.inputParseErrors,
					outputParseErrors: error.outputParseErrors,
					stack: error.stack,
				});
			}
			console.log(error);
			throw error;
		}
	});

export const delComplemento = createServerAction()
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
