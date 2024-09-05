"use client";

import { cn } from "@/lib/utils";
import { transmanagerSideMenu } from "@/utils/sidemenu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainSidebar() {
	const pathname = usePathname();

	if (pathname === "/") return;

	return (
		<div
			data-open="true"
			data-hover="false"
			aria-hidden="false"
			className={cn(
				"z-40 transition-transform max-md:absolute border-r border-violet-400 dark:border-gray-700",
				"bg-violet-300 dark:bg-transparent",
				// "max-md:animate-slideClose",
			)}
		>
			<aside
				data-open="false"
				className={cn(
					"flex w-full flex-col text-[15px] max-md:fixed",
					"max-md:inset-0 max-md:z-40 max-md:pt-16 max-md:data-[open=false]:hidden",
					"md:sticky md:top-0 md:w-[240px] md:text-sm xl:w-[260px] pt-4",
					"md:animate-slideOpen",
				)}
			>
				<MenuSidebar />
			</aside>
		</div>
	);
}

export function MenuSidebar() {
	const pathname = usePathname();

	function sidemenu() {
		if (pathname.startsWith("/transmanager")) {
			return transmanagerSideMenu;
		}

		if (pathname.startsWith("/teste")) {
			return transmanagerSideMenu;
		}
		return null;
	}

	return (
		<div className="h-full px-3 w-full pb-4 overflow-y-auto overflow-x-hidden">
			{sidemenu()?.menu?.map((menu) => (
				<ul key={menu.link} className="space-y-2 font-medium">
					<li>
						<Link href={menu.link}>
							<div
								className={`${
									pathname === menu.link
										? "flex items-center p-2 text-gray-900 rounded-lg border border-violet-400 dark:border-gray-800 cursor-default group"
										: "flex items-center p-2 text-gray-900 rounded-lg hover:bg-violet-400 dark:hover:bg-gray-800 group"
								} flex items-center py-2 px-4 rounded-lg mb-2`}
							>
								<div className="border rounded-lg border-violet-400 dark:border-gray-700 p-1 shadow-sm">
									{menu.icon}
								</div>

								{/* <span className="flex-1 ms-3 whitespace-nowrap text-gray-400"> */}
								<span
									className={`${
										pathname === menu.link
											? "flex-1 ms-3 whitespace-nowrap text-blue-700 dark:text-amber-600"
											: "flex-1 ms-3 whitespace-nowrap text-gray-600 dark:text-gray-400"
									}`}
								>
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
	);
}
