import "@/globals.css";
//import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import { SidemenuContextProvider } from "@/context/SidemenuContext";
import Sidebar from "../Sidebar";
import { Sidemenu } from "@/utils/types";
import NavbarMenuSide from "./NavbarMenuSide";
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

const menu: Sidemenu = {
  modulo: "Controle de atendimento",
  menu: [{ nome: "Menu 1" }, { nome: "Menu 2" }],
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
    <html lang="en">
      <body className="bg-gray-800 h-screen flex flex-col">
        <NextAuthSessionProvider session={session}>
          <SidemenuContextProvider>
            <div className="flex flex-row min-h-screen bg-gray-200 text-gray-800">
              <Sidebar sidemenu={menu} session={session} />
              <main className="flex flex-col flex-grow -ml-44 md:ml-0 transition-all duration-150 ease-in">
                <NavbarMenuSide modulo="CONTROLE DE ATENDIMENTO" />
                {children}
              </main>
            </div>
          </SidemenuContextProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
