"use server";

import { Prisma } from "@prisma/client";
import { createServerAction } from "zsa";
import prisma from "@/lib/prisma";

export const getMotoristas = createServerAction().handler(async () => {
	try {
		const motoristas = await prisma.motorista.findMany({
			include: {
				empresas: true,
			},
		});
		return JSON.parse(JSON.stringify(motoristas));
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
