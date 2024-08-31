"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function MainLogo() {
	const pathname = usePathname();

	function modulo() {
		if (pathname.startsWith("/transmanager")) {
			return "TRANSMANAGER";
		}
		return null;
	}
	return (
		<div className="flex items-end gap-2">
			<div>
				<Link href={"/"}>
					<Image
						src="/images/logo-aya.png"
						width={32}
						height={32}
						alt="makit"
						priority
					/>
				</Link>
			</div>

			<span
				className="text-2xl/none font-bold text-violet-800 
                    drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)] 
					hidden sm:flex shadow-slate-300"
			>
				xoume
			</span>
			<span
				className={cn(
					" inline-block align-bottom text-[0.8rem] sm:text-sm/none",
					"font-semibold text-gray-500",
					"drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]",
				)}
			>
				-
			</span>
			<span
				className={cn(
					"inline-block align-bottom text-[0.8rem] leading-none sm:text-sm/none",
					"text-violet-300 font-semibold uppercase",
					"drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] shadow-slate-500 ",
				)}
			>
				{modulo()}
			</span>
		</div>
	);
}
