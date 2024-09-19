import type React from "react";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface AlertDropdownMenuItemProps
	extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	onOpenChange: (open: boolean) => void;
	title: string;
	message: string;
	onAction: () => void;
}

export function AlertDropdownMenuItem({
	children,
	onOpenChange,
	title,
	message,
	onAction,
	className,
}: AlertDropdownMenuItemProps) {
	return (
		<AlertDialog onOpenChange={onOpenChange}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent
				className={cn("bg-zinc-950 border border-zinc-900", className)}
			>
				<AlertDialogTitle>{title}</AlertDialogTitle>
				<AlertDialogDescription>{message}</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={onAction}>Continuar</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
