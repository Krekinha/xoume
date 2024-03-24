import { useAtendimentoStore } from "@/store/useAtendimentoStore";
import Home from "./atendimentos/Home";
import { baseUrl } from "@/utils/constants";
import { Atendimento } from "@/utils/types";
import { Suspense } from "react";
import Loading from "./loading";
import InitializerStore from "@/store/initializerStore";

async function getAtendimentos() {
  const res = await fetch(`${baseUrl("/api/atendimento/get-all")}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Erro ao obter os dados");
  }
  return res.json();
}

async function getAtendimentosWithDelay() {
  return new Promise((resolve, reject) => {
     setTimeout(async () => {
       try {
         const data = await getAtendimentos();
         resolve(data);
       } catch (error) {
         reject(error);
       }
     }, 5000); // Aqui você pode definir o tempo de delay em milissegundos. 2000ms = 2 segundos.
  });
 }

export default async function Page() {

  const data = await getAtendimentos() as Atendimento[];
  useAtendimentoStore.getState().setAtendimentos(data);
  const atendimentos = useAtendimentoStore.getState().atendimentos


  return (
    <>
    <InitializerStore atendimentos={data}/>
    <Suspense fallback={<Loading/>}>
      <Home atendimentos={atendimentos} />
    </Suspense>
      
    </>
  );
}
