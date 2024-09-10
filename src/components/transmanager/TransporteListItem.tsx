import { DropdownTransporte } from "@/components/transmanager/DropdownTransporte";
import type { Transporte } from "@/utils/types";
import type React from "react";
import type { ElementType, ReactNode } from "react";
import { FaTruck, FaUser } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { ComplementoItem } from "./ComplementoItem";
import { formatCurrency } from "@/utils/format";

/**
 * Item da lista de transportes/viagens cadastradas.
 * Criado usando o método pattern de composição
 * @author Krekinha
 */

export const TransporteListItem = {
	Root: TransporteListItemRoot,
	Header: TransporteListItemHeader,
	HeaderStart: TransporteListItemHeaderStart,
	Empresa: TransporteListItemEmpresa,
	CTe: TransporteListItemCTe,
	HeaderEnd: TransporteListItemHeaderEnd,
	ValCTe: TransporteListItemValCTe,
	Menu: TransporteListItemMenu,
	Content: TransporteListItemContent,
	Motorista: TransporteListItemMotorista,
	Origem: TransporteListItemOrigem,
	Destino: TransporteListItemDestino,
	Complemento: ComplementoItem,
	Footer: TransporteListItemFooter,
	Tag: TransporteListItemTag,
};

interface TransporteListItemRootProps extends React.HtmlHTMLAttributes<"div"> {
	children: ReactNode;
}
export function TransporteListItemRoot({
	children,
	className,
}: TransporteListItemRootProps) {
	return (
		<div className="flex flex-col gap-3 w-full rounded-lg border border-gray-200 bg-violet-50/30 dark:bg-zinc-800 dark:border-gray-700 p-1.5 shadow-sm-light shadow-gray-100">
			{children}
		</div>
	);
}

/**
 *  HEADER ROOT
 */
interface TransporteListItemHeaderProps {
	children: ReactNode;
}
export function TransporteListItemHeader({
	children,
}: TransporteListItemHeaderProps) {
	return (
		<div className="flex flex-row items-center justify-between">{children}</div>
	);
}

/**
 *  HEADER-START-CONTAINER (EMPRESA && CTe)
 */
interface TransporteListItemHeaderStartProps {
	children: ReactNode;
}
export function TransporteListItemHeaderStart({
	children,
}: TransporteListItemHeaderStartProps) {
	return (
		<div className="flex flex-row items-center justify-start gap-2">
			{children}
		</div>
	);
}

/**
 *  HEADER-START: EMPRESA = (ICON | EMPRESA)
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
		<div className="flex gap-2 items-center dark:text-slate-200">
			<Icon className="text-blue-500" />
			<div className="text-[0.650rem] font-semibold">{empresa}</div>
		</div>
	);
}

/**
 *  HEADER-START: CTe = (CTE | VALOR CTe)
 */
interface TransporteListItemCTeProps {
	cte?: string;
}
export function TransporteListItemCTe({ cte }: TransporteListItemCTeProps) {
	return (
		<>
			{cte && (
				<>
					<Separator orientation="vertical" className="bg-gray-500 mx-1" />
					<div className="flex gap-2 items-center ">
						<span className="text-[0.650rem] font-semibold dark:text-slate-200">
							CTe:{" "}
						</span>
						<div className="text-[0.650rem] font-semibold dark:text-blue-500">
							{cte}
						</div>
					</div>
				</>
			)}
		</>
	);
}

/**
 *  HEADER-END (VALOR CTe | MENU)
 */
interface TransporteListItemHeaderEndProps {
	children: ReactNode;
}
export function TransporteListItemHeaderEnd({
	children,
}: TransporteListItemHeaderEndProps) {
	// return <div className="grid grid-flow-col items-center">{children}</div>;
	return (
		<div className="flex flex-row items-center justify-end gap-2">
			{children}
		</div>
	);
}

/**
 *  HEADER-END: VALOR CTe
 */
interface TransporteListItemMenuProps {
	transporte: Transporte;
}
export function TransporteListItemValCTe({
	transporte,
}: TransporteListItemMenuProps) {
	let val_frete = 0;
	if (transporte.peso && transporte.val_tonelada) {
		val_frete =
			(Number(transporte.peso) / 1000) * Number(transporte.val_tonelada);
	}
	return (
		<div className="flex gap-1 items-center ">
			<div className="text-xs font-semibold dark:text-amber-400">
				{formatCurrency(transporte.val_cte?.toString())}
			</div>
			{val_frete > 0 && (
				<>
					<span className="text-[0.650rem] dark:text-gray-400">/</span>
					<span className="text-[0.650rem] font-semibold dark:text-gray-400">
						{formatCurrency(val_frete.toString())}
					</span>
				</>
			)}
		</div>
	);
}

/**
 *  HEADER-END: MENU
 */
interface TransporteListItemMenuProps {
	transporte: Transporte;
}
export function TransporteListItemMenu({
	transporte,
}: TransporteListItemMenuProps) {
	return <DropdownTransporte transporte={transporte} />;
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
	return (
		<div className="flex items-center gap-1 dark:text-slate-300">
			{children}
		</div>
	);
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
					<Icon className="text-blue-600 w-3 h-3" />
					<div className="text-xs truncate">{motorista}</div>
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
					<Separator orientation="vertical" className="bg-gray-500 mx-1" />
					<div className="text-xs truncate">
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
					<div className="text-xs">x</div>
					<div className="text-xs truncate">
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
		<div className="flex flex-wrap gap-2.5 items-center text-[0.65rem] text-slate-400">
			{children}
		</div>
	);
}

/**
 *  FOOTER: TAG (ICON | STRING)
 */
interface TransporteListItemTagProps {
	icon?: ElementType;
	tag?: string;
	title?: string;
	other?: string;
}
export function TransporteListItemTag({
	icon: Icon = FaHashtag,
	tag,
	title,
	other,
}: TransporteListItemTagProps) {
	return (
		<>
			{tag && (
				<div title={title} className="flex items-center gap-1">
					<Icon className="text-amber-600 w-3 h-3" />
					<div className="font-medium">
						{tag}
						{other}
					</div>
				</div>
			)}
		</>
	);
}
