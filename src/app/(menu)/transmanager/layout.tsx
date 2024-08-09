import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import Sidebar from "@/components/Sidebar";
import type { Sidemenu } from "@/utils/types";
import { SvgConfiguracoes } from "@/components/svg/SvgConfiguracoes";
import Providers from "@/context/Providers";
import ReactQueryClientProvider from "@/context/ReactQueryClienteProvider";

export const metadata = {
	title: "XOUME - TRANSMANAGER",
};

const menu: Sidemenu = {
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

export default async function Layout({
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
		<section>
			<ReactQueryClientProvider>
				<Providers>
					<NextAuthSessionProvider session={session}>
						<Sidebar sidemenu={menu} session={session} />
						{children}
						{/* {children} */}
					</NextAuthSessionProvider>
				</Providers>
			</ReactQueryClientProvider>
		</section>
	);
}
