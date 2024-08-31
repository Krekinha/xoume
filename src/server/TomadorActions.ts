"use server";

import { baseUrl } from "@/utils/constants";
import { Prisma, PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

const prisma = new PrismaClient();

export async function getTomadores() {
	const res = await fetch(`${process.env.API_TRANSMANAGER_URL}/tomadores`, {
		next: { tags: ["tomadores"] },
	});

	const response = await res.json();
	const tomadores = response.tomadores;

	return tomadores;
}
