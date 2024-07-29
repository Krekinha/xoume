"use client";

import { transporteService } from "@/services/transporteService";
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
import type { Transporte } from "@/utils/types";

interface Props {
	transporte: Transporte;
}

export function DropdownTransporte({ transporte }: Props) {
	async function excluirTransporte() {
		try {
			const response = await transporteService.delete(transporte.id);
			console.log(response);
			//getTransportes();
		} catch (error) {
			console.error("Erro ao exluir transporte:", error);
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
				<DropdownMenuLabel>Transporte</DropdownMenuLabel>
				<DropdownMenuSeparator className="bg-gray-300" />
				<DropdownMenuItem
					onClick={() => {}}
					className="hover:bg-gray-300 cursor-pointer rounded gap-2"
				>
					<AiFillEdit className="text-blue-600" />
					Editar
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => excluirTransporte()}
					className="hover:bg-gray-300 cursor-pointer rounded gap-2"
				>
					<RiDeleteBin6Line className="text-red-600" />
					Excluir
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
