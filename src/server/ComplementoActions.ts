"use server";

import prisma from "@/lib/prisma";
import { complementoSchema, complementoUpdateSchema } from "@/utils/schemas";
import type { CteComplementar } from "@/utils/types";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { ZSAError, createServerAction } from "zsa";

export const addComplemento = createServerAction()
	.input(complementoSchema)
	.handler(async ({ input }) => {
		try {
			await prisma.cteComplementar.create({
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

			return {
				message: "Complemento adicionado com sucesso",
				code: 201,
			};
		} catch (error: unknown) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError ||
				error instanceof Prisma.PrismaClientUnknownRequestError
			) {
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
			throw error;
		}
	});

export const updateComplemento = createServerAction()
	.input(complementoUpdateSchema)
	.handler(async ({ input }) => {
		console.log({ input });

		const data = await prisma.cteComplementar.findUnique({
			where: {
				id: input.id,
			},
		});

		const complemento = stringFieldAsDecimalField(data);
		const camposAlterados = obterCamposAlterados(
			complemento,
			input as Partial<CteComplementar>,
		);

		console.log({ camposAlterados });
		if (Object.keys(camposAlterados).length === 0) {
			return { message: "Nenhuma alteração foi realizada", code: 204 };
		}

		try {
			await prisma.cteComplementar.update({
				where: {
					id: input.id,
				},
				data: camposAlterados as Prisma.CteComplementarUncheckedUpdateInput,
			});

			return {
				message: "Complemento atualizado com sucesso",
				code: 200,
			};
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
			const cteComplementar = await prisma.cteComplementar.delete({
				where: {
					id: input.id,
				},
				select: {
					cte: true,
				},
			});
			return {
				message: `Cte complementar "${cteComplementar.cte}" excluído com sucesso!`,
				code: 200,
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

function arraysAreEqual(arr1: any[], arr2: any[]): boolean {
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
}

function obterCamposAlterados(
	complemento: CteComplementar,
	newValues: Partial<CteComplementar>,
): Partial<CteComplementar> {
	const camposAlterados: Partial<CteComplementar> = {};

	for (const chave in newValues) {
		if (Object.prototype.hasOwnProperty.call(complemento, chave)) {
			const valorAntigo = complemento[chave as keyof CteComplementar];
			const valorNovo = newValues[chave as keyof CteComplementar];

			if (Array.isArray(valorNovo) && Array.isArray(valorAntigo)) {
				if (!arraysAreEqual(valorNovo as any[], valorAntigo as any[])) {
					camposAlterados[chave as keyof CteComplementar] =
						valorNovo as any;
				}
			} else if (
				valorAntigo instanceof Date &&
				valorNovo instanceof Date
			) {
				if (valorAntigo.getTime() !== valorNovo.getTime()) {
					camposAlterados[chave as keyof CteComplementar] =
						valorNovo as any;
				}
			} else if (valorNovo !== valorAntigo) {
				camposAlterados[chave as keyof CteComplementar] =
					valorNovo as any;
			}
		}
	}

	return camposAlterados;
}

function stringFieldAsDecimalField(complemento: any) {
	const peso = complemento.peso
		? Number.parseFloat(complemento.peso.toString())
		: complemento.peso;
	const val_tonelada = complemento.val_tonelada
		? Number.parseFloat(complemento.val_tonelada.toString())
		: complemento.val_tonelada;
	const val_cte = complemento.val_cte
		? Number.parseFloat(complemento.val_cte.toString())
		: complemento.val_cte;
	const reducao_bc_icms = complemento.reducao_bc_icms
		? Number.parseFloat(complemento.reducao_bc_icms.toString())
		: complemento.reducao_bc_icms;
	const aliquota_icms = complemento.aliquota_icms
		? Number.parseFloat(complemento.aliquota_icms.toString())
		: complemento.aliquota_icms;

	return {
		...complemento,
		peso,
		val_tonelada,
		val_cte,
		reducao_bc_icms,
		aliquota_icms,
	};
}
