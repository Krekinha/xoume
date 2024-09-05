import type React from "react";
import type { ElementType } from "react";
import {
	MdCheckCircleOutline,
	MdOutlineErrorOutline,
	MdOutlineInfo,
} from "react-icons/md";
import { Button } from "@/components/ui/button";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useModalDialogContext } from "@/providers/ModaDialogProvider";

/**
 * Componente card personalizado para exibir os módulos da aplicação.
 * Criado usando o método pattern de composição
 * @author Krekinha
 */

const ModalDialog: React.FC = () => {
	const { setModalDialog, modalDialog } = useModalDialogContext();

	const open = modalDialog.open;
	const data = modalDialog.data;
	const error = modalDialog.error;
	const onClose = modalDialog.onClose;

	console.log(error);
	console.log(data);

	const icon = () => {
		if (data) {
			return (
				<MdCheckCircleOutline className="flex-none h-10 w-10 text-green-600" />
			);
		}

		if (error) {
			return (
				<MdOutlineErrorOutline className="flex-none h-10 w-10 text-red-600" />
			);
		}

		return <MdOutlineInfo className="flex-none h-10 w-10 text-blue-600" />;
	};

	const message = () => {
		if (error) {
			return error?.message;
		}

		if (data) {
			return data as string;
		}

		return "?";
	};

	const title = () => {
		if (error) {
			return `${error.code}: (${error.name})`;
		}

		if (data) {
			return "Sucesso";
		}

		return "?";
	};

	return (
		<Dialog open={open}>
			<DialogTrigger />
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
					<Button
						type="button"
						onClick={() => {
							setModalDialog({ open: false });
							onClose ? onClose() : "";
						}}
						className=" dark:bg-green-600 dark:text-white"
					>
						Close
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ModalDialog;

interface MainCardIconProps {
	icon?: ElementType;
}
export function MainCardIcon({ icon: Icon }: MainCardIconProps) {
	return Icon && <Icon className="w-[25px] h-[25px]" />;
}
