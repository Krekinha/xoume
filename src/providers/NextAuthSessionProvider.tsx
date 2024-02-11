"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
/**
 * Esse provedor é na verdade um arquivo onde serão agrupados vários
 * outros provedores, para que fiquem cetralizados em um único arquivo
 * e facilite a manutenção do código.
 *
 * Além disso, esse procefor servirá de suporte para provedores que 
 * precisam estar aninhados em um grupo de provedores que renderize do lado do
 * cliente, como é o caso do SessionProvider.
 * @author Krekinha
 * @version 1.0
 */
interface NextAuthSessionProviderProps {
  children: ReactNode;
  session: any;
}

export default function NextAuthSessionProvider({
  children,
  session,
}: NextAuthSessionProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
