import { DropdownTransporte } from "@/components/transmanager/DropdownTransporte";
import type { Transporte } from "@/utils/types";
import type React from "react";
import type { ElementType, ReactNode } from "react";
import { FaTruck, FaUser } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa";
import { ComplementoItem } from "./ComplementoItem";
import { formatCurrency } from "@/utils/format";
import { cn } from "@/lib/utils";

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
	ValCteComplementar: TransporteListItemValCteComplementar,

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
		<div className="flex flex-row items-center justify-between gap-2">
			{children}
		</div>
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
			<Icon className="text-blue-500 flex-shrink-0" />
			<div className="text-xs line-clamp-2 font-medium">{empresa}</div>
		</div>
	);
}

/**
 *  HEADER-START: CTe = (CTE | VALOR CTe)
 */
interface TransporteListItemCTeProps
	extends React.HtmlHTMLAttributes<HTMLSpanElement> {
	cte?: string;
}
export function TransporteListItemCTe({
	cte,
	className,
}: TransporteListItemCTeProps) {
	return (
		<>
			{cte && (
				<>
					<div className="flex gap-1 items-center ">
						<span
							className={cn(
								"border-t border-b border-amber-500",
								"h-4 w-4 text-amber-500 text-[0.55rem]",
								"text-center",
							)}
						>
							CTe
						</span>
						<span
							className={cn(
								"text-xs font-semibold dark:text-blue-500",
								className,
							)}
						>
							{cte}
						</span>
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
	if (transporte.cteComplementar) {
		val_frete =
			(Number(transporte.cteComplementar.peso) / 1000) *
			Number(transporte.val_tonelada);
	} else {
		if (transporte.peso && transporte.val_tonelada) {
			val_frete =
				(Number(transporte.peso) / 1000) *
				Number(transporte.val_tonelada);
		}
	}

	return (
		<div className="flex gap-1 items-center ">
			<div className="text-sm font-semibold dark:text-amber-400">
				{formatCurrency(transporte.val_cte?.toString())}
			</div>
			{val_frete > 0 && (
				<>
					<span className="text-[0.650rem] dark:text-gray-400">
						/
					</span>
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
		<div className="flex flex-col gap-1 dark:text-slate-300">
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
				<div className="flex items-center gap-1">
					<Icon className="text-blue-600 w-3 h-3" />
					<span className="text-[0.7rem]/[1rem] sm:text-xs truncate">
						{motorista}
					</span>
				</div>
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
					<div className="flex truncate items-center">
						<span className="text-[0.7rem]/[1rem] sm:text-xs truncate">
							{cidadeOrigem}
						</span>
						<span>-</span>
						<span className="text-[0.7rem]/[1rem] sm:text-xs">
							{ufOrigem}
						</span>
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
					<div className="flex truncate items-center">
						<span className="text-[0.7rem]/[1rem] mr-1 sm:text-xs text-blue-500">
							x
						</span>
						<span className="text-[0.7rem]/[1rem] sm:text-xs truncate">
							{cidadeDestino}
						</span>
						<span>-</span>
						<span className="text-[0.7rem]/[1rem] sm:text-xs">
							{ufDestino}
						</span>
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
interface TransporteListItemTagProps
	extends React.HtmlHTMLAttributes<HTMLSpanElement> {
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
	className,
	...props
}: TransporteListItemTagProps) {
	return (
		<>
			{tag && (
				<div
					title={title}
					className="grid grid-flow-col items-center gap-1"
				>
					<Icon className="text-amber-600 w-3 h-3" />
					<span {...props} className={cn("font-medium", className)}>
						{tag}
						{other}
					</span>
				</div>
			)}
		</>
	);
}

/**
 *  FOOTER: VALOR COMPLEMENTO
 */
interface TransporteListItemValCteComplementarProps {
	transporte: Transporte;
}
export function TransporteListItemValCteComplementar({
	transporte,
}: TransporteListItemValCteComplementarProps) {
	let val_frete = 0;
	let val_previsto = 0;
	let val_diferenca = 0;
	let val_cte = 0;
	let val_cteComplementar = 0;

	if (transporte.cteComplementar) {
		val_cte = Number((Number(transporte.val_cte) ?? 0).toFixed(2));
		val_cteComplementar = Number(
			(Number(transporte.cteComplementar.val_cte) ?? 0).toFixed(2),
		);

		val_frete = Number(
			(
				(Number(transporte.cteComplementar.peso) / 1000) *
				Number(transporte.val_tonelada)
			).toFixed(2),
		);

		val_previsto = val_frete - val_cte;

		val_diferenca = val_previsto - val_cteComplementar;
	}

	function isDiferent() {
		if (
			val_cteComplementar > val_previsto ||
			val_cteComplementar < val_previsto
		) {
			return true;
		}

		return false;
	}

	function diferenceDescription() {
		if (val_cteComplementar > val_previsto) {
			return `Valor acima do previsto: + (${formatCurrency((val_cteComplementar - val_previsto).toString())})`;
		}
		if (val_cteComplementar < val_previsto) {
			return `Valor abaixo do previsto: - (${formatCurrency((val_previsto - val_cteComplementar).toString())})`;
		}
	}

	return (
		<div className="flex gap-1 items-center ">
			<div className="text-sm font-semibold dark:text-amber-400">
				{formatCurrency(
					transporte.cteComplementar?.val_cte?.toString(),
				)}
			</div>
			{isDiferent() && (
				<>
					<span className="text-[0.650rem] dark:text-gray-400">
						/
					</span>
					<span
						title={diferenceDescription()}
						className="text-[0.650rem] font-semibold dark:text-red-400"
					>
						({formatCurrency(val_previsto.toString())})
					</span>
				</>
			)}
			{val_cteComplementar === val_previsto && (
				<>
					<span className="text-[0.650rem] dark:text-gray-400">
						/
					</span>
					<span className="text-[0.650rem] font-semibold dark:text-green-400">
						({formatCurrency(val_previsto.toString())})
					</span>
				</>
			)}
		</div>
	);
}
