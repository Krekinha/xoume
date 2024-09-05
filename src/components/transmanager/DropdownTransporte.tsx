"use client";
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
import type { ErrorResponse, Transporte } from "@/utils/types";
import { delTransporte } from "@/server/TransporteActions";
import { cn } from "@/lib/utils";
import {
	QueryKeyFactory,
	useServerActionQuery,
} from "@/lib/server-action-hooks";
import { useState } from "react";
import ModalDialog from "./ModalDialog";
import { useServerAction } from "zsa-react";
import { useModalDialogContext } from "@/providers/ModaDialogProvider";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
	transporte: Transporte;
}

export function DropdownTransporte({ transporte }: Props) {
	const [id, setId] = useState(false);
	const { data, error, execute } = useServerAction(delTransporte);
	const { setModalDialog } = useModalDialogContext();
	const queryClient = useQueryClient();

	function onClose() {
		queryClient.refetchQueries({
			queryKey: QueryKeyFactory.getTransportes(), //retornar a mesma chave de consulta definida em factory
		});
		console.log("onclose");
	}

	async function excluirTransporte(id: number) {
		const [data, err] = await execute({ id: id });

		setModalDialog({
			open: true,
			data: data ? data.message : null,
			error: err
				? { code: err.code, name: err.name, message: err.message }
				: undefined,
			onClose: onClose,
		});
		// console.log(error);
		// console.log(data);
		// setModalResponse({ data: data, err: error });
		// setIsModalOpen(true);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						"inline-flex h-5 w-5 p-0 hover:bg-gray-200 active:bg-gray-300 ease-linear transition-all",
						"cursor-pointer duration-150 select-none items-center justify-center rounded-md",
					)}
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
					onClick={() => excluirTransporte(transporte.id || 0)}
					className="hover:bg-gray-300 cursor-pointer rounded gap-2"
				>
					<RiDeleteBin6Line className="text-red-600" />
					Excluir
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
