import { Atendimento } from "@/utils/types";

export async function getAtendimentos() {
  const response = await fetch("/api/atendimento/get-all");
  return (await response.json()) as Atendimento[];
}
