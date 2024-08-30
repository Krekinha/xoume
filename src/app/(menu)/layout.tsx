import "@/globals.css";

import type { Metadata } from "next";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import MainNavbar from "@/components/MainNavbar";
import Sidebar from "@/components/Sidebar";
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
		// <html lang="en" suppressHydrationWarning>
		<html
			suppressHydrationWarning
			lang="en"
			className="fixed overflow-hidden h-full dark"
		>
			<body className="fixed overflow-hidden w-full min-h-full flex text-gray-900 dark:text-white bg-white dark:bg-transparent">
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					//enableSystem
					//disableTransitionOnChange
				>
					<NextAuthSessionProvider session={session}>
						<div className="flex flex-col flex-none w-full">
							<MainNavbar />
							<div className="flex flex-row">
								<Sidebar session={session} />
								{children}
							</div>
						</div>
					</NextAuthSessionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
