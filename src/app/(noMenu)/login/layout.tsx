import { redirect } from "next/navigation";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Antes de renderiza a página de login, irei verificar
  // se o usuário está logado. Se estiver, irei redirecionar para a
  // a página principal da aplicação
  const session = await auth()

  if (!session) {
    console.log("você não está logado");
  }

  if (session) {
    console.log("você já está logado");
    redirect("/");
  }

  return <>{children}</>;
}
