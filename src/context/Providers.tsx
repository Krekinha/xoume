"use client";
import type React from "react";
import { SidemenuContextProvider } from "./SidemenuContext";

export default function Providers({ children }: any) {
	return <SidemenuContextProvider>{children}</SidemenuContextProvider>;
}
