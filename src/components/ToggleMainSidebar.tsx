"use cliente";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sidebar";
import { SvgToggleSidebar } from "./svg/SvgToggleSidebar";
import type { Sidemenu } from "@/utils/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SvgConfiguracoes } from "./svg/SvgConfiguracoes";

const sidemenu: Sidemenu = {
	modulo: "Transmanager",
	menu: [
		{
			label: "Transportes",
			icon: <SvgConfiguracoes />,
			link: "/transmanager",
		},
		{
			label: "Configurações",
			icon: <SvgConfiguracoes />,
			link: "/transmanager/configuracoes",
		},
	],
};

function isVisible() {
	return true;
}

export function ToggleMainSidebar() {
	const pathname = usePathname();
	return (
		<Sheet modal={false}>
			<SheetTrigger asChild>
				<Button
					size={null}
					variant={"ghost"}
					className={`${pathname === "/" ? "hidden" : "inline-flex"} 
					items-center p-1 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none`}
				>
					{/* <span className="sr-only">Open sidebar</span> */}
					<SvgToggleSidebar />
				</Button>
			</SheetTrigger>
			<SheetContent
				side={"left"}
				aria-describedby={undefined}
				className="bg-gray-900"
			>
				<SheetTitle />
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
			</SheetContent>
		</Sheet>
	);
}
