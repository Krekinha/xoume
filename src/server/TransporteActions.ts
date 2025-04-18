"use server";

import { auth } from "@/auth";
import { ServerActionError } from "@/lib/exceptions";

import prisma from "@/lib/prisma";
import { verifyRoles } from "@/lib/session";
import { camposAlterados } from "@/lib/utils";
import { transporteSchema, transporteUpdateSchema } from "@/utils/schemas";
import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { createServerAction } from "zsa";

export const getTransportes = createServerAction().handler(async () => {
	const session = await auth();

	if (!session?.user) {
		throw new Error("Não autorizado");
	}

	console.log({ user: session?.user });

	try {
		const transportes = await prisma.transporte.findMany({
			where: verifyRoles(session?.user.roles, ["ADMIN", "DEV"])
				? {}
				: {
						userId: session?.user.id,
					},
			include: {
				empresa: true,
				motorista: true,
				tomador: true,
				cteComplementar: true,
			},
			orderBy: {
				criadoEm: "desc",
			},
			take: 10, // Limita a consulta para retornar apenas os 10 últimos registros
		});
		return JSON.parse(JSON.stringify(transportes));
	} catch (error) {
		return new ServerActionError(error);
	}
});

export const getTransporteById = createServerAction()
	.input(
		z.object({
			id: z.string(),
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
		} catch (error) {
			return new ServerActionError(error);
		}
	});

export const addTransporte = createServerAction()
	.input(transporteSchema)
	.handler(async ({ input }) => {
		const session = await auth();

		console.log("input:", input);
		if (!session?.user) {
			throw new Error("Não autorizado");
		}

		try {
			await prisma.transporte.create({
				data: {
					userId: session.user.id,
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

			return {
				message: "Transporte adicionado com sucesso",
				code: 200,
			};
		} catch (error) {
			throw new ServerActionError(error);
		}
	});

export const updateTransporte = createServerAction()
	.input(transporteUpdateSchema)
	.handler(async ({ input }) => {
		const session = await auth();

		if (!session?.user) {
			throw new Error("Não autorizado");
		}

		const data = await prisma.transporte.findUnique({
			where: {
				id: input.id,
			},
		});

		// Verifica se o transporte existe
		if (!data) {
			throw new Error("Transporte não encontrado");
		}

		// Verifica se o usuário tem permissão para editar o transporte
		if (
			data.userId !== session.user.id &&
			!verifyRoles(session.user.roles, ["ADMIN", "DEV"])
		) {
			throw new Error("Não autorizado");
		}

		// Converte os campos de string para decimal
		const transporte = stringFieldAsDecimalField(data);

		// Obtém os campos alterados
		const alterados = camposAlterados(
			transporte,
			input as any, // Usar 'any' temporariamente para evitar o erro de tipo
		);

		console.log({ alterados });
		if (Object.keys(alterados).length === 0) {
			return { message: "Nenhuma alteração a ser realizada", code: 204 };
		}

		try {
			await prisma.transporte.update({
				where: {
					id: input.id,
				},
				data: alterados as Prisma.TransporteUncheckedUpdateInput,
			});

			return {
				message: "Transporte atualizado com sucesso",
				code: 200,
			};
		} catch (error) {
			return new ServerActionError(error);
		}
	});

export const delTransporte = createServerAction()
	.input(
		z.object({
			id: z.string()}),
	)
	.handler(async ({ input }) => {
		console.log(input.id);

		const session = await auth();

		if (!session?.user) {
			throw new Error("Não autorizado");
		}

		const data = await prisma.transporte.findUnique({
			where: {
				id: input.id,
			},
		});

		// Verifica se o transporte existe
		if (!data) {
			throw new Error("Transporte não encontrado");
		}

		// Verifica se o usuário tem permissão para deletar o transporte
		if (
			data.userId !== session.user.id &&
			!verifyRoles(session.user.roles, ["ADMIN", "DEV"])
		) {
			throw new Error("Não autorizado");
		}

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
				code: 200,
			};
		} catch (error) {
			return new ServerActionError(error);
		}
	});

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
