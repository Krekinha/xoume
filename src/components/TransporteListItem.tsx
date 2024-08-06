import { DropdownTransporte } from "@/app/(menu)/transmanager/transportes/DropdownTransporte";
import { cn } from "@/lib/utils";
import type { Transporte } from "@/utils/types";
import type React from "react";
import type { ElementType, ReactNode } from "react";
import { FaTruck, FaUser } from "react-icons/fa6";
import { Separator } from "./ui/separator";
import { MdFactory } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { RiWeightFill } from "react-icons/ri";
import { PiInvoiceBold } from "react-icons/pi";
import type { Decimal } from "@prisma/client/runtime/library";

/**
 * Item da lista de transportes/viagens cadastradas.
 * Criado usando o método pattern de composição
 * @author Krekinha
 */

export const TransporteListItem = {
	Root: TransporteListItemRoot,
	Header: TransporteListItemHeader,
	Empresa: TransporteListItemEmpresa,
	Menu: TransporteListItemMenu,
	Content: TransporteListItemContent,
	Motorista: TransporteListItemMotorista,
	Origem: TransporteListItemOrigem,
	Destino: TransporteListItemDestino,
	Footer: TransporteListItemFooter,
	Tomador: TransporteListItemTomador,
	Notas: TransporteListItemNotas,
	Cte: TransporteListItemCte,
	Peso: TransporteListItemPeso,
	ValTonelada: TransporteListItemValTonelada,
};

interface TransporteListItemRootProps extends React.HtmlHTMLAttributes<"div"> {
	children: ReactNode;
}
export function TransporteListItemRoot({
	children,
	className,
}: TransporteListItemRootProps) {
	return (
		<div className="grid grid-flow-row auto-rows-max w-full rounded-lg border border-gray-200 bg-violet-50/30 dark:bg-zinc-800 p-1.5 shadow-sm-light shadow-gray-100">
			{children}
		</div>
	);
}

/**
 *  HEADER
 */
interface TransporteListItemHeaderProps {
	children: ReactNode;
}
export function TransporteListItemHeader({
	children,
}: TransporteListItemHeaderProps) {
	return <div className="grid grid-flow-col items-center">{children}</div>;
}

/**
 *  HEADER: EMPRESA = ICON | EMPRESA
 */
interface TransporteListItemEmpresaProps {
	icon?: ElementType;
	empresa?: string;
}
export function TransporteListItemEmpresa({
	icon: Icon = FaTruck,
	empresa,
}: TransporteListItemEmpresaProps) {
	return (
		<div className="flex gap-2 items-center">
			<Icon className="text-blue-700" />
			<div className="text-[0.650rem] font-semibold">{empresa}</div>
		</div>
	);
}

/**
 *  HEADER: MENU
 */
interface TransporteListItemMenuProps {
	transporte: Transporte;
}
export function TransporteListItemMenu({
	transporte,
}: TransporteListItemMenuProps) {
	return (
		<div className="justify-self-end">
			<DropdownTransporte transporte={transporte} />
		</div>
	);
}

/**
 *  CONTENT
 */
interface TransporteListItemContentProps {
	children: ReactNode;
}
export function TransporteListItemContent({
	children,
}: TransporteListItemContentProps) {
	return <div className="flex items-center gap-1">{children}</div>;
}

/**
 *  CONTENT: ICON | MOTORISTA
 */
interface TransporteListItemMotoristaProps {
	icon?: ElementType;
	motorista?: string;
}
export function TransporteListItemMotorista({
	icon: Icon = FaUser,
	motorista,
}: TransporteListItemMotoristaProps) {
	return (
		<>
			{motorista && (
				<>
					<Icon className="text-gray-700 w-3 h-3" />
					<div className=" text-xs truncate text-gray-700/80">{motorista}</div>
				</>
			)}
		</>
	);
}

/**
 *  CONTENT: ORIGEM (CIDADE-UF)
 */
interface TransporteListItemOrigemProps {
	cidadeOrigem?: string;
	ufOrigem?: string;
}
export function TransporteListItemOrigem({
	cidadeOrigem,
	ufOrigem,
}: TransporteListItemOrigemProps) {
	return (
		<>
			{cidadeOrigem && (
				<>
					<Separator orientation="vertical" className="bg-gray-200 mx-1" />
					<div className="text-xs truncate text-gray-700/80">
						{cidadeOrigem}-{ufOrigem}
					</div>
				</>
			)}
		</>
	);
}

/**
 *  CONTENT: DESTINO (CIDADE-UF)
 */
interface TransporteListItemDestinoProps {
	cidadeDestino?: string;
	ufDestino?: string;
}
export function TransporteListItemDestino({
	cidadeDestino,
	ufDestino,
}: TransporteListItemDestinoProps) {
	return (
		<>
			{cidadeDestino && (
				<>
					<div className="text-xs text-gray-700/80">x</div>
					<div className="text-xs truncate text-gray-700/80">
						{cidadeDestino}-{ufDestino}
					</div>
				</>
			)}
		</>
	);
}

/**
 *  FOOTER
 */
interface TransporteListItemFooterProps {
	children: ReactNode;
}
export function TransporteListItemFooter({
	children,
}: TransporteListItemFooterProps) {
	return (
		<div className="flex flex-row gap-2.5 items-center mt-3 text-[0.65rem]">
			{children}
		</div>
	);
}

/**
 *  FOOTER: ICON | TOMADOR
 */
interface TransporteListItemTomadorProps {
	icon?: ElementType;
	tomador?: string;
}
export function TransporteListItemTomador({
	icon: Icon = MdFactory,
	tomador,
}: TransporteListItemTomadorProps) {
	return (
		<>
			{tomador && (
				<div className="flex items-center gap-1">
					<Icon className="text-gray-700 w-3 h-3" />
					<div className="font-medium text-gray-500">{tomador}</div>
				</div>
			)}
		</>
	);
}

/**
 *  FOOTER: ICON | NOTAS
 */
interface TransporteListItemNotasProps {
	icon?: ElementType;
	notas?: number[];
}
export function TransporteListItemNotas({
	icon: Icon = FaFileAlt,
	notas,
}: TransporteListItemNotasProps) {
	return (
		<>
			{notas && (
				<div className="flex items-center gap-1">
					<Icon className="text-gray-700 w-3 h-3" />
					<div className="font-medium text-gray-500">
						{notas.map((nota, index) => (
							<span key={nota}>
								{nota}
								{index < notas.length - 1 ? "/" : ""}
							</span>
						))}
					</div>
				</div>
			)}
		</>
	);
}

/**
 *  FOOTER: ICON | CTE
 */
interface TransporteListItemCteProps {
	icon?: ElementType;
	cte?: number;
}
export function TransporteListItemCte({
	icon: Icon = FaFileAlt,
	cte,
}: TransporteListItemCteProps) {
	return (
		<>
			{cte && (
				<div title={"CT-e "} className="flex items-center gap-1 ">
					<div className="text-gray-700 w-4 h-3 text-[0.55rem] text-center font-extrabold">
						CTe
					</div>
					<div className="font-medium text-gray-500">{cte}</div>
				</div>
			)}
		</>
	);
}

/**
 *  FOOTER: ICON | PESO
 */
interface TransporteListItemPesoProps {
	icon?: ElementType;
	peso?: Decimal;
}
export function TransporteListItemPeso({
	icon: Icon = RiWeightFill,
	peso,
}: TransporteListItemPesoProps) {
	return (
		<>
			{peso && (
				<div title="Peso" className="flex items-center gap-1">
					<Icon className="text-gray-700 w-3 h-3" />
					<div className="font-medium text-gray-500">{peso.toString()}</div>
				</div>
			)}
		</>
	);
}

/**
 *  FOOTER: ICON | VALOR/TONELADA
 */
interface TransporteListItemValToneladaProps {
	icon?: ElementType;
	valTonelada?: Decimal;
}
export function TransporteListItemValTonelada({
	icon: Icon = PiInvoiceBold,
	valTonelada,
}: TransporteListItemValToneladaProps) {
	return (
		<>
			{valTonelada && (
				<div title="Valor/tonelada" className="flex items-center gap-1">
					<Icon className="text-gray-700 w-3 h-3" />
					<div className="font-medium text-gray-500">
						{valTonelada.toString()}
					</div>
				</div>
			)}
		</>
	);
}
