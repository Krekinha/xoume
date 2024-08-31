"use server";

import { baseUrl } from "@/utils/constants";
import { Prisma, PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

const prisma = new PrismaClient();

export async function getMotoristas() {
	const res = await fetch(`${process.env.API_TRANSMANAGER_URL}/motoristas`, {
		next: { tags: ["motoristas"] },
	});

	const response = await res.json();
	const motoristas = response.motoristas;
	//console.log(motoristas);
	return motoristas;
}
