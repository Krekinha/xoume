import { MainToggleTheme } from "@/components/main/MainToggleTheme";
import { MainToggleSidebar } from "./MainToggleSidebar";
import MainAvatarDownMenu from "./MainAvatarDownMenu";
import MainLogo from "./MainLogo";
/**
 * Esse Navbar é o menu principal do site. Estará visível em
 * todas as rotas que necessite de login
 * @author Krekinha
 * @version 1.0
 */

export default function MainHeader() {
	return (
		<header className="z-50 h-full w-full py-2 pl-2 pr-4 row-span-1 bg-gray-900 border-b border-gray-700">
			<div className="flex w-full h-full gap-2 justify-between">
				<div className="flex gap-2 items-center">
					<MainToggleSidebar />
					<MainLogo />
				</div>

				<div className="flex gap-5 items-center">
					<MainToggleTheme />
					<MainAvatarDownMenu />
				</div>
			</div>
		</header>
	);
}
