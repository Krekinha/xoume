import { cn } from "@/lib/utils";
import type { ErrorResponse } from "@/utils/types";
import type React from "react";
import { useEffect, useRef, useState, type ElementType } from "react";
import {
	MdCheckCircleOutline,
	MdOutlineErrorOutline,
	MdOutlineInfo,
} from "react-icons/md";
import { Button } from "@/components/ui/button";

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

/**
 * Componente card personalizado para exibir os módulos da aplicação.
 * Criado usando o método pattern de composição
 * @author Krekinha
 */

export interface ModalDialogProps {
	err?: ErrorResponse;
	data?: unknown;
	onClose?: () => void;
	isOpen: boolean;
}
const ModalDialog: React.FC<ModalDialogProps> = ({
	err,
	data,
	onClose,
	isOpen,
	//className,
	//...props
}) => {
	console.log(data);
	const icon = () => {
		if (data) {
			return (
				<MdCheckCircleOutline className="flex-none h-10 w-10 text-green-600" />
			);
		}

		if (err) {
			return (
				<MdOutlineErrorOutline className="flex-none h-10 w-10 text-red-600" />
			);
		}

		return <MdOutlineInfo className="flex-none h-10 w-10 text-blue-600" />;
	};

	const message = () => {
		if (err) {
			return err.message;
		}

		if (data) {
			return data as string;
		}

		return "?";
	};

	const title = () => {
		if (err) {
			return err.message;
		}

		if (data) {
			return "Sucesso";
		}

		return "?";
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogTrigger>Open</DialogTrigger>
			<DialogContent className="bg-zinc-950 border border-zinc-900">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-4">
						<div className="flex items-start">{icon()}</div>
						<span>{title()}</span>
					</DialogTitle>
					<DialogDescription />
				</DialogHeader>
				<div className="flex flex-col w-full items-center rounded-md px-2 py-1 ">
					<span className="h-full whitespace-pre-line content-center overflow-hidden overflow-y-auto">
						{message()}
					</span>
				</div>

				<DialogFooter className="sm:justify-center">
					<DialogClose asChild>
						<Button
							type="button"
							className=" dark:bg-green-600 dark:text-white"
						>
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>

		// <dialog
		// 	//{...props}
		// 	id="modalDialog"
		// 	ref={modalRef}
		// 	onKeyDown={handleKeyDown}
		// 	className={cn(
		// 		"flex max-h-14 min-h-[10rem] min-w-[20rem] max-w-[20rem] flex-col",
		// 		" gap-1 rounded-md bg-slate-900 p-2 shadow-md shadow-black",
		// 		"z-20",
		// 		//className,
		// 	)}
		// >
		// 	<div className="flex h-0 flex-grow gap-2">
		// 		<div className="flex items-center">{icon()}</div>
		// 		<div className="flex flex-col w-full items-center rounded-md px-2 py-1 ">
		// 			<span className="h-full whitespace-pre-line content-center overflow-hidden overflow-y-auto">
		// 				{message()}
		// 			</span>
		// 			<div className="flex justify-center mr-8">
		// 				<Button
		// 					onClick={handleCloseModal}
		// 					className="px-4 py-0 h-6 bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 dark:text-white shadow-sm dark:shadow-black"
		// 				>
		// 					ok
		// 				</Button>
		// 			</div>
		// 		</div>
		// 	</div>
		// </dialog>
	);
};

export default ModalDialog;

interface MainCardIconProps {
	icon?: ElementType;
}
export function MainCardIcon({ icon: Icon }: MainCardIconProps) {
	return Icon && <Icon className="w-[25px] h-[25px]" />;
}
