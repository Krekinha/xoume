import "@/globals.css";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import { SidemenuContextProvider } from "@/context/SidemenuContext";
import Sidebar from "../Sidebar";
import { Sidemenu } from "@/utils/types";
import NavbarMenuSide from "../NavbarMenuSide";
import SvgConfiguracoes from "./SvgConfiguracoes";

export const metadata = {
  title: "XOUME - CONTROLE DE ATENDIMENTO",
};

const menu: Sidemenu = {
  modulo: "Controle de atendimentos",
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
    <html lang="en">
      <body>
        <NextAuthSessionProvider session={session}>
          <SidemenuContextProvider>
            <NavbarMenuSide modulo={menu.modulo} />
            <Sidebar sidemenu={menu} session={session} />

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
