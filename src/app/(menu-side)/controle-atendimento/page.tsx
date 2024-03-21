import { getAtendimentos } from "@/services/atendimentos/get-atendimentos";
import Home from "./atendimentos/Home";

export default async function Page() {
  /**
   * etc
   * @author Krekinha
   * @version 1.0
   */
  const atendimentos = await getAtendimentos()

  return (
    <>
      <Home atendimentos={atendimentos}/>
    </>
  );
}
