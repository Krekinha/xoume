"use client";
import { useState, type ReactNode } from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { CteComplementar } from "@/utils/types";
import { cn } from "@/lib/utils";

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
					className="space-y-2"
				>
					<CollapsibleTrigger asChild>
						<button
							className={cn(
								"py-1 px-2 rounded-md bg-fuchsia-800 hover:bg-fuchsia-700 text-[9px]",
								"shadow-md shadow-slate-900 focus:shadow-lg ease-linear",
								"transition-all duration-150 select-none",
							)}
						>
							<span className="sr-only">Toggle</span>COMPLEMENTO
						</button>
					</CollapsibleTrigger>
					<CollapsibleContent>
						<div className="flex flex-wrap gap-2 items-center dark:text-slate-300">
							{children}
						</div>
					</CollapsibleContent>
				</Collapsible>
			)}
		</>
	);
}
