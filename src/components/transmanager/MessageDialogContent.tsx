import type React from "react";
import {
	MdCheckCircleOutline,
	MdOutlineErrorOutline,
	MdOutlineInfo,
} from "react-icons/md";

/**
 * Componente card personalizado para exibir os módulos da aplicação.
 * @author Krekinha
 */

/**
 * ErrorDialogContent
 */

interface ErrorDialogContentProps {
	title?: string;
	message: string;
}

const ErrorDialogContent: React.FC<ErrorDialogContentProps> = ({
	title,
	message,
}: ErrorDialogContentProps) => {
	return (
		<div className="flex flex-col w-full space-y-5 items-center overflow-y-auto max-h-[250px] rounded-md">
			<div className="flex items-center gap-4 fixed top-3 left-3">
				<div className="flex items-start">
					<MdOutlineErrorOutline className="flex-none h-10 w-10 text-red-600" />
				</div>
				<span>{title ? title : "Erro"}</span>
			</div>
			<div className="flex flex-col w-full items-center rounded-md px-2 py-1 ">
				<span className="h-full whitespace-pre-line content-center overflow-hidden overflow-y-auto">
					{message}
				</span>
			</div>
		</div>
	);
};

/**
 * SuccessDialogContent
 */

interface SuccessDialogContentProps {
	title?: string;
	message: string;
}

const SuccessDialogContent: React.FC<SuccessDialogContentProps> = ({
	title,
	message,
}: SuccessDialogContentProps) => {
	return (
		<div className="flex flex-col w-full space-y-5 items-center">
			<div className="flex items-center gap-4 fixed top-3 left-3">
				<div className="flex items-start">
					<MdCheckCircleOutline className="flex-none h-10 w-10 text-green-600" />
				</div>
				<span className="text-lg">{title ? title : "Sucesso"}</span>
			</div>
			<div className="flex flex-col w-full items-center rounded-md px-2 py-1 ">
				<span className="h-full whitespace-pre-line content-center overflow-hidden overflow-y-auto">
					{message}
				</span>
			</div>
		</div>
	);
};

/**
 * InfoDialogContent
 */

interface InfoDialogContentProps {
	title?: string;
	message: string;
}

const InfoDialogContent: React.FC<InfoDialogContentProps> = ({
	title,
	message,
}: InfoDialogContentProps) => {
	return (
		<div className="flex flex-col w-full space-y-5 items-center overflow-y-auto overflow-scroll max-h-[250px]">
			<div className="flex items-center gap-4 fixed top-3 left-3">
				<div className="flex items-start">
					<MdOutlineInfo className="flex-none h-10 w-10 text-blue-600" />
				</div>
				<span className="text-lg">{title ? title : "Informação"}</span>
			</div>
			<div className="flex flex-col w-full items-center rounded-md px-2 py-1 ">
				<span className="h-full whitespace-pre-line content-center overflow-hidden overflow-y-auto">
					{message}
				</span>
			</div>
		</div>
	);
};

export { ErrorDialogContent, SuccessDialogContent, InfoDialogContent };
