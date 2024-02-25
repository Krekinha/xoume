import "@/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import Navbar from "@/components/Navbar";
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
          <Navbar user={session.user} />
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
