"use client";

import { GrStatusGood } from "react-icons/gr";
import { CgHashtag } from "react-icons/cg";
import { FaHandshake } from "react-icons/fa6";
import { IoCalendarNumber } from "react-icons/io5";
import { RiCalendar2Line } from "react-icons/ri";
import { useAtendimentoStore } from "@/store/useAtendimentoStore";
import { LuCalendarDays } from "react-icons/lu";
import { DropdownAtendimento } from "./DropdownAtendimento";
import { formatarData, formatarDataByWDM } from "@/utils/format";
import { Separator } from "@/components/ui/separator";

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
              className="grid grid-flow-row auto-rows-auto w-full my-3 rounded-lg border border-gray-200 bg-violet-50/30 p-1.5 shadow-sm-light shadow-gray-100"
            >
              <div
                role="titulo-menu"
                className="grid grid-flow-col items-center"
              >
                <div className="flex gap-2 items-center">
                  <GrStatusGood className="text-green-600" />
                  <div role="titulo" className="text-sm">
                    {atendimento.titulo}
                  </div>
                </div>

                <div role="menu-dropdown" className="justify-self-end">
                  <DropdownAtendimento atendimento={atendimento} />
                </div>
              </div>
              <div
                role="descricao"
                className=" text-xs truncate text-gray-500 ml-6"
              >
                {atendimento.descricao}
              </div>
              <div
                role="tags"
                className="flex flex-row gap-2.5 items-center mt-3 text-gray-700"
              >
                <div role="ordem" title="Ordem" className="flex items-center">
                  <CgHashtag className="text-sky-600" />
                  <div role="ordem" className="text-xs">
                    {atendimento.ordem}
                  </div>
                </div>
                <Separator orientation="vertical" className="bg-gray-200"/>
                <div
                  role="prazo"
                  title={
                    "Data de vencimento: " + formatarData(atendimento.prazo)
                  }
                  className="flex items-center gap-1 "
                >
                  <RiCalendar2Line className="text-sky-600" />
                  <div role="ordem" className="text-[0.70rem]">
                    {formatarDataByWDM(atendimento.prazo)}
                  </div>
                </div>
                <Separator orientation="vertical" className="bg-gray-200"/>
                <div
                  role="cliente"
                  title="Cliente"
                  className="flex items-center gap-1"
                >
                  <FaHandshake className="text-sky-600" />
                  <div role="razao" className="text-[0.70rem]">
                    {atendimento.cliente?.razaoNome}
                  </div>
                </div>
              </div>
            </div>
          </ul>
        ))}
    </>
  );
}
