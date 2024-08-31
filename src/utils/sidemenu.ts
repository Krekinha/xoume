import { SvgConfiguracoes } from "@/components/svg/SvgConfiguracoes";
import type { Sidemenu } from "./types";

export const transmanagerSideMenu: Sidemenu = {
	modulo: "Transmanager",
	menu: [
		{
			label: "Transportes",
			icon: SvgConfiguracoes(),
			link: "/transmanager",
		},
		{
			label: "Configurações",
			icon: SvgConfiguracoes(),
			link: "/transmanager/configuracoes",
		},
	],
};
