"use client";
import { useState, type ReactNode } from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { CteComplementar } from "@/utils/types";

interface TransporteListItemComplementoProps {
	children: ReactNode;
	complemento?: CteComplementar;
}
export function ComplementoItem({
	children,
	complemento,
}: TransporteListItemComplementoProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{complemento && (
				<Collapsible
					open={isOpen}
					onOpenChange={setIsOpen}
					className="space-y-2 pt-3"
				>
					<CollapsibleTrigger asChild>
						<button
							className="py-1 px-2 rounded-md bg-fuchsia-800 hover:bg-fuchsia-700 text-[9px] 
	shadow-md shadow-slate-900 focus:shadow-lg ease-linear 
	transition-all duration-150 select-none"
						>
							<span className="sr-only">Toggle</span>COMPLEMENTO
						</button>
					</CollapsibleTrigger>
					<CollapsibleContent>
						<div className="flex gap-2 text-sm text-cyan-500">{children}</div>
					</CollapsibleContent>
				</Collapsible>
			)}
		</>
	);
}
