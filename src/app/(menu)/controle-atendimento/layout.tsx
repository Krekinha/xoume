import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import type { Sidemenu } from "@/utils/types";
import SvgAtendimentos from "./SvgAtendimentos";
import { SvgAtividades } from "@/components/svg/SvgAtividades";
import { SvgConfiguracoes } from "@/components/svg/SvgConfiguracoes";
import Providers from "@/providers/Providers";
import MainSidebar from "@/components/main/MainSidebar";

export const metadata = {
	title: "XOUME - CONTROLE DE ATENDIMENTO",
};

const menu: Sidemenu = {
	modulo: "Controle de atendimentos",
	menu: [
		{
			label: "Atendimentos",
			icon: <SvgAtendimentos />,
			link: "/controle-atendimento",
		},
		{
			label: "Atividades",
			icon: <SvgAtividades />,
			link: "/controle-atendimento/atividades",
		},
		{
			label: "Configurações",
			icon: <SvgConfiguracoes />,
			link: "/controle-atendimento/configuracoes",
		},
	],
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (!session) {
		redirect("/login");
	}
	/**
	 * Para que o provedor SessionProvider funcione aqui, ele precisará
	 * estar aninhado em um grupo de provedores que renderize do lado do
	 * cliente, que neste caso é o NextAuthSessionProvider, que está recebendo
	 * a sessão como parâmetro, que será compartilhadas nas demais rotas
	 */
	return (
		<Providers>
			<NextAuthSessionProvider session={session}>
				<MainSidebar />
				{children}
			</NextAuthSessionProvider>
		</Providers>
	);
}
