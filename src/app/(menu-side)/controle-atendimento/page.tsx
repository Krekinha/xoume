import Home from "./atendimentos/Home";
import { baseUrl } from "@/utils/constants";

async function getAtendimentos() {
  const res = await fetch(`${baseUrl("/api/atendimento/get-all")}`, {
    method: "GET",
    cache: "no-store",
  });
  /*if (!res.ok) {
    throw new Error("Failed to fetch data");
  }*/
  return res.json();
}

export default async function Page() {
  /**
   * etc
   * @author Krekinha
   * @version 1.0
   */
  const atendimentos = await getAtendimentos();
  console.log(atendimentos);

  return (
    <>
      <Home atendimentos={atendimentos} />
    </>
  );
}
