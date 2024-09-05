"use server";

import { Prisma, PrismaClient } from "@prisma/client";
import { createServerAction } from "zsa";

const prisma = new PrismaClient();

export const getEmpresas = createServerAction().handler(async () => {
	try {
		const empresas = await prisma.empresa.findMany({
			include: {
				motoristas: true,
			},
		});
		return JSON.parse(JSON.stringify(empresas));
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
