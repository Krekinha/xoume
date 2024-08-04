import Link from "next/link";
import type { ElementType, ReactNode } from "react";
import type { IconType } from "react-icons/lib";

export const MainCard = {
    Root: MainCardRoot,
	Header: MainCardHeader,
	Icon: MainCardIcon,
	Titulo: MainCardTitulo,
	Conteudo: MainCardConteudo,
};

interface MainCardRootProps {
	link?: string;
	children: ReactNode;
}
export function MainCardRoot({ link = "/", children }: MainCardRootProps) {
	return (
		<div className="max-w-[15rem] min-w-[15rem] ">
			<Link href={link} className="dark:text-gray-400 text-gray-900 mb-4">
				<div className="flex-col min-h-[10rem]  p-6 mr-3 rounded-lg shadow-lg shadow-black bg-gray-400 dark:bg-slate-900">
					{/* <div className="flex">
						<MainCardIcon />

						<MainCardTitulo />
					</div>

					<hr className="mb-2 mt-1 border-slate-800" />
					<MainCardDescricao/> */}
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
			<div className="flex">{children}</div>
			<hr className="mb-2 mt-1 border-slate-800" />
		</>
	);
}
