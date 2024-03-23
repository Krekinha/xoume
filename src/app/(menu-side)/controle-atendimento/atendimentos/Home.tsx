"use client";
import { GrAdd } from "react-icons/gr";
import { DataTable } from "./data-table";
import { Atendimento } from "@/utils/types";
import { useAtendimentoStore } from "@/store/useAtendimentoStore";

interface props {
  atendimentos: Atendimento[];
}

export default function Home() {
  const {atendimentos} = useAtendimentoStore()
  console.log(atendimentos);
  return (
    <>
      <nav className="navbar p-4 sm:ml-64 fixed top-0 w-full mt-11 py-2 text-gray-800 shadow-sm bg-white">
        <button
          className="button-add rounded-full p-1 bg-green-600 text-white hover:bg-green-700 active:bg-green-800
        shadow-md hover:shadow-lg focus:shadow-lg ease-linear transition-all 
        cursor-pointer duration-150 select-none "
        >
          <GrAdd className="h-4 w-4" />
        </button>
        <span className="ml-2 text-sm">Adicionar atendimento</span>
      </nav>
      <div className="p-4 sm:ml-64 mt-8">
        <div className="mt-12">
          <div className="container mx-auto">
            <div className="relative w-full overflow-auto">
              <DataTable data={atendimentos} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
