"use client";
import { AiFillEdit } from "react-icons/ai";
import {
	MoreHorizontal,
	CopyPlus,
	FilePlus,
	Trash2,
	FunctionSquare,
	TestTube,
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
import { useMainDialogContext } from "@/providers/MainDialogProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { delComplemento } from "@/server/ComplementoActions";
import { TransporteAutomacoes } from "./TransporteAutomacoes";
import DialogItem from "./DialogItem";
import { AlertDropdownMenuItem } from "../main/AlertDropdownMenuItem";
import {
	ErrorDialogContent,
	SuccessDialogContent,
} from "./MessageDialogContent";

interface Props {
	transporte: Transporte;
}

const element = <div className="bg-red-500 w-full">teste</div>;

export function DropdownTransporte({ transporte }: Props) {
	const { execute: execTransporte } = useServerAction(delTransporte);
	const { execute: execComplemento } = useServerAction(delComplemento);

	const { setMainDialog } = useMainDialogContext();
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

		if (err) {
			setMainDialog({
				open: true,
				content: (
					<ErrorDialogContent
						title={`${err.code}: (${err.name})`}
						message={err.message}
					/>
				),
			});
		} else {
			setMainDialog({
				open: true,
				content: <SuccessDialogContent message={data.message} />,
				onClose: () => onClose(),
			});
		}
	}

	async function excluirComplemento(id: number) {
		const [data, err] = await execComplemento({ id: id });

		if (err) {
			setMainDialog({
				open: true,
				content: (
					<ErrorDialogContent
						title={`${err.code}: (${err.name})`}
						message={err.message}
					/>
				),
			});
		} else {
			setMainDialog({
				open: true,
				content: <SuccessDialogContent message={data.message} />,
				onClose: () => onClose(),
			});
		}
	}

	return (
		<DropdownMenu
			open={showDropdownMenu}
			onOpenChange={(change) => setShowDropdownMenu(change)}
			modal={false}
		>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						"inline-flex border-0 h-5 w-5 p-1 hover:bg-gray-600 active:bg-transparent ease-linear transition-all",
						"cursor-pointer duration-150 items-center justify-center rounded-md",
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
				{/* <DropdownMenuItem
					onClick={handleDialogItemSelect}
					className="cursor-pointer rounded gap-2"
				>
					<TestTube className="w-4 h-4 text-pink-600" />
					<span>Teste</span>
				</DropdownMenuItem> */}
				<DropdownMenuItem
					onClick={() => {}}
					className="hover:bg-gray-300 cursor-pointer rounded gap-2"
				>
					<AiFillEdit className="text-blue-600 w-4 h-4" />
					Editar
				</DropdownMenuItem>
				<AlertDropdownMenuItem
					onOpenChange={(change) => setShowDropdownMenu(change)}
					title="Aviso"
					message={`Você esta prestes a deletar o transporte CTe "${transporte.cte}". 
						${transporte.cteComplementar ? `O CT-e complementar "${transporte.cteComplementar.cte}" vinculado também será deletado.` : ""}
						Deseja continuar?`}
					onAction={() => excluirTransporte(transporte.id ?? 0)}
				>
					<DropdownMenuItem
						className="hover:bg-gray-300 cursor-pointer rounded gap-2"
						onSelect={(e) => e.preventDefault()}
					>
						<Trash2 className="text-red-600 w-4 h-4" />
						<span>Deletar</span>
					</DropdownMenuItem>
				</AlertDropdownMenuItem>
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
							<AlertDropdownMenuItem
								onOpenChange={(change) => setShowDropdownMenu(change)}
								title="Aviso"
								message={`Você esta prestes a deletar o complemento CTe "${transporte.cteComplementar?.cte}". 
									Deseja continuar?`}
								onAction={() =>
									excluirComplemento(transporte.cteComplementar?.id ?? 0)
								}
							>
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
										className={!transporte.cteComplementar ? "opacity-40" : ""}
									>
										Deletar
									</span>
								</DropdownMenuItem>
							</AlertDropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
				<DropdownMenuSeparator className="bg-gray-300" />
				{/* Automações */}
				<DropdownMenuItem
					className=" cursor-pointer rounded gap-2"
					onClick={() => {
						setMainDialog({
							open: true,
							content: <TransporteAutomacoes transporte={transporte} />,
						});
					}}
				>
					<FunctionSquare className="text-violet-500 w-4 h-4" />

					<span>Automações</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
