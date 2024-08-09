import type { Transporte } from "@/utils/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function getTeste() {
	const transportes: Transporte[] = [{ id: 1, empresaId: 1 }];
	return transportes;
}

export async function getTransportes() {
	const res = await fetch(`${process.env.API_TRANSMANAGER_URL}/transportes`, {
		cache: "no-store",
	});

	return await res.json();
}
