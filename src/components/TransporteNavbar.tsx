"use client";

import { GrAdd } from "react-icons/gr";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function TransporteNavbar() {
	const router = useRouter();
	return (
		<nav className="p-4 w-full py-2 shadow-sm bg-white dark:bg-zinc-900">
			<button
				onClick={() => router.push("/transmanager/transportes/add")}
				className={cn(
					"bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
					"shadow-md hover:shadow-lg focus:shadow-lg ease-linear transition-all",
					"rounded-full p-1 cursor-pointer duration-150 select-none",
				)}
			>
				<GrAdd className="h-4 w-4" />
			</button>

			<span className="ml-2 text-sm dark:text-green-300">Novo transporte</span>
		</nav>
	);
}
