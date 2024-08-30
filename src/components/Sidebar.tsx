"use client";

import { cn } from "@/lib/utils";
import type { Session, Sidemenu } from "@/utils/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

//import { useSidemenuStore } from "@/store/useSidemenuStore";
interface ISidemenu {
	sidemenu?: Sidemenu;
	session?: Session;
}

export default function Sidebar({ sidemenu, session }: ISidemenu) {
	/**
	 * etc
	 * @author Krekinha
	 * @version 1.0
	 */

	const pathname = usePathname();

	return (
		<aside
			className={cn(
				"inline-flex z-40 h-full border-r bg-gray-900 border-gray-700",
				"inset-y-0 sm:w-64 w-0 min-w-0 sm:min-w-64",
				"sm:animate-slideIn animate-slideOut",
			)}
		>
			<div className="h-full px-3 pb-4 overflow-y-auto">
				{sidemenu?.menu?.map((menu) => (
					<ul key={menu.link} className="space-y-2 font-medium">
						<li>
							<Link href={menu.link}>
								<div
									className={`${
										pathname === menu.link
											? "flex items-center p-2 text-gray-900 rounded-lg hover:bg-violet-500/15 group bg-violet-500/15"
											: "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-800 group"
									} flex items-center py-2 px-4 rounded-lg mb-2`}
								>
									<div className="border rounded-lg border-gray-700 p-1 shadow-sm">
										{menu.icon}
									</div>

									<span className="flex-1 ms-3 whitespace-nowrap text-gray-400">
										{menu.label}
									</span>
									{menu.notificacao && (
										<span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
											{menu.notificacao}
										</span>
									)}
								</div>
							</Link>
						</li>
					</ul>
				))}
			</div>
		</aside>
	);
}
