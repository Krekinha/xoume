import { cn } from "@/lib/utils";
import { TipoMessage, type Message } from "@/utils/types";
import type React from "react";
import { useEffect, useRef, useState, type ElementType } from "react";
import {
	MdCheckCircleOutline,
	MdError,
	MdOutlineErrorOutline,
	MdOutlineInfo,
} from "react-icons/md";
import { Button } from "./ui/button";

/**
 * Componente card personalizado para exibir os módulos da aplicação.
 * Criado usando o método pattern de composição
 * @author Krekinha
 */

export interface ModalDialogProps {
	//extends React.DialogHTMLAttributes<HTMLDialogElement> {
	message?: Message;
	onClose?: () => void;
	isOpen: boolean;
}
const ModalDialog: React.FC<ModalDialogProps> = ({
	message,
	onClose,
	isOpen,
	//className,
	//...props
}) => {
	const [isModalOpen, setModalOpen] = useState(isOpen);
	const modalRef = useRef<HTMLDialogElement | null>(null);

	const handleCloseModal = () => {
		if (onClose) {
			onClose();
		}
		console.log(isModalOpen);
		setModalOpen(false);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
		if (event.key === "Escape") {
			handleCloseModal();
		}
	};

	useEffect(() => {
		setModalOpen(isOpen);
	}, [isOpen]);

	useEffect(() => {
		const modalElement = modalRef.current;
		console.log(modalElement);

		if (modalElement) {
			if (isModalOpen) {
				modalElement.showModal();
			} else {
				modalElement.close();
			}
		}
	}, [isModalOpen]);

	const icon = () => {
		if (message?.type === TipoMessage.SUCCESS) {
			return (
				<MdCheckCircleOutline className="flex-none h-10 w-10 text-green-600" />
			);
		}

		if (message?.type === TipoMessage.ERROR) {
			return (
				<MdOutlineErrorOutline className="flex-none h-10 w-10 text-red-600" />
			);
		}

		return <MdOutlineInfo className="flex-none h-10 w-10 text-blue-600" />;
	};

	return (
		<dialog
			//{...props}
			id="modalDialog"
			ref={modalRef}
			onKeyDown={handleKeyDown}
			className={cn(
				"flex max-h-14 min-h-[10rem] min-w-[20rem] max-w-[20rem] flex-col",
				" gap-1 rounded-md bg-slate-900 p-2 shadow-md shadow-black",
				"z-20",
				//className,
			)}
		>
			<div className="flex h-0 flex-grow gap-2">
				<div className="flex items-center">{icon()}</div>
				<div className="flex flex-col w-full items-center rounded-md px-2 py-1 ">
					<p className="h-full content-center overflow-hidden overflow-y-auto">
						{message?.text}
					</p>
					<div className="flex justify-center mr-8">
						<Button
							onClick={handleCloseModal}
							className="px-4 py-0 h-6 bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 dark:text-white shadow-sm dark:shadow-black"
						>
							ok
						</Button>
					</div>
				</div>
			</div>
		</dialog>
	);
};

export default ModalDialog;

interface MainCardIconProps {
	icon?: ElementType;
}
export function MainCardIcon({ icon: Icon }: MainCardIconProps) {
	return Icon && <Icon className="w-[25px] h-[25px]" />;
}
