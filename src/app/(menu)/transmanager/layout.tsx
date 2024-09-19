import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export const metadata = {
	title: "XOUME - TRANSMANAGER",
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
	return <>{children}</>;
}
