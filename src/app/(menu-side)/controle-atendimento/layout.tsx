import "@/globals.css";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import { SidemenuContextProvider } from "@/context/SidemenuContext";
import SidebarTeste from "./SidebarTeste";
import { Sidemenu } from "@/utils/types";
import SvgComponent from "./SvgComponent";
import NavTeste from "../NavTeste";
import SvgAtendimentos from "./SvgAtendimentos";

export const metadata = {
  title: "XOUME - CONTROLE DE ATENDIMENTO",
};

const menu: Sidemenu = {
  modulo: "Controle de atendimento",
  menu: [
    { label: "Atendimentos", icon: <SvgAtendimentos />, notificacao: 3 },
    { label: "Atividades", icon: <SvgComponent /> },
    { label: "Configurações", icon: <SvgComponent /> },
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
    <html lang="en">
      <body>
        <NextAuthSessionProvider session={session}>
          <SidemenuContextProvider>
            <NavTeste modulo={menu.modulo} />
            <SidebarTeste sidemenu={menu} session={session} />

            {children}
          </SidemenuContextProvider>
        </NextAuthSessionProvider>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.js"
          async
        />
      </body>
    </html>
  );
}
