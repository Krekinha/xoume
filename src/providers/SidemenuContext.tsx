"use client";
import type { Sidemenu } from "@/utils/types";
import {
	createContext,
	useContext,
	type Dispatch,
	type SetStateAction,
	useState,
} from "react";

interface ISidemenuContext {
	sidemenu: Sidemenu;
	isOpen: boolean;

	setSidemenu: Dispatch<SetStateAction<Sidemenu>>;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SidemenuContext = createContext<ISidemenuContext>({
	sidemenu: {},
	isOpen: false,

	setSidemenu: (): Sidemenu => {
		return { modulo: "modulo 1" };
	},
	setIsOpen: (): boolean => false,
});

export const SidemenuContextProvider = ({ children }: any) => {
	const [sidemenu, setSidemenu] = useState<Sidemenu>({});
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<SidemenuContext.Provider
			value={{
				sidemenu,
				isOpen,

				setSidemenu,
				setIsOpen,
			}}
		>
			{children}
		</SidemenuContext.Provider>
	);
};

export const useSidemenuContext = () => useContext(SidemenuContext);
