"use client";
import { ListAtendimentos } from "./ListAtendimentos";
import { useAtendimentoStore } from "@/store/useAtendimentoStore";
import { DialogAddAtendimento } from "./DialogAddAtendimento";

export default function Home() {
  useAtendimentoStore.getState().getAtendimentos();
  const data = useAtendimentoStore.getState().atendimentos;
  return (
    <>
      <nav className="navbar p-4 sm:ml-64 fixed top-0 w-full mt-11 py-2 shadow-sm bg-white">
        <DialogAddAtendimento />
        <span className="ml-2 text-sm text-black">Novo atendimento</span>
      </nav>
      <div className="p-4 sm:ml-64 mt-8">
        <div className="mt-12">
          <div className="container mx-auto">
            <div className="relative w-full overflow-auto">
              <ListAtendimentos />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
