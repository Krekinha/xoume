import "@/globals.css";
// import "@/styles.css";
// import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import MainSidebar from "@/components/main/MainSidebar";
import React from "react";
import MainHeader from "@/components/main/MainHeader";
import Providers from "@/providers/Providers";
/**
 * Neste arquivo irei determinar o padrão de layout para todas as rotas do grupo (menu)
 * e configurar parâmetros que serão compartilhados com essa rotas (metadados,
 * provedores, fontes, css globais, etc). Aqui também irei verificar se o usuário tem
 * uma sessão válida para acessar as rotas desse grupo.
 * @author Krekinha
 * @version 1.0
 */
export const metadata: Metadata = {
	title: "Xoume Assistente",
};

export default async function RootLayout({ children }: any) {
	const session = await auth();
	//console.log("session: ", session);

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
		<html suppressHydrationWarning lang="en" className="dark">
			<body className="overflow-hidden">
				<Providers session={session}>
					<div className="flex flex-col h-dvh">
						<MainHeader />
						<div className="flex h-full w-full overflow-hidden">
							<MainSidebar />
							<main className="flex w-full overflow-auto h-full flex-col">
								{children}
							</main>
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
