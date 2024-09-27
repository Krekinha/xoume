"use server";

import { transporteSchema, transporteUpdateSchema } from "@/utils/schemas";
import type { Transporte } from "@/utils/types";
import { Prisma, PrismaClient } from "@prisma/client";
import { z, ZodError, type ZodIssue } from "zod";
import { createServerAction, createServerActionProcedure, ZSAError } from "zsa";

const prisma = new PrismaClient();

const publicAction = createServerActionProcedure()
	.experimental_shapeError(({ err, typedData }) => {
		if (err instanceof ZSAError) {
			const { code: type, inputParseErrors, message } = err;
			return {
				message: err.message,
				code: err.code,
				rhfErrors: {
					root: {
						type,
						message: message ?? inputParseErrors?.fieldErrors?.[0],
					},
					...Object.fromEntries(
						Object.entries(inputParseErrors?.fieldErrors ?? {}).map(
							([name, errors]) => [
								name,
								{ message: errors?.[0] },
							],
						),
					),
				},
				values: typedData.inputRaw,
			};
		}
		return {
			message: "Something went wrong",
			code: "ERROR",
			values: typedData.inputRaw,
		};
	})
	.handler(() => {})
	.createServerAction();

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
			orderBy: {
				criadoEm: "desc",
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

export const getTransporteById = createServerAction()
	.input(
		z.object({
			id: z.coerce.number(),
		}),
	)
	.handler(async ({ input }) => {
		console.log(input.id);

		try {
			const transporte = await prisma.transporte.findUnique({
				where: {
					id: input.id,
				},
				include: {
					empresa: true,
					motorista: true,
					tomador: true,
					cteComplementar: true,
				},
			});

			return JSON.parse(JSON.stringify(transporte));
		} catch (error: unknown) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError ||
				error instanceof Prisma.PrismaClientUnknownRequestError
			) {
				console.log("Erro conhecido do Prisma:", error.message);
				return new Error(error.message);
			}
			throw new Error(`Falha ao buscar municípios: ${String(error)}`);
		}
	});

export const addTransporte = createServerAction()
	.input(transporteSchema)
	.handler(async ({ input }) => {
		console.log(input);

		try {
			const novoTransporte = await prisma.transporte.create({
				data: {
					empresaId: input.empresaId,
					motoristaId: input.motoristaId,
					tomadorId: input.tomadorId,
					notas: input.notas,
					cte: input.cte,
					uf_origem: input.uf_origem,
					cidade_origem: input.cidade_origem,
					uf_destino: input.uf_destino,
					cidade_destino: input.cidade_destino,
					peso: input.peso,
					val_tonelada: input.val_tonelada,
					val_cte: input.val_cte,
					reducao_bc_icms: input.reducao_bc_icms,
					aliquota_icms: input.aliquota_icms,
					emissao_cte: input.emissao_cte,
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

export const updateTransporte = createServerAction()
	.input(transporteUpdateSchema)
	.handler(async ({ input }) => {
		// console.log({ input });

		const data = await prisma.transporte.findUnique({
			where: {
				id: input.id,
			},
		});

		const transporte = stringFieldAsDecimalField(data);
		const camposAlterados = obterCamposAlterados(
			transporte,
			input as Partial<Transporte>,
		);

		// console.log({ camposAlterados });
		if (Object.keys(camposAlterados).length === 0) {
			return { message: "Nenhuma alteração foi realizada", code: 204 };
		}

		try {
			const updatedTransporte = await prisma.transporte.update({
				where: {
					id: input.id,
				},
				data: camposAlterados as Prisma.TransporteUncheckedUpdateInput,
			});

			return {
				message: "Transporte atualizado com sucesso",
				code: 201,
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
			const resultado = await prisma.$transaction(async (prisma) => {
				// Primeiro, deletamos o cteComplementar se existir
				await prisma.cteComplementar.deleteMany({
					where: {
						transporteId: input.id,
					},
				});

				// Agora deletamos o transporte
				const transporte = await prisma.transporte.delete({
					where: {
						id: input.id,
					},
					select: {
						cte: true,
						notas: true,
					},
				});

				return transporte;
			});

			console.log(resultado);
			return {
				message: `Transporte referente ao CT-e "${resultado.cte ?? "(não informado)"}", nota(s) "${resultado.notas.length > 0 ? resultado.notas : "(não informado)"}" excluído com sucesso!`,
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
	transporte: Transporte,
	newValues: Partial<Transporte>,
): Partial<Transporte> {
	const camposAlterados: Partial<Transporte> = {};

	for (const chave in newValues) {
		if (Object.prototype.hasOwnProperty.call(transporte, chave)) {
			const valorAntigo = transporte[chave as keyof Transporte];
			const valorNovo = newValues[chave as keyof Transporte];

			if (Array.isArray(valorNovo) && Array.isArray(valorAntigo)) {
				if (!arraysAreEqual(valorNovo as any[], valorAntigo as any[])) {
					camposAlterados[chave as keyof Transporte] =
						valorNovo as any;
				}
			} else if (
				valorAntigo instanceof Date &&
				valorNovo instanceof Date
			) {
				if (valorAntigo.getTime() !== valorNovo.getTime()) {
					camposAlterados[chave as keyof Transporte] =
						valorNovo as any;
				}
			} else if (valorNovo !== valorAntigo) {
				camposAlterados[chave as keyof Transporte] = valorNovo as any;
			}
		}
	}

	return camposAlterados;
}

function stringFieldAsDecimalField(transporte: any) {
	const peso = transporte.peso
		? Number.parseFloat(transporte.peso.toString())
		: transporte.peso;
	const val_tonelada = transporte.val_tonelada
		? Number.parseFloat(transporte.val_tonelada.toString())
		: transporte.val_tonelada;
	const val_cte = transporte.val_cte
		? Number.parseFloat(transporte.val_cte.toString())
		: transporte.val_cte;
	const reducao_bc_icms = transporte.reducao_bc_icms
		? Number.parseFloat(transporte.reducao_bc_icms.toString())
		: transporte.reducao_bc_icms;
	const aliquota_icms = transporte.aliquota_icms
		? Number.parseFloat(transporte.aliquota_icms.toString())
		: transporte.aliquota_icms;

	return {
		...transporte,
		peso,
		val_tonelada,
		val_cte,
		reducao_bc_icms,
		aliquota_icms,
	};
}
