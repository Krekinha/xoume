"use client";

import { useAtendimentoStore } from "@/store/useAtendimentoStore";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownAtendimento() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuLabel>Atendimento</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-300" />
        <DropdownMenuItem
          onClick={() => {}}
          className="hover:bg-gray-300 cursor-pointer rounded gap-2"
        >
          <AiFillEdit className="text-blue-600"/>
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-300 cursor-pointer rounded gap-2">
          <RiDeleteBin6Line className="text-red-600"/>
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
