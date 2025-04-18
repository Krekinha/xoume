import type React from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import CopyToClipboard from "../main/CopyToClipboard";

/**
 * Item da lista de transportes/viagens cadastradas.
 * Criado usando o método pattern de composição
 * @author Krekinha
 */

export const TextToClipboard = {
	Root: TextToClipboardRoot,
	Label: TextToClipboardLabel,
	ValueContainer: TextToClipboardValueContainer,
	Value: TextToClipboardValue,
	CopyButton: TextToClipboardCopyButton,
};

/**
 *  ROOT (CONTAINER)
 */
interface TextToClipboardRootProps extends React.HtmlHTMLAttributes<"div"> {
	children: ReactNode;
}
export function TextToClipboardRoot({
	children,
	className,
}: TextToClipboardRootProps) {
	return <div className={cn("grid w-full gap-1.5", className)}>{children}</div>;
}

/**
 *  LABEL
 */
interface TextToClipboardLabelProps
	extends React.HtmlHTMLAttributes<HTMLSpanElement> {
	label: string;
	icon?: ReactNode;
}
export function TextToClipboardLabel({
	label,
	className,
	icon,
}: TextToClipboardLabelProps) {
	return (
		<Label className={cn(icon ? "flex items-center gap-2" : "", className)}>
			{icon && icon}
			{label}
		</Label>
	);
}

/**
 *  VALUE CONTAINER
 */
interface TextToClipboardValueContainerProps
	extends React.HtmlHTMLAttributes<"div"> {
	children: ReactNode;
}
export function TextToClipboardValueContainer({
	children,
	className,
}: TextToClipboardValueContainerProps) {
	return (
		<div
			className={cn(
				"flex w-full border dark:border-zinc-800 justify-between",
				"rounded-md p-2 px-2 py-2 shadow-sm",
				className,
			)}
		>
			{children}
		</div>
	);
}

/**
 *  VALUE
 */
interface TextToClipboardValueProps
	extends React.HtmlHTMLAttributes<HTMLSpanElement> {
	value?: string;
}
export function TextToClipboardValue({
	value,
	className,
}: TextToClipboardValueProps) {
	return (
		<span className={cn("text-xs text-amber-500", className)}>{value}</span>
	);
}

/**
 *  COPY BUTTON
 */
interface TextToClipboardCopyButtonProps
	extends React.HtmlHTMLAttributes<"div"> {
	textToCopy: any;
}
export function TextToClipboardCopyButton({
	textToCopy,
	className,
}: TextToClipboardCopyButtonProps) {
	return (
		<div
			className={cn("self-end", className)}
			title="Copiar para área de transferência"
		>
			<CopyToClipboard textToCopy={textToCopy} />
		</div>
	);
}
