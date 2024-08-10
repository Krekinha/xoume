import { baseUrl } from "@/utils/constants";
import type { Transporte } from "@/utils/types";
import type { Decimal } from "@prisma/client/runtime/library";

export const transporteService = {
	get,
	add,
	delete: _delete,
};

const local_add = "http://localhost:3333/transportes/add";

/** DELETE
 */
async function _delete(id: number) {
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

		return data;
	} catch (error) {
		console.log("Erro ao deletar o transporte:", error);
		throw error;
	}
}

async function add(values: Transporte) {
	const url = baseUrl("/transportes/add");

	const res = await fetch(url, {
		method: "POST",
		cache: "no-store",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(values),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.error("Error:", error);
			return error;
		});
	console.log("res: ", res);

	return res;
}

async function get() {
	const url = baseUrl("/api/transporte/get-all");
	const url2 = "http://localhost:3333/transportes/add";

	const res = await fetch(url, {
		method: "GET",
		cache: "no-store",
		//next: { revalidate: 1 },
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.error("Erro:", error);
			return error;
		});

	if (res.ok) return res.body;

	console.log(res);
	return res.statusText;
}
