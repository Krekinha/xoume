"use client";
import { atendimentoService } from "@/services/atendimentoService";
import { useAtendimentoStore } from "@/store/useAtendimentoStore";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Atendimento } from "@/utils/types";

interface Props {
  atendimento: Atendimento;
}

export function DropdownAtendimento({ atendimento }: Props) {
  const { getAtendimentos } = useAtendimentoStore();

  async function excluirAtendimento() {
    try {
      const response = await atendimentoService.delete(atendimento.id || "");
      getAtendimentos();
    } catch (error) {
      console.error("Erro ao exluir atendimento:", error);
      // Aqui eu posso adicionar um tratamento de erro, como mostrar uma mensagem de erro na interface do usuário.
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex h-6 w-6 p-0 hover:bg-gray-200 active:bg-gray-300 ease-linear transition-all 
                     cursor-pointer duration-150 select-none items-center justify-center rounded-md"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuLabel>Atendimento</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-300" />
        <DropdownMenuItem
          onClick={() => {}}
          className="hover:bg-gray-300 cursor-pointer rounded gap-2"
        >
          <AiFillEdit className="text-blue-600" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => excluirAtendimento()}
          className="hover:bg-gray-300 cursor-pointer rounded gap-2"
        >
          <RiDeleteBin6Line className="text-red-600" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
