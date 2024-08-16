import { cn } from "@/lib/utils";
import { TipoMessage, type Message } from "@/utils/types";
import Link from "next/link";
import type React from "react";
import {
	forwardRef,
	type ElementType,
	type ReactElement,
	type ReactNode,
	type JSX,
	type DialogHTMLAttributes,
} from "react";
import {
	MdCheckCircleOutline,
	MdError,
	MdOutlineErrorOutline,
	MdOutlineInfo,
} from "react-icons/md";

/**
 * Componente card personalizado para exibir os módulos da aplicação.
 * Criado usando o método pattern de composição
 * @author Krekinha
 */

// export const MainCard = {
// 	Root: ModalDialogRoot,
// 	Header: MainCardHeader,
// 	Icon: MainCardIcon,
// 	Titulo: MainCardTitulo,
// 	Conteudo: MainCardConteudo,
// };

export interface ModalDialogProps
	extends React.DialogHTMLAttributes<HTMLDialogElement> {
	title?: string;
	message?: Message;
}
const ModalDialog: React.FC<ModalDialogProps> = ({
	title,
	message,
	className,
	...props
}) => {
	const icon = () => {
		if (message?.type === TipoMessage.SUCCESS) {
			return <MdCheckCircleOutline className="h-6 w-6 text-green-600" />;
		}

		if (message?.type === TipoMessage.ERROR) {
			return <MdOutlineErrorOutline className="h-6 w-6 text-red-600" />;
		}

		return <MdOutlineInfo className="h-6 w-6 text-blue-600" />;
	};

	return (
		<dialog
			{...props}
			id="modalDialog"
			className={cn(
				"min-h-[10rem]",
				"rounded-md shadow-md shadow-black bg-slate-900",
				className,
			)}
		>
			<div
				className={cn(
					"flex-col p-4 ",
					"max-w-[20rem] min-w-[20rem]",
					"dark:text-gray-400 text-gray-900",
				)}
			>
				<div className="flex flex-row items-center gap-2">
					{icon()}
					<p>{title}</p>
				</div>
				{message?.text}
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

interface MainCardTituloProps {
	titulo: string;
}
export function MainCardTitulo({ titulo }: MainCardTituloProps) {
	return (
		<div className="flex ml-1">
			<span className="dark:text-amber-600 text-sm font-medium pt-1">
				{titulo}
			</span>
		</div>
	);
}

interface MainCardConteudoProps {
	conteudo: string;
}
export function MainCardConteudo({ conteudo }: MainCardConteudoProps) {
	return <span className="text-[0.75rem]">{conteudo}</span>;
}

interface MainCardHeaderProps {
	children: ReactNode;
}
export function MainCardHeader({ children }: MainCardHeaderProps) {
	return (
		<>
			<div className="flex gap-2">{children}</div>
			<hr className="mb-2 mt-1 border-slate-800" />
		</>
	);
}
