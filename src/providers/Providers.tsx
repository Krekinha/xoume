"use client";
import type React from "react";
import { SidemenuContextProvider } from "./SidemenuContext";
import ReactQueryProvider from "./ReactQueryProvider";

export default function Providers({ children }: any) {
	return (
		<ReactQueryProvider>
			<SidemenuContextProvider>{children}</SidemenuContextProvider>
		</ReactQueryProvider>
	);
}
