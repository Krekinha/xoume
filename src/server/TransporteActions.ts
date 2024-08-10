"use server";

import { baseUrl } from "@/utils/constants";
import type { Transporte } from "@/utils/types";
import { revalidateTag } from "next/cache";

const local_add = "http://localhost:3333/transportes/add";

export async function getTransportes() {
	const res = await fetch(`${process.env.API_TRANSMANAGER_URL}/transportes`, {
		next: { tags: ["transportes"] },
	});

	const response = await res.json();
	const transportes = response.transportes;
	//console.log(transportes);
	return transportes;
}

export async function addTransporte(data: Transporte) {
	const url = baseUrl("/transportes/add");

	console.log(data);

	const res = await fetch(url, {
		method: "POST",
		cache: "no-store",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.error("Error:", error);
			return error;
		});
	console.log("res: ", res);

	revalidateTag("transportes");

	return res;
}

export async function delTransporte(id: number) {
	console.log(id);
	const url = baseUrl(`/transportes/del/${id}`);
	const local_del = `http://localhost:3333/transportes/del/${id}`;

	try {
		const res = await fetch(url, {
			method: "DELETE",
		});

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const data = await res.json();
		console.log(data);

		revalidateTag("transportes");

		return data;
	} catch (error) {
		console.log("Erro ao deletar o transporte:", error);
		throw error;
	}
}
