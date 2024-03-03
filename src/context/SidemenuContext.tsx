"use client";

import { Sidemenu } from "@/utils/types";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface ISidemenuContext {
  sidemenu: Sidemenu;
  setSidemenu: Dispatch<SetStateAction<Sidemenu>>;
}
const SidemenuContext = createContext<ISidemenuContext>({
  sidemenu: {},
  setSidemenu: (): Sidemenu => {
    return {modulo:"modulo 1"};
  },
});

export const SidemenuContextProvider = ({ children }: any) => {
  const [sidemenu, setSidemenu] = useState<Sidemenu>({});

  return (
    <SidemenuContext.Provider
      value={{
        sidemenu,
        setSidemenu,
      }}
    >
      {children}
    </SidemenuContext.Provider>
  );
};

export const useSidemenuContext = () => useContext(SidemenuContext);
