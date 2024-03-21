"use client";

import { formatarDataHora } from "@/utils/format";
import { Atendimento } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Atendimento>[] = [
  {
    accessorKey: "ordem",
    header: () => <div className="">Ordem</div>,
  },
  {
    accessorKey: "descricao",
    header: () => <div className="text-left">Descrição</div>,
  },
  {
    accessorKey: "criadoEm",
    header: () => "Data criação",
    cell: ({ row }) => {
      const valor = row.getValue("criadoEm") as Date;
      const dataHora = formatarDataHora(valor);
      return <div>{dataHora}</div>;
    },
  },
];
