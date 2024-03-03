"use client";
import { SessionProvider } from "next-auth/react";
import { SidemenuContextProvider } from "./SidemenuContext";

export default function Providers({ children }: any) {
  return (
    <SessionProvider>
      <SidemenuContextProvider>{children}</SidemenuContextProvider>
    </SessionProvider>
  );
}
