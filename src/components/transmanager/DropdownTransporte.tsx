"use client";
import { AiFillEdit } from "react-icons/ai";
import {
	MoreHorizontal,
	CopyPlus,
	FilePlus,
	Trash2,
	FunctionSquare,
} from "lucide-react";
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
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { delComplemento } from "@/server/ComplementoActions";
import { Button } from "../ui/button";
import { TransporteAutomacoes } from "./TransporteAutomacoes";

interface Props {
	transporte: Transporte;
}

export function DropdownTransporte({ transporte }: Props) {
	const { execute: execTransporte } = useServerAction(delTransporte);
	const { execute: execComplemento } = useServerAction(delComplemento);
	const { setModalDialog } = useModalDialogContext();
	const queryClient = useQueryClient();
	const router = useRouter();
	const [showDropdownMenu, setShowDropdownMenu] = useState(false);

	function onClose() {
		queryClient.refetchQueries({
			queryKey: QueryKeyFactory.getTransportes(), //retornar a mesma chave de consulta definida em factory
		});
	}

	async function excluirTransporte(id: number) {
		const [data, err] = await execTransporte({ id: id });

		setModalDialog({
			open: true,
			data: data ? data.message : null,
			error: err
				? { code: err.code, name: err.name, message: err.message }
				: undefined,
			onClose: onClose,
		});
	}

	async function excluirComplemento(id: number) {
		const [data, err] = await execComplemento({ id: id });

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
							{`Tem certeza que deseja deletar o transporte CTe "${transporte.cte}"? 
							${transporte.cteComplementar ? `O complemento CTe "${transporte.cteComplementar.cte}" vinculado também será deletado.` : ""}`}
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
									className={`w-4 h-4 text-green-600 ${
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
								disabled={!transporte.cteComplementar}
								onClick={() => {}}
								className="cursor-pointer rounded gap-2"
							>
								<AiFillEdit
									className={`w-4 h-4 text-blue-600 ${
										!transporte.cteComplementar ? "opacity-40" : ""
									}`}
								/>
								<span
									className={!transporte.cteComplementar ? "opacity-40" : ""}
								>
									Editar
								</span>
							</DropdownMenuItem>
							<AlertDialog
								onOpenChange={(change) => setShowDropdownMenu(change)}
							>
								<AlertDialogTrigger asChild>
									<DropdownMenuItem
										disabled={!transporte.cteComplementar}
										className="hover:bg-gray-300 cursor-pointer rounded gap-2"
										onSelect={(e) => e.preventDefault()}
									>
										<Trash2
											className={`w-4 h-4 text-red-600 ${
												!transporte.cteComplementar ? "opacity-50" : ""
											}`}
										/>
										<span
											className={
												!transporte.cteComplementar ? "opacity-40" : ""
											}
										>
											Deletar
										</span>
									</DropdownMenuItem>
								</AlertDialogTrigger>
								<AlertDialogContent className="bg-zinc-950 border border-zinc-900">
									<AlertDialogTitle />
									<AlertDialogDescription>
										{`Tem certeza que deseja deletar o complemento CTe "${transporte.cteComplementar?.cte}"? `}
									</AlertDialogDescription>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancelar</AlertDialogCancel>
										<AlertDialogAction
											onClick={() =>
												excluirComplemento(transporte.cteComplementar?.id ?? 0)
											}
										>
											Continuar
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
				<DropdownMenuSeparator className="bg-gray-300" />
				{/* Automações */}
				<Dialog onOpenChange={(change) => setShowDropdownMenu(change)}>
					<DialogTrigger asChild>
						<DropdownMenuItem
							className=" cursor-pointer rounded gap-2"
							onSelect={(e) => e.preventDefault()}
						>
							<FunctionSquare className="text-violet-500 w-4 h-4" />
							<span>Automações</span>
						</DropdownMenuItem>
					</DialogTrigger>
					<DialogContent className="bg-zinc-950 border border-zinc-900">
						<DialogTitle>Automações</DialogTitle>
						<DialogDescription />
						<TransporteAutomacoes transporte={transporte} />
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Fechar</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
