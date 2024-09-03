"use client";
import type React from "react";
import { SidemenuContextProvider } from "./SidemenuContext";
import ReactQueryProvider from "./ReactQueryProvider";
import { ThemeProvider } from "./ThemeContext";
import type { ReactNode } from "react";
import NextAuthSessionProvider from "./NextAuthSessionProvider";

interface ProvidersProps {
	children: ReactNode;
	session: any;
}

export default function Providers({ children, session }: ProvidersProps) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="dark"

			//enableSystem
			//disableTransitionOnChange
		>
			<NextAuthSessionProvider session={session}>
				<ReactQueryProvider>
					<SidemenuContextProvider>{children}</SidemenuContextProvider>
				</ReactQueryProvider>
			</NextAuthSessionProvider>
		</ThemeProvider>
	);
}
