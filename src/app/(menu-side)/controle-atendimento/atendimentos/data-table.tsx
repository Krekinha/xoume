"use client";

import { Atendimento } from "@/utils/types";
import { GrStatusGood } from "react-icons/gr";

interface DataTableProps {
  data: Atendimento[];
}

export function DataTable({ data }: DataTableProps) {
  return (
    <>
      {data && (
        <table className="w-full">
          <tbody>
            {data.map((atendimento, i) => (
              <tr
                key={atendimento.id}
                className="hover:bg-muted/50 data-[state=selected]:bg-muted my-3 grid w-full grid-rows-3 rounded-lg border bg-violet-100 p-1.5 shadow-sm shadow-gray-100 transition-colors"
                data-state="false"
              >
                <div className="row-start-1 flex items-center gap-2 bg-blue-200">
                  <div>
                    <GrStatusGood className="text-green-600" />
                  </div>
                  <div className="text-sm">{atendimento.descricao}</div>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
