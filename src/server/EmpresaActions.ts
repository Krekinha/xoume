"use server";

import { baseUrl } from "@/utils/constants";
import { Prisma, PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

const prisma = new PrismaClient();

export async function getEmpresas() {
	const res = await fetch(`${process.env.API_TRANSMANAGER_URL}/empresas`, {
		next: { tags: ["empresas"] },
	});

	const response = await res.json();
	const empresas = response.empresas;
	//console.log(empresas);
	return empresas;
}
