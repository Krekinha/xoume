import { MainToggleTheme } from "@/components/main/MainToggleTheme";
import { MainToggleSidebar } from "./MainToggleSidebar";
import MainAvatarDownMenu from "./MainAvatarDownMenu";
import { cn } from "@/lib/utils";
import { Network } from "lucide-react";
import MainModulo from "./MainModulo";
import Link from "next/link";
/**
 * Esse Navbar é o menu principal do site. Estará visível em
 * todas as rotas que necessite de login
 * @author Krekinha
 * @version 1.0
 */

export default function MainHeader() {
	return (
		<header className="z-50 bg-[#121416] h-16 border-b border-gray-700 transition-colors w-full flex-none">
			<nav className="max-w-container mx-auto flex size-full flex-row items-center gap-6 px-4">
				<div className="inline-flex items-center gap-3 font-semibold">
					<div className="flex items-center gap-4">
						<MainToggleSidebar />
						<span className="flex items-end gap-2">
							<Link href="/" title="Home">
								<Network className="size-5 text-violet-600" />
							</Link>

							<span
								className={cn(
									"text-sm/none font-bold text-violet-800",
									"drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]",
									"hidden sm:flex shadow-slate-300",
								)}
							>
								XOUME
							</span>
							<MainModulo />
						</span>
					</div>
				</div>
				<div className="flex flex-1 flex-row items-center justify-end gap-3">
					<MainToggleTheme />
					<MainAvatarDownMenu />
				</div>
			</nav>
		</header>
	);
}
