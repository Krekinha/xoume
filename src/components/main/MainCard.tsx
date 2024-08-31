import { cn } from "@/lib/utils";
import Link from "next/link";
import type React from "react";
import type { ElementType, ReactNode } from "react";

/**
 * Componente card personalizado para exibir os módulos da aplicação.
 * Criado usando o método pattern de composição
 * @author Krekinha
 */

export const MainCard = {
	Root: MainCardRoot,
	Header: MainCardHeader,
	Icon: MainCardIcon,
	Titulo: MainCardTitulo,
	Conteudo: MainCardConteudo,
};

interface MainCardRootProps extends React.HtmlHTMLAttributes<"div"> {
	link?: string;
	children: ReactNode;
}
export function MainCardRoot({
	link = "/",
	children,
	className,
}: MainCardRootProps) {
	return (
		<div className="max-w-[15rem] min-w-[15rem]">
			<Link href={link} className="dark:text-gray-400 text-gray-900 mb-4">
				<div
					className={cn(
						"flex-col min-h-[10rem] p-6 rounded-lg shadow-lg shadow-black bg-gray-400 dark:bg-slate-900",
						className,
					)}
				>
					{children}
				</div>
			</Link>
		</div>
	);
}

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
