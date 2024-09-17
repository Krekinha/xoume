"use client";
import type React from "react";
import { SidemenuContextProvider } from "./SidemenuContext";
import ReactQueryProvider from "./ReactQueryProvider";
import { ThemeProvider } from "./ThemeContext";
import type { ReactNode } from "react";
import NextAuthSessionProvider from "./NextAuthSessionProvider";
import { ModalDialogContextProvider } from "./ModaDialogProvider";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
			<ToastContainer style={{ width: "max-content" }} />
			<NextAuthSessionProvider session={session}>
				<ReactQueryProvider>
					<ModalDialogContextProvider>{children}</ModalDialogContextProvider>
				</ReactQueryProvider>
			</NextAuthSessionProvider>
		</ThemeProvider>
	);
}
