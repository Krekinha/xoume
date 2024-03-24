import { baseUrl } from "@/utils/constants";
import { Atendimento } from "@/utils/types";

export const atendimentoService = {
  get,
  add,
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

async function get() {
  const url = baseUrl("/api/atendimento/get-all");
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
  //return res;
  return res;
}

async function add(values: any) {
  const url = baseUrl("/api/atendimento/add");

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
