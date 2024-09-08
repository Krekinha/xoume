"use client";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { MenuSidebar } from "./MainSidebar";
import { Menu } from "lucide-react";

export function MainToggleSidebar() {
	const pathname = usePathname();
	return (
		<Sheet modal={false}>
			<SheetTrigger asChild>
				<button
					className={`${pathname === "/" ? "hidden" : "inline-flex"} 
					items-center p-1 text-sm hover:bg-none rounded-lg md:hidden focus:outline-none`}
				>
					<Menu className="text-gray-400 hover:text-gray-300 " />
				</button>
			</SheetTrigger>
			<SheetContent
				side={"left"}
				aria-describedby={undefined}
				className="bg-[#17191C] md:hidden border border-violet-400 dark:border-gray-700"
			>
				<SheetTitle />
				<MenuSidebar />
			</SheetContent>
		</Sheet>
	);
}
