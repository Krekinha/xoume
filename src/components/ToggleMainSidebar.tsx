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
import { MenuSidebar } from "./MainSidebar";

// const sidemenu: Sidemenu = {
// 	modulo: "Transmanager",
// 	menu: [
// 		{
// 			label: "Transportes",
// 			icon: <SvgConfiguracoes />,
// 			link: "/transmanager",
// 		},
// 		{
// 			label: "Configurações",
// 			icon: <SvgConfiguracoes />,
// 			link: "/transmanager/configuracoes",
// 		},
// 	],
// };

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
				className="bg-gray-900 sm:hidden"
			>
				<SheetTitle />
				<MenuSidebar />
			</SheetContent>
		</Sheet>
	);
}
