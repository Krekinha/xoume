"use client";
import { AiFillEdit } from "react-icons/ai";
import { MoreHorizontal, CopyPlus, FilePlus, Trash2 } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Transporte } from "@/utils/types";
import { delTransporte } from "@/server/TransporteActions";
import { cn } from "@/lib/utils";
import { QueryKeyFactory } from "@/hooks/server-action-hooks";
import { useServerAction } from "zsa-react";
import { useModalDialogContext } from "@/providers/ModaDialogProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
	transporte: Transporte;
}

export function DropdownTransporte({ transporte }: Props) {
	const { execute } = useServerAction(delTransporte);
	const { setModalDialog } = useModalDialogContext();
	const queryClient = useQueryClient();
	const router = useRouter();
	const [showDropdownMenu, setShowDropdownMenu] = useState(false);

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
	}

	return (
		<DropdownMenu
			open={showDropdownMenu}
			onOpenChange={(change) => setShowDropdownMenu(change)}
		>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						"inline-flex border-0 h-5 w-5 p-1 hover:bg-gray-600 active:bg-transparent ease-linear transition-all",
						"cursor-pointer duration-150 select-none items-center justify-center rounded-md",
					)}
				>
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4 flex-shrink-0" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="bg-white">
				{/* Transporte */}
				<DropdownMenuLabel className="text-blue-500">
					Transporte
				</DropdownMenuLabel>
				<DropdownMenuSeparator className="bg-gray-300" />
				<DropdownMenuItem
					onClick={() => {}}
					className="hover:bg-gray-300 cursor-pointer rounded gap-2"
				>
					<AiFillEdit className="text-blue-600 w-4 h-4" />
					Editar
				</DropdownMenuItem>
				<AlertDialog onOpenChange={(change) => setShowDropdownMenu(change)}>
					<AlertDialogTrigger asChild>
						<DropdownMenuItem
							className="hover:bg-gray-300 cursor-pointer rounded gap-2"
							onSelect={(e) => e.preventDefault()}
						>
							<Trash2 className="text-red-600 w-4 h-4" />
							<span>Deletar</span>
						</DropdownMenuItem>
					</AlertDialogTrigger>
					<AlertDialogContent className="bg-zinc-950 border border-zinc-900">
						<AlertDialogTitle />
						<AlertDialogDescription>
							Tem certeza que deseja deletar o transporte? O complemento
							vinculado será deletado também.
						</AlertDialogDescription>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancelar</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => excluirTransporte(transporte.id ?? 0)}
							>
								Continuar
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
				<DropdownMenuSeparator className="bg-gray-300" />

				{/* Complemento */}
				<DropdownMenuSub>
					<DropdownMenuSubTrigger className="gap-1">
						<CopyPlus className="text-green-500 w-4 h-4" />
						<span>Complemento</span>
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent>
							<DropdownMenuItem
								disabled={!!transporte.cteComplementar}
								onClick={() =>
									router.push(
										`/transmanager/transportes/complemento/${transporte.id}`,
									)
								}
								className="hover:bg-gray-300 cursor-pointer rounded gap-2 disabled:opacity-50"
							>
								<FilePlus
									className={`w-4 h-4 text-green-600 disabled:text-gray-500 ${
										transporte.cteComplementar ? "opacity-50" : ""
									}`}
								/>
								<span
									className={transporte.cteComplementar ? "opacity-40" : ""}
								>
									Adicionar
								</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {}}
								className="hover:bg-gray-300 cursor-pointer rounded gap-2"
							>
								<AiFillEdit className="text-blue-600 w-4 h-4" />
								Editar
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {}}
								className="hover:bg-gray-300 cursor-pointer rounded gap-2"
							>
								<Trash2 className="text-red-600 w-4 h-4" />
								Deletar
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
