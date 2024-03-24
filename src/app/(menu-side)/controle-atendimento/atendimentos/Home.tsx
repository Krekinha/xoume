"use client";
import { GrAdd, GrStatusGood } from "react-icons/gr";
import { ListAtendimentos } from "./ListAtendimentos";
import { Atendimento } from "@/utils/types";
import { useAtendimentoStore } from "@/store/useAtendimentoStore";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { DialogAddAtendimento } from "./DialogAddAtendimento";

interface props {
  atendimentos: Atendimento[];
}

export default function Home({ atendimentos }: props) {
  console.log("atendimentos inicial: ", atendimentos);
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
              <ListAtendimentos data={atendimentos} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
