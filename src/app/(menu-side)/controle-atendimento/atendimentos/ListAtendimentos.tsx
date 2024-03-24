"use client";

import { Atendimento } from "@/utils/types";
import { GrStatusGood } from "react-icons/gr";
import { unstable_noStore as nostore } from "next/cache";
import { useAtendimentoStore } from "@/store/useAtendimentoStore";

interface ListAtendimentosProps {
  data: Atendimento[];
}

export function ListAtendimentos() {
  nostore();

  const { atendimentos } = useAtendimentoStore();
  const data = atendimentos;
  console.log(data);
  return (
    <>
      {data &&
        data.map((atendimento, i) => (
          <ul
            key={atendimento.id}
            className="my-3 grid w-full grid-rows-3 rounded-lg border bg-violet-50 p-1.5 shadow-sm shadow-gray-100"
          >
            <div className="row-start-1 flex items-center gap-2">
              <div>
                <GrStatusGood className="text-green-600" />
              </div>
              <div className="text-sm">{atendimento.descricao}</div>
            </div>
          </ul>
        ))}
    </>
  );
}
