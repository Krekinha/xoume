"use client";

import { GrStatusGood } from "react-icons/gr";
import { CgHashtag } from "react-icons/cg";
import { FaRegHandshake } from "react-icons/fa6";
import { RiCalendar2Line } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";
import { DropdownAtendimento } from "./DropdownAtendimento";
import {
  formatarData,
  formatarDataByWDM,
  formatarEvolucao,
} from "@/utils/format";
import { Separator } from "@/components/ui/separator";
import type { Atendimento } from "@/utils/types";

interface ListAtendimentosProps {
  atendimentos: Atendimento[];
 }

export function ListAtendimentos({atendimentos}: ListAtendimentosProps) {
  //const { atendimentos } = useAtendimentoStore();
  const data = atendimentos;
  console.log(data);
  return (
    <>
      {
        data?.map((atendimento, i) => (
          <ul key={atendimento.id}>
            <div
              className="grid grid-flow-row auto-rows-auto w-full my-3 rounded-lg border border-gray-200 bg-violet-50/30 p-1.5 shadow-sm-light shadow-gray-100"
            >
              {/* Título/Menu */}
              <div
                className="grid grid-flow-col items-center"
              >
                <div className="flex gap-2 items-center">
                  <GrStatusGood className="text-green-600" />
                  <div
                    className="text-[0.790rem] "
                  >
                    {atendimento.titulo}
                  </div>
                </div>

                <div className="justify-self-end">
                  <DropdownAtendimento atendimento={atendimento} />
                </div>
              </div>

              {/* Descrição */}
              <div
                className=" text-xs truncate text-gray-500/75 ml-6 mr-1"
              >
                {atendimento.descricao}
              </div>

              <div
                className="flex flex-row gap-2.5 items-center mt-3 text-gray-700/85"
              >
                {/* TAG - Ordem */}
                <div title="Ordem" className="flex items-center">
                  <CgHashtag className="text-sky-600 w-3 h-3" />
                  <div className="text-[0.70rem] font-medium">
                    {atendimento.ordem}
                  </div>
                </div>

                {/* TAG - Evolucao */}
                {atendimento.evolucao?.eventos && (
                  <>
                    <Separator orientation="vertical" className="bg-gray-200" />
                    <div
                      title="Evolução do atendimento"
                      className="flex items-center gap-1 "
                    >
                      <FaListCheck className="text-sky-600 w-3 h-3" />
                      <div className="text-[0.70rem]">
                        {formatarEvolucao(atendimento.evolucao?.eventos)}
                      </div>
                    </div>
                  </>
                )}

                {/* TAG - Prazo */}
                {atendimento.prazo && (
                  <>
                    <Separator orientation="vertical" className="bg-gray-200" />
                    <div
                      title={
                        `Data de vencimento: ${formatarData(atendimento.prazo)}`
                      }
                      className="flex items-center gap-1 "
                    >
                      <RiCalendar2Line className="text-sky-600 w-3 h-3" />
                      <div className="text-[0.70rem]">
                        {formatarDataByWDM(atendimento.prazo)}
                      </div>
                    </div>
                  </>
                )}

                {/* TAG - Cliente */}
                {atendimento.cliente && (
                  <>
                    <Separator orientation="vertical" className="bg-gray-200" />
                    <div
                      title="Cliente"
                      className="flex items-center gap-1"
                    >
                      <FaRegHandshake className="text-sky-600 w-3 h-3" />
                      <div className="text-[0.65rem]">
                        {atendimento.cliente?.razaoNome}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </ul>
        ))}
    </>
  );
}
