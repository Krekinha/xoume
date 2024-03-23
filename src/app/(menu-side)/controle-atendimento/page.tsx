import { useAtendimentoStore } from "@/store/useAtendimentoStore";
import Home from "./atendimentos/Home";
import { baseUrl } from "@/utils/constants";
import InitializerStore from "@/store/initializerStore";

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
  useAtendimentoStore.getState().setAtendimentos(atendimentos);
  console.log(atendimentos);

  return (
    <>
      <InitializerStore atendimentos={atendimentos} />
      <Home />
    </>
  );
}
