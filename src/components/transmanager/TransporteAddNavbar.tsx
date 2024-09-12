"use client";

import { cn } from "@/lib/utils";
import Media from "@/components/main/Media";
import { FileUp } from "lucide-react";

export default function TransporteAddNavbar() {
	return (
		<nav className="p-4 w-full py-2 h-min shadow-sm bg-white dark:bg-zinc-900 flex flex-row items-center gap-3">
			<button
				title="Importar dados"
				onClick={() => {}}
				className={cn(
					"shadow-md hover:shadow-lg focus:shadow-lg ease-linear transition-all",
					"rounded-md dark:bg-zinc-950 border dark:border-zinc-800 py-1 px-2 cursor-pointer duration-150 select-none",
				)}
			>
				<FileUp className="h-4 w-4 dark:text-amber-500 dark:hover:text-amber-400" />
			</button>

			<span className="ml-2 text-sm dark:text-green-300">
				<Media />
			</span>
		</nav>
	);
}
