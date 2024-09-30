"use server";

import { Prisma } from "@prisma/client";
import { createServerAction } from "zsa";
import prisma from "@/lib/prisma";

export const getTomadores = createServerAction().handler(async () => {
	try {
		const tomadores = await prisma.tomador.findMany();
		return JSON.parse(JSON.stringify(tomadores));
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
