"use client";

import { GrStatusGood } from "react-icons/gr";
import { useAtendimentoStore } from "@/store/useAtendimentoStore";
import { DropdownAtendimento } from "./DropdownAtendimento";

export function ListAtendimentos() {
  const { atendimentos } = useAtendimentoStore();
  const data = atendimentos;
  console.log(data);
  return (
    <>
      {data &&
        data.map((atendimento, i) => (
          <ul key={atendimento.id}>
            <div
              role="atendimento"
              className="grid grid-flow-row auto-rows-auto w-full my-3 rounded-lg border bg-violet-50 p-1.5 shadow-sm shadow-gray-100"
            >
              <div className="grid grid-flow-col items-center">
                <div className="flex gap-2 items-center">
                  <GrStatusGood className="text-green-600" />
                  <div role="descricao" className="text-sm">{atendimento.descricao}</div>
                </div>

                <div role="menu-dropdown" className="justify-self-end">
                  <DropdownAtendimento />
                </div>
              </div>
              <div className="h-6 bg-green-500"></div>
              <div className="h-4 bg-blue-500"></div>
            </div>
          </ul>
        ))}
    </>
  );
}
