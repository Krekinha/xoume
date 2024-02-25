import { redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/auth";
import Home from "./Home";

export default async function Page() {
  /**
   * A verificação de sessão já está endo feita no arquivo de layout,
   * porém, o objetico dessa verificação aqui é para evitar que o usuário
   * estando logado, tenha acesso a página de login. E caso a sessão tenha expirado,
   * será solicitado login novamente
   * @author Krekinha
   * @version 1.0
   */
  const session = await auth();

  if (session) {
    return <Home />;
  }

  if (!session) {
    redirect("/login");
  }
}
