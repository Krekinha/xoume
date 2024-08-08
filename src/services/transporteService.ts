import { baseUrl } from "@/utils/constants";
import type { Transporte } from "@/utils/types";

export const transporteService = {
	get,
	add,
	delete: _delete,
};

/*async function update(values: ConfigEscala) {
  const url = baseUrl("/api/escala/config/update");

  const res = await fetch(url, {
    method: "POST",
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
}*/

async function _delete(id: number) {
	const url = baseUrl(`/transportes/del/${id}`);
	const res = await fetch(url, {
		method: "DELETE",
		cache: "no-store",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(id),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.error("Erro:", error);
			return error;
		});
	//return res;
	return res;
}

async function add(values: object) {
	const api = process.env.API_TRANSMANAGER_URL;
	const url = baseUrl("/transportes/add");
	const url2 = "http://localhost:3333/transportes/add";

	console.log(url);
	console.log(JSON.stringify(values));
	const res = await fetch(url2, {
		method: "POST",
		//cache: "no-store",
		//headers: { "Content-Type": "application/json" },
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
