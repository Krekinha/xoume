"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

/**
 * Retorna o nome do módulo atual com base no endereço (pathname)
 * @author Krekinha
 * @version 1.0
 */
export default function MainModulo() {
	const pathname = usePathname();

	function modulo() {
		if (pathname.startsWith("/transmanager")) {
			return "TRANSMANAGER";
		}
		return null;
	}

	return (
		<span
			className={cn(
				"inline-block align-bottom leading-none text-sm/none",
				"text-violet-300 font-semibold uppercase",
				"drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] shadow-slate-500 ",
			)}
		>
			{modulo()}
		</span>
	);
}
